const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let volumeVale = 0.5;
video.volume = volumeVale;

const formatTime = ( seconds ) => new Date( seconds * 1000 ).toISOString().substr( 11, 8 );
const handlePlayClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMute = () => {
  if( video.muted )
    video.muted = false;
  else
    video.muted = true;
  
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeVale;
};
const handleVolmeChagne = (event) => {
  const { target: { value } } = event;
  if( video.muted ) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeVale = value;
  video.volume = value;
};
const handleLoadedMetadata = () => totalTime.innerText = formatTime( Math.floor( video.duration ) );
const handleTimeUpdate = () => currentTime.innerText = formatTime( Math.floor( video.currentTime ) );

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input",handleVolmeChagne);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);