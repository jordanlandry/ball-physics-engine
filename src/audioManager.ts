export class AudioManager {
  private notes: string[];
  private audioElements: HTMLAudioElement[] = [];
  private audioIndex = 0;

  constructor(notes: string[]) {
    this.notes = notes;

    this.generateAudioTrack();
  }

  generateAudioTrack() {
    const audioExt = ".wav";

    for (const path of this.notes) {
      const audio = new Audio(`./audio/${path}${audioExt}`);
      audio.volume = 0.1;
      this.audioElements.push(audio);
    }
  }

  play() {
    const currentAudio = this.audioElements[this.audioIndex];

    currentAudio.currentTime = 0;

    this.audioElements[this.audioIndex].play();
    this.audioIndex = (this.audioIndex + 1) % this.audioElements.length;
  }

  stop() {
    this.audioElements.forEach(audio => audio.pause())
  }

  testSong() {
    const interval = setInterval(() => {
      this.play();

      if (this.audioIndex === 0) clearInterval(interval);
    }, 250);
  }
}