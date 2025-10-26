// Initialize Lucide Icons
lucide.createIcons();

// DOM Elements
const trackSearch = document.getElementById('track-search');
const searchBtn = document.getElementById('search-btn');
const statusMessageEl = document.getElementById('status-message');
const trackNameEl = document.getElementById('track-name');
const trackArtistEl = document.getElementById('track-artist');
const isrcEl = document.getElementById('isrc');
const popularityEl = document.getElementById('popularity');
const spotifyPlayerContainer = document.getElementById('spotify-player-container');

// --- Replace with your real Spotify Access Token ---
const ACCESS_TOKEN = "YOUR_SPOTIFY_ACCESS_TOKEN";

// --- Search Track Function ---
async function searchTrack(query) {
  if (!query) {
    statusMessageEl.textContent = "Please enter a track name.";
    return;
  }

  statusMessageEl.textContent = "Searching...";
  
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });

    const data = await response.json();

    if (!data.tracks || data.tracks.items.length === 0) {
      statusMessageEl.textContent = "No tracks found.";
      return;
    }

    const track = data.tracks.items[0];
    displayTrack(track);

  } catch (error) {
    console.error(error);
    statusMessageEl.textContent = "Error fetching track data. Check your Access Token.";
  }
}

// --- Display Track Info and Embed ---
function displayTrack(track) {
  // Update track info
  trackNameEl.textContent = track.name;
  trackArtistEl.textContent = track.artists.map(a => a.name).join(", ");
  isrcEl.textContent = `ISRC: ${track.external_ids.isrc}`;
  popularityEl.textContent = `Popularity: ${track.popularity}`;

  // Embed Spotify Player
  spotifyPlayerContainer.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = `https://open.spotify.com/embed/track/${track.id}`;
  iframe.width = "300";
  iframe.height = "80";
  iframe.frameBorder = "0";
  iframe.allow = "encrypted-media";
  iframe.allowTransparency = true;
  iframe.style.borderRadius = "12px";
  spotifyPlayerContainer.appendChild(iframe);

  statusMessageEl.textContent = "Track loaded successfully!";
}

// --- Event Listeners ---
searchBtn.addEventListener('click', () => {
  const query = trackSearch.value.trim();
  searchTrack(query);
});

trackSearch.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = trackSearch.value.trim();
    searchTrack(query);
  }
});

// --- Initialize ---
window.onload = () => {
  lucide.createIcons();
};

