document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');
  const volumeSlider = document.getElementById('volume');
  const title = document.getElementById('song-title');
  const artist = document.getElementById('song-artist');
  const cover = document.getElementById('cover');
  const blurBg = document.getElementById('blur-bg');

  const songs = [
    {
      title: 'Ocean Waves',
      artist: 'Astro Beats',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      cover: 'ocean-waves.png'
    },
    {
      title: 'Neon Nights',
      artist: 'Retro Future',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      cover: 'neon.png'
    },
    {
      title: 'Dream Sequence',
      artist: 'Nebula Flow',
      src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      cover: 'dream-seq.png'
    }
  ];

  let songIndex = 0;
  let isPlaying = false;

  function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
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

  playBtn.addEventListener('click', () => {
    if (!isPlaying) playSong();
    else pauseSong();
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

  // Update progress bar
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progress.value = progressPercent;

      const curMin = Math.floor(audio.currentTime / 60);
      const curSec = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
      currentTimeEl.textContent = `${curMin}:${curSec}`;

      const durMin = Math.floor(audio.duration / 60);
      const durSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
      durationEl.textContent = `${durMin}:${durSec}`;
    }
  });

  // Seek on progress change
  progress.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  // Volume control
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
  });

  // Auto next song
  audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
  });

  // Initial setup
  loadSong(songs[songIndex]);
  audio.volume = volumeSlider.value;
});
