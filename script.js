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
    title: 'Ocean Waves',
    src: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_0b4df9ef0f.mp3?filename=ocean-waves-110624.mp3'
  },
  {
    title: 'Dreamscape',
    src: 'https://cdn.pixabay.com/download/audio/2021/11/10/audio_3e6f7991a1.mp3?filename=dreamscape-ambient-10349.mp3'
  },
  {
    title: 'Deep Night',
    src: 'https://cdn.pixabay.com/download/audio/2022/07/31/audio_918bd5a31b.mp3?filename=deep-night-ambient-115470.mp3'
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

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

loadSong(songs[songIndex]);
