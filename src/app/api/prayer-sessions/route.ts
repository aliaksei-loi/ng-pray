import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createPrayerSessionSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createPrayerSessionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { startTime, endTime, duration, note } = parsed.data;

  const prayerSession = await prisma.prayerSession.create({
    data: {
      userId: session.user.id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      note,
    },
  });

  return NextResponse.json(prayerSession, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
  const cursor = searchParams.get("cursor"); // last session ID for cursor pagination
  const statsOnly = searchParams.get("stats") === "true";

  // Stats-only endpoint for dashboard header
  if (statsOnly) {
    const [totalDuration, totalSessions, todaySessions] = await Promise.all([
      prisma.prayerSession.aggregate({
        where: { userId: session.user.id },
        _sum: { duration: true },
      }),
      prisma.prayerSession.count({
        where: { userId: session.user.id },
      }),
      prisma.prayerSession.aggregate({
        where: {
          userId: session.user.id,
          startTime: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        _sum: { duration: true },
      }),
    ]);

    return NextResponse.json({
      totalDuration: totalDuration._sum.duration || 0,
      totalSessions,
      todayDuration: todaySessions._sum.duration || 0,
    });
  }

  // Cursor-based pagination
  const sessions = await prisma.prayerSession.findMany({
    where: { userId: session.user.id },
    orderBy: { startTime: "desc" },
    take: limit + 1, // fetch one extra to check if there's a next page
    ...(cursor
      ? {
          cursor: { id: cursor },
          skip: 1, // skip the cursor item itself
        }
      : {}),
  });

  const hasMore = sessions.length > limit;
  const items = hasMore ? sessions.slice(0, limit) : sessions;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return NextResponse.json({
    sessions: items,
    nextCursor,
    hasMore,
  });
}
