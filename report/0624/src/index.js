const btn = document.querySelector("button");
const audio = document.getElementById("preview");

let stream;
let recorder;
let audioFile;
let timeoutID;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = audioFile;
    a.download = "recorder.ogg";
    document.body.appendChild( a );
    a.click();
};

const handleStop = () => {
    if( timeoutID )
        clearTimeout( timeoutID );

    btn.innerText = "Download Recording";
    btn.removeEventListener("click", handleStop);
    btn.addEventListener("click", handleDownload);

    recorder.stop();
};

const handleStart = () => {
    btn.innerText = "Stop Recording";
    btn.removeEventListener( "click", handleStart );
    btn.addEventListener( "click", handleStop );

    recorder = new MediaRecorder( stream );
    recorder.ondataavailable = (event) => {
        audioFile = URL.createObjectURL( event.data );
        audio.srcObject = null;
        audio.src = audioFile;
        audio.loop = true;
        audio.play();
    };
    audio.play();
    recorder.start();
    timeoutID = setTimeout( handleStop, 5000 );
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
    audio.srcObject = stream;
};

init();
btn.addEventListener( "click", handleStart );