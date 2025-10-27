const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const title = document.getElementById('song-title');

const songs = [
  {
    title: "Ocean Waves",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Neon Nights",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Dream Sequence",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80"
  }
];


let songIndex = 0;

function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent;

  // Update time display
  let currentMin = Math.floor(audio.currentTime / 60);
  let currentSec = Math.floor(audio.currentTime % 60);
  if (currentSec < 10) currentSec = `0${currentSec}`;
  currentTimeEl.textContent = `${currentMin}:${currentSec}`;

  let durationMin = Math.floor(audio.duration / 60);
  let durationSec = Math.floor(audio.duration % 60);
  if (durationSec < 10) durationSec = `0${durationSec}`;
  if (!isNaN(durationMin)) durationEl.textContent = `${durationMin}:${durationSec}`;
});

progress.addEventListener('input', () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Volume Control
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Initialize
loadSong(songs[songIndex]);
