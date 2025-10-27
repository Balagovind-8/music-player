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


const audio = document.getElementById('audio');
const title = document.getElementById('song-title');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentSong = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

loadSong(currentSong);
