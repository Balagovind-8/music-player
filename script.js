const songs = [
  {
    title: "Ocean Waves",
    artist: "Astro Beats",
    src: "https://p.scdn.co/mp3-preview/6ho0GyrWZN3mhi9zVRW7xi?cid=774b29d4f13844c495f206cafdad9c86",
    cover: "ocean-waves.png"
  },
  {
    title: "Neon",
    artist: "Astro Beats",
    src: "https://p.scdn.co/mp3-preview/3t0nPz2GGE4tqzYsy93vAb7d42ae?cid=774b29d4f13844c495f206cafdad9c86",
    cover: "neon.png"
  },
  {
    title: "Dream Seq",
    artist: "Astro Beats",
    src: "https://p.scdn.co/mp3-preview/7hIPlPgH0Hcv5Uq1iW3hAGQFJtU8?cid=774b29d4f13844c495f206cafdad9c86",
    cover: "dream-seq.png"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const cover = document.getElementById("cover");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const volume = document.getElementById("volume");
const blurBg = document.getElementById("blur-bg");

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
  blurBg.style.backgroundImage = `url(${song.cover})`;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", (e) => {
  const { currentTime, duration } = e.srcElement;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.value = progressPercent;

    let currentMins = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    let durationMins = Math.floor(duration / 60);
    let durationSecs = Math.floor(duration % 60);

    if (currentSecs < 10) currentSecs = `0${currentSecs}`;
    if (durationSecs < 10) durationSecs = `0${durationSecs}`;

    currentTimeEl.textContent = `${currentMins}:${currentSecs}`;
    durationEl.textContent = `${durationMins}:${durationSecs}`;
  }
});

progress.addEventListener("input", (e) => {
  const { value } = e.target;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (value / 100) * duration;
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

// Initial load
loadSong(songs[songIndex]);
