export function playCommandSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) return;

    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(850, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      420,
      audioContext.currentTime + 0.055
    );

    gain.gain.setValueAtTime(0.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.06
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.06);

    oscillator.onended = () => {
      void audioContext.close();
    };
  } catch {
  }
}