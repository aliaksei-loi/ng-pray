let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

/** Gentle ascending chime (C5 → E5 → G5) — prayer started */
export function playStartSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Three quick rising sine tones: C5, E5, G5
    const frequencies = [523.25, 659.25, 783.99];
    const noteGap = 0.08; // gap between note onsets
    const noteDur = 0.12; // each note duration

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * noteGap);

      // Soft envelope: quick fade in, gentle fade out
      const onset = now + i * noteGap;
      gain.gain.setValueAtTime(0, onset);
      gain.gain.linearRampToValueAtTime(0.15, onset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, onset + noteDur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(onset);
      osc.stop(onset + noteDur + 0.01);
    });
    // Total duration: ~0.08 * 2 + 0.12 = ~0.28s (280ms)
  } catch {
    // Audio not available — silently ignore
  }
}

/** Soft descending tone (G5 → C5 glide) — prayer stopped */
export function playStopSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Single oscillator sweeping from G5 down to C5
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(783.99, now); // G5
    osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.3); // glide to C5

    // Soft envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
    // Total duration: ~350ms
  } catch {
    // Audio not available — silently ignore
  }
}
