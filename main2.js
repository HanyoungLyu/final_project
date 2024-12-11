// Songs Array
const songs = [
    {
        name: "Blue Spring",
        artist: "Ryuryu",
        file: "Bluespring_Ryuryu.mp3",
        cover: "Bluespring_cover.jpg",
    },
    {
        name: "Only Star",
        artist: "Ryuryu",
        file: "Onlystar_Ryuryu.mp3",
        cover: "Onlystar_cover.jpg",
    },
    {
        name: "Let it Snow",
        artist: "Ryuryu",
        file: "Letitsnow_Ryuryu.mp3",
        cover: "Letitsnow_Cover.jpg",
    },
];

// Player State
let currentIndex = 0;
const audio = document.getElementById("audio");
let isPlaying = false;

// DOM Elements
const playButton = document.getElementById("play");
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const albumArt = document.getElementById("album-art");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const progressBar = document.getElementById("progress-bar");
const volumeButton = document.getElementById("volume-button"); 
const volumeSlider = document.getElementById("volume-slider"); 

// Load and Display Song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    albumArt.src = song.cover;
    songTitle.textContent = song.name;
    songArtist.textContent = song.artist;
    audio.load(); // Reset audio element
}

// Play or Pause the Song
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playButton.src = "play.png";
    } else {
        audio.play();
        playButton.src = "pause.png";
    }
    isPlaying = !isPlaying;
}

// Move to Previous Song
function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    playButton.src = "pause.png";
}

// Move to Next Song
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    playButton.src = "pause.png";
}

// Update Progress Bar
function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
    document.getElementById("current-time").textContent = formatTime(audio.currentTime);
    document.getElementById("duration").textContent = formatTime(audio.duration || 0);
}

// Ensure duration displays when audio is loaded
audio.addEventListener("loadedmetadata", () => {
    document.getElementById("duration").textContent = formatTime(audio.duration);
});

// Format Time Helper Function
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

// Event listener to adjust volume
volumeSlider.addEventListener("input", (event) => {
    // Map slider's value (0-100) to audio.volume (0.0-1.0)
    audio.volume = event.target.value / 100;
});


// Seek Playback Position
progressBar.addEventListener("input", (event) => {
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// Function to toggle the slider visibility
function toggleVolumeSlider() {
    volumeSlider.style.display =
        volumeSlider.style.display === "block" ? "none" : "block";
}

// Event Listeners
playButton.addEventListener("click", togglePlay);
backButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
volumeButton.addEventListener("click", toggleVolumeSlider);

// Load the First Song on Page Load
window.onload = () => {
    loadSong(currentIndex);
};



