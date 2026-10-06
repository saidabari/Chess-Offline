/**
 * High-fidelity Web Audio API acoustic chess sound synthesizer.
 * Creates rich, physical wooden piece sounds, captures, castles, and checks
 * completely offline without external audio files.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

/**
 * Realistic wooden chess piece placement on a felted board.
 */
export function playMoveSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. High wood snap / contact tap
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(640, now);
    snapOsc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

    snapGain.gain.setValueAtTime(0.35, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);
    snapOsc.start(now);
    snapOsc.stop(now + 0.06);

    // 2. Low wooden board resonance
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'sine';
    thudOsc.frequency.setValueAtTime(140, now);
    thudOsc.frequency.exponentialRampToValueAtTime(65, now + 0.09);

    thudGain.gain.setValueAtTime(0.4, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.1);
  } catch {
    // Fail silently
  }
}

/**
 * Solid, forceful wooden capture impact.
 */
export function playCaptureSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Primary strike
    const hitOsc = ctx.createOscillator();
    const hitGain = ctx.createGain();
    hitOsc.type = 'sawtooth';
    hitOsc.frequency.setValueAtTime(420, now);
    hitOsc.frequency.exponentialRampToValueAtTime(90, now + 0.07);

    hitGain.gain.setValueAtTime(0.35, now);
    hitGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    hitOsc.connect(hitGain);
    hitGain.connect(ctx.destination);
    hitOsc.start(now);
    hitOsc.stop(now + 0.08);

    // Secondary piece knock / rattle
    const knockOsc = ctx.createOscillator();
    const knockGain = ctx.createGain();
    knockOsc.type = 'triangle';
    knockOsc.frequency.setValueAtTime(240, now + 0.03);
    knockOsc.frequency.exponentialRampToValueAtTime(80, now + 0.14);

    knockGain.gain.setValueAtTime(0.3, now + 0.03);
    knockGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    knockOsc.connect(knockGain);
    knockGain.connect(ctx.destination);
    knockOsc.start(now + 0.03);
    knockOsc.stop(now + 0.15);

    // Sub thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(110, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    subGain.gain.setValueAtTime(0.45, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.13);
  } catch {
    // Fail silently
  }
}

/**
 * Castling double-slide glide sound
 */
export function playCastleSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [0, 0.12].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, now + offset);
      osc.frequency.exponentialRampToValueAtTime(140, now + offset + 0.07);

      gain.gain.setValueAtTime(0.28, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.08);
    });
  } catch {
    // Fail silently
  }
}

/**
 * Resonant, alerting check bell
 */
export function playCheckSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const chords = [587.33, 880]; // D5 and A5
    chords.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    });
  } catch {
    // Fail silently
  }
}

/**
 * Triumphant game-over celebration chime
 */
export function playGameOverSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Grand fanfare: C4, G4, C5, E5
    const notes = [261.63, 392.0, 523.25, 659.25];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + index * 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.52);
    });
  } catch {
    // Fail silently
  }
}

/**
 * Promotion sparkle fanfare
 */
export function playPromotionSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + index * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.32);
    });
  } catch {
    // Fail silently
  }
}

/**
 * Gentle piece selection tick
 */
export function playSelectSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Fail silently
  }
}
