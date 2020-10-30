const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        title: 'Electric Chill Machine',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-2',
        title: 'Seven Nation Army (Remix)',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-3',
        title: 'Goodnight, Disco Queen',
        artist: 'Jacinto'
    },
    {
        name: 'metric-1',
        title: 'Front Row (Remix)',
        artist: 'Metric/Jacinto'
    }
];

let isPlaying = false;
let songIndex = 0;

// Loading Songs
function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    image.src = `img/${songs[index].name}.jpg`;
    music.src = `music/${songs[index].name}.mp3`;
}

// Play Song
function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

// Pause Song
function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songIndex);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songIndex);
    playSong();
}

// Update time and progress bar
function updateTimeAndProgress(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement;

        // Update Progress bar width with current time
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // update duration Element
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay Switching duration Element to avoid display NaN
        if (durationSeconds) {
            // Display duration of music
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // update current time Element
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// On load
loadSong(songIndex);

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Next Song or Previous Song Event Listeners
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Update Time and Progress Bar Event Listener
music.addEventListener('timeupdate', updateTimeAndProgress);

// Update Progress Bar on clicking on it Event Listener
progressContainer.addEventListener('click', setProgressBar);

// Play next song if current song ended Event Listener
music.addEventListener('ended', nextSong);

document.addEventListener('keydown', function(e){
    if(e.key==="ArrowRight"){
        nextSong();
    }else if(e.key==="ArrowLeft"){
        prevSong();
    }
});