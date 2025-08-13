const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");


const songs = [
    {
        title: "Grace",
        artist: "Wizkid",
        src: "Wizkid-Grace.mp3",
        cover: "Wizkid.png"
    },
    {
        title: "Davido",
        artist: "R and B",
        src: "Davido-Ft-Shenseea RandB.mp3",
        cover: "Davido.png"
    },
    {
        title: "Update",
        artist: "Burna Boy",
        src: "Burna-Boy-Update.mp3",
        cover: "Burnaboy.png"
    }
];

let songIndex = 0;
let isPlaying = false;


function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}


function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}


function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}


function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

   
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;

    if (duration) {
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}


function setVolume() {
    audio.volume = volumeSlider.value;
}


playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
volumeSlider.addEventListener("input", setVolume);
audio.addEventListener("ended", nextSong);


loadSong(songs[songIndex]);