const video = document.querySelector("video");
const videoContainer = document.getElementById("videoContainer");
const videoController = videoContainer.querySelector("#videoController");
const psBtn = videoController.querySelector("#playPauseBtn");
const volumeBtn = videoController.querySelector("#volume");
const volumeRange = videoController.querySelector("#volumeRange");
const currentTime = videoController.querySelector("#currentTime");
const timeline = videoController.querySelector("#timeline");
const totalTime = videoController.querySelector("#totalTime");
const fullScreenBtn = videoController.querySelector("#fullScreenBtn");

let volumeValue = 0.5;
video.volume = volumeValue;

const formatTime = (s) => new Date(s*1000).toISOString().substr(11,8); 
const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value }
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};
const handleLoadedVideo = () => {
  const tt = Math.floor(video.duration);
  totalTime.innerText = formatTime(tt);
  timeline.max = tt;
};
const handleTimeUpdate = () => {
  const ct = Math.floor(video.currentTime);
  currentTime.innerText = formatTime(ct);
  timeline.value = ct;
};
const handleTimeline = (event) => {
  const { target: { value } } = event;
  video.currentTime = value;
};
const fullScreenMode = () => {
  videoContainer.requestFullscreen();
};
const handleFullScreen = () => {
  if(document.fullscreenElement) document.exitFullscreen();
  else fullScreenMode();
};
const hadleKeydown = (event) => {
  const { keyCode } = event;
  const space = keyCode === 32;
  const codeF = keyCode === 70;
  if( space ) handlePlayAndStop();
  else if ( codeF ) fullScreenMode();
};
const hadleFullScreenChange = () => {
  if(document.fullscreenElement) fullScreenBtn.className = "fas fa-compress";
  else fullScreenBtn.className = "fas fa-expand";
}

psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("loadedmetadata", handleLoadedVideo);
video.addEventListener("timeupdate", handleTimeUpdate);
document.addEventListener("keydown", hadleKeydown);
document.addEventListener("fullscreenchange", hadleFullScreenChange);