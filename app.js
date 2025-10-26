lucide.createIcons();

const trackSearch = document.getElementById('track-search');
const searchBtn = document.getElementById('search-btn');
const statusMessageEl = document.getElementById('status-message');
const trackNameEl = document.getElementById('track-name');
const trackArtistEl = document.getElementById('track-artist');
const audioPlayer = document.getElementById('audio-player');

// --- Jamendo API Key ---
const CLIENT_ID = "	06e48fd7"; // Replace with your key

// --- Search Function ---
async function searchTrack(query) {
    if (!query) {
        statusMessageEl.textContent = "Please enter a song or artist name.";
        return;
    }

    statusMessageEl.textContent = "Searching...";
    try {
        const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=1&search=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            statusMessageEl.textContent = "No tracks found.";
            return;
        }

        const track = data.results[0];
        playTrack(track);

    } catch (err) {
        console.error(err);
        statusMessageEl.textContent = "Error fetching track data.";
    }
}

// --- Play Track ---
function playTrack(track) {
    trackNameEl.textContent = track.name;
    trackArtistEl.textContent = track.artist_name;
    audioPlayer.src = track.audio;
    audioPlayer.play();
    statusMessageEl.textContent = "Track loaded!";
}

// --- Event Listeners ---
searchBtn.addEventListener('click', () => searchTrack(trackSearch.value.trim()));
trackSearch.addEventListener('keypress', e => {
    if (e.key === 'Enter') searchTrack(trackSearch.value.trim());
});
