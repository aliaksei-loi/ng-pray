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
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const skip = (page - 1) * limit;

  const [sessions, total] = await Promise.all([
    prisma.prayerSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startTime: "desc" },
      skip,
      take: limit,
    }),
    prisma.prayerSession.count({
      where: { userId: session.user.id },
    }),
  ]);

  return NextResponse.json({ sessions, total, page, limit });
}
