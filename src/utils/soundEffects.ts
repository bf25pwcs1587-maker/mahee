let sharedAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) {
    return null;
  }
  if (!sharedAudioContext) {
    sharedAudioContext = new AudioCtx();
  }
  if (sharedAudioContext.state === 'suspended') {
    void sharedAudioContext.resume().catch(() => undefined);
  }
  return sharedAudioContext;
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  startOffset: number,
  duration: number,
  volume = 0.08,
  type: OscillatorType = 'triangle',
): void {
  const now = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playPrankBoop(muted: boolean): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone(ctx, 520, 0, 0.08, 0.06, 'sine');
  playTone(ctx, 360, 0.07, 0.1, 0.05, 'sine');
}

export function playGiftPop(muted: boolean, isFinale: boolean): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (isFinale) {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      playTone(ctx, freq, idx * 0.08, 0.35, 0.08, 'triangle');
    });
  } else {
    playTone(ctx, 440, 0, 0.1, 0.06, 'triangle');
    playTone(ctx, 587.33, 0.08, 0.14, 0.06, 'triangle');
  }
}

export function playBirthdayMelody(muted: boolean): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  // "Happy Birthday to You" opening phrase in C major
  const melody: Array<[number, number, number]> = [
    [392.0, 0.0, 0.24],
    [392.0, 0.28, 0.18],
    [440.0, 0.5, 0.4],
    [392.0, 0.94, 0.4],
    [523.25, 1.38, 0.4],
    [493.88, 1.82, 0.72],
  ];
  melody.forEach(([freq, offset, dur]) => {
    playTone(ctx, freq, offset, dur, 0.08, 'triangle');
  });
}
