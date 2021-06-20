const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const muteBtn = document.querySelector(".mute");
const volumeRange = document.querySelector(".volume");

let volumeValue = (video.volume = 0.5);

const HandlePlay = () => {
  if (!video.paused) video.pause();
  else video.play();
  playBtn.innerText = !video.paused ? "⏸" : "▶";
};

const HandleMute = () => {
  if (video.muted) video.muted = false;
  else video.muted = true;
  muteBtn.innerText = video.muted ? "🔈" : "🔊";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (event) => {
  const value = event.target.value;
  if (value <= 0) video.muted = false;
  muteBtn.innerText = value <= 0 ? "🔈" : "🔊";
  volumeValue = video.volume = value;
};

const HandelVideo = (event) => {
  if (event.type === "volumechange") {
    const isMuted = () => video.muted || video.volume <= 0;
    if (video.volume <= 0) video.muted = false;
    volumeValue = video.volume;
    muteBtn.innerText = isMuted() ? "🔈" : "🔊";
    volumeRange.value = video.muted ? 0 : volumeValue;
  } else playBtn.innerText = event.type === "play" ? "⏸" : "▶";
};

function init() {
  playBtn.addEventListener("click", HandlePlay);
  muteBtn.addEventListener("click", HandleMute);
  volumeRange.addEventListener("input", handleVolume);
  video.addEventListener("play", HandelVideo);
  video.addEventListener("pause", HandelVideo);
  video.addEventListener("volumechange", HandelVideo);
}

init();
