// Fun sound effects using Web Audio API - completely free!

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - happy chord
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + i * 0.08;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playWhooshSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.15);
    filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    const frequencies = [1200, 1600, 2000, 1400, 1800];
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + i * 0.05;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playMagicSound() {
  try {
    const ctx = getAudioContext();
    const notes = [392, 523.25, 659.25, 783.99, 1046.5]; // G4 to C6 ascending
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
      oscillator.type = 'triangle';
      
      const startTime = ctx.currentTime + i * 0.06;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    });
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playNightSound() {
  try {
    const ctx = getAudioContext();
    
    // Owl hoot sound - low descending tone
    const owl1 = ctx.createOscillator();
    const owl1Gain = ctx.createGain();
    owl1.connect(owl1Gain);
    owl1Gain.connect(ctx.destination);
    owl1.type = 'sine';
    owl1.frequency.setValueAtTime(400, ctx.currentTime);
    owl1.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3);
    owl1Gain.gain.setValueAtTime(0, ctx.currentTime);
    owl1Gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    owl1Gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    owl1.start(ctx.currentTime);
    owl1.stop(ctx.currentTime + 0.3);
    
    // Second hoot - lower
    const owl2 = ctx.createOscillator();
    const owl2Gain = ctx.createGain();
    owl2.connect(owl2Gain);
    owl2Gain.connect(ctx.destination);
    owl2.type = 'sine';
    owl2.frequency.setValueAtTime(350, ctx.currentTime + 0.35);
    owl2.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.65);
    owl2Gain.gain.setValueAtTime(0, ctx.currentTime + 0.35);
    owl2Gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.4);
    owl2Gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.65);
    owl2.start(ctx.currentTime + 0.35);
    owl2.stop(ctx.currentTime + 0.65);
    
    // Cricket chirp - high frequency pulses
    for (let i = 0; i < 4; i++) {
      const cricket = ctx.createOscillator();
      const cricketGain = ctx.createGain();
      cricket.connect(cricketGain);
      cricketGain.connect(ctx.destination);
      cricket.type = 'sine';
      cricket.frequency.setValueAtTime(4000 + Math.random() * 500, ctx.currentTime);
      const startTime = ctx.currentTime + 0.1 + i * 0.08;
      cricketGain.gain.setValueAtTime(0, startTime);
      cricketGain.gain.linearRampToValueAtTime(0.03, startTime + 0.02);
      cricketGain.gain.linearRampToValueAtTime(0, startTime + 0.04);
      cricket.start(startTime);
      cricket.stop(startTime + 0.04);
    }
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playDaySound() {
  try {
    const ctx = getAudioContext();
    
    // Bird chirp - ascending happy notes
    const birdNotes = [1200, 1400, 1600, 1500, 1800];
    birdNotes.forEach((freq, i) => {
      const bird = ctx.createOscillator();
      const birdGain = ctx.createGain();
      bird.connect(birdGain);
      birdGain.connect(ctx.destination);
      bird.type = 'sine';
      bird.frequency.setValueAtTime(freq, ctx.currentTime);
      bird.frequency.exponentialRampToValueAtTime(freq * 1.1, ctx.currentTime + 0.05);
      const startTime = ctx.currentTime + i * 0.1;
      birdGain.gain.setValueAtTime(0, startTime);
      birdGain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
      birdGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      bird.start(startTime);
      bird.stop(startTime + 0.1);
    });
    
    // Bright sunrise chime
    const chimeNotes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chimeNotes.forEach((freq, i) => {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.type = 'triangle';
      chime.frequency.setValueAtTime(freq, ctx.currentTime);
      const startTime = ctx.currentTime + 0.5 + i * 0.08;
      chimeGain.gain.setValueAtTime(0, startTime);
      chimeGain.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
      chimeGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      chime.start(startTime);
      chime.stop(startTime + 0.4);
    });
  } catch (e) {
    // Silently fail if audio not available
  }
}
