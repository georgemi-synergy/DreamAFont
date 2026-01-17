// Fun sound effects using Web Audio API - completely free!

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Celebration fanfare
export function playFanfareSound() {
  try {
    const ctx = getAudioContext();
    const notes = [392, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      const startTime = ctx.currentTime + i * 0.12;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch (e) {}
}

// Rainbow sparkle cascade
export function playRainbowSound() {
  try {
    const ctx = getAudioContext();
    const notes = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25]; // C major scale
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const startTime = ctx.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  } catch (e) {}
}

// Bubble pop sound
export function playBubbleSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
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
    const duration = 40; // 40 seconds
    
    // Continuous cricket chirps throughout
    for (let t = 0; t < duration; t += 0.3) {
      const cricket = ctx.createOscillator();
      const cricketGain = ctx.createGain();
      cricket.connect(cricketGain);
      cricketGain.connect(ctx.destination);
      cricket.type = 'sine';
      cricket.frequency.setValueAtTime(3800 + Math.random() * 800, ctx.currentTime);
      const startTime = ctx.currentTime + t + Math.random() * 0.15;
      cricketGain.gain.setValueAtTime(0, startTime);
      cricketGain.gain.linearRampToValueAtTime(0.02, startTime + 0.015);
      cricketGain.gain.linearRampToValueAtTime(0, startTime + 0.03);
      cricket.start(startTime);
      cricket.stop(startTime + 0.03);
    }
    
    // Owl hoots every few seconds
    for (let t = 0; t < duration; t += 4 + Math.random() * 3) {
      const owl = ctx.createOscillator();
      const owlGain = ctx.createGain();
      owl.connect(owlGain);
      owlGain.connect(ctx.destination);
      owl.type = 'sine';
      const startTime = ctx.currentTime + t;
      owl.frequency.setValueAtTime(380 + Math.random() * 40, startTime);
      owl.frequency.exponentialRampToValueAtTime(280, startTime + 0.35);
      owlGain.gain.setValueAtTime(0, startTime);
      owlGain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      owlGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);
      owl.start(startTime);
      owl.stop(startTime + 0.35);
      
      // Second hoot
      const owl2 = ctx.createOscillator();
      const owl2Gain = ctx.createGain();
      owl2.connect(owl2Gain);
      owl2Gain.connect(ctx.destination);
      owl2.type = 'sine';
      owl2.frequency.setValueAtTime(340, startTime + 0.4);
      owl2.frequency.exponentialRampToValueAtTime(240, startTime + 0.75);
      owl2Gain.gain.setValueAtTime(0, startTime + 0.4);
      owl2Gain.gain.linearRampToValueAtTime(0.08, startTime + 0.45);
      owl2Gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.75);
      owl2.start(startTime + 0.4);
      owl2.stop(startTime + 0.75);
    }
    
    // Soft wind/ambience
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.type = 'triangle';
    noise.frequency.setValueAtTime(80, ctx.currentTime);
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(200, ctx.currentTime);
    noiseGain.gain.setValueAtTime(0.03, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + duration);
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + duration);
    
  } catch (e) {
    // Silently fail if audio not available
  }
}

export function playDaySound() {
  try {
    const ctx = getAudioContext();
    const duration = 40; // 40 seconds
    
    // Continuous bird chirps throughout
    for (let t = 0; t < duration; t += 0.8 + Math.random() * 0.5) {
      const birdNotes = [1200 + Math.random() * 400, 1400 + Math.random() * 300, 1600 + Math.random() * 200];
      birdNotes.forEach((freq, i) => {
        const bird = ctx.createOscillator();
        const birdGain = ctx.createGain();
        bird.connect(birdGain);
        birdGain.connect(ctx.destination);
        bird.type = 'sine';
        const startTime = ctx.currentTime + t + i * 0.08;
        bird.frequency.setValueAtTime(freq, startTime);
        bird.frequency.exponentialRampToValueAtTime(freq * (1 + Math.random() * 0.15), startTime + 0.06);
        birdGain.gain.setValueAtTime(0, startTime);
        birdGain.gain.linearRampToValueAtTime(0.05, startTime + 0.02);
        birdGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
        bird.start(startTime);
        bird.stop(startTime + 0.12);
      });
    }
    
    // Occasional melodic chimes
    for (let t = 0; t < duration; t += 5 + Math.random() * 4) {
      const chimeNotes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      chimeNotes.forEach((freq, i) => {
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.type = 'triangle';
        const startTime = ctx.currentTime + t + i * 0.1;
        chime.frequency.setValueAtTime(freq, startTime);
        chimeGain.gain.setValueAtTime(0, startTime);
        chimeGain.gain.linearRampToValueAtTime(0.06, startTime + 0.03);
        chimeGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
        chime.start(startTime);
        chime.stop(startTime + 0.5);
      });
    }
    
    // Soft warm ambient tone
    const ambient = ctx.createOscillator();
    const ambientGain = ctx.createGain();
    const ambientFilter = ctx.createBiquadFilter();
    ambient.connect(ambientFilter);
    ambientFilter.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    ambient.type = 'sine';
    ambient.frequency.setValueAtTime(220, ctx.currentTime);
    ambientFilter.type = 'lowpass';
    ambientFilter.frequency.setValueAtTime(300, ctx.currentTime);
    ambientGain.gain.setValueAtTime(0.02, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + duration);
    ambient.start(ctx.currentTime);
    ambient.stop(ctx.currentTime + duration);
    
  } catch (e) {
    // Silently fail if audio not available
  }
}
