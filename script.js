const songs = [
  {
    title: "Ocean Waves",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://i.postimg.cc/WzbybW9x/ocean.jpg"
  },
  {
    title: "Neon Nights",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://i.postimg.cc/KYW1cRWs/blue-wave.jpg"
  },
  {
    title: "Dream Sequence",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://i.postimg.cc/GtnwKrJk/galaxy.jpg"
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
