window.onload = function () {
    let video = document.getElementById('video')
    let videoPlayer = document.getElementById('videoplayer-wrapper');
    let playBtn = document.getElementById('play1');
    let pauseBtn = document.getElementById('pause1');
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    let progressBar = document.getElementById('progressBar');
    let volume = document.getElementById('vol-ctrl');
    let timer = document.getElementById('time-elapsed');
    let duration = document.getElementById('duration');
    let faster = document.getElementById('faster');
    let fast = document.getElementById('fast');
    let normal = document.getElementById('normal');
    let slow = document.getElementById('slow');
    let slower = document.getElementById('slower');
    let highVol = document.getElementById('vol-high')
    let lowVol = document.getElementById('vol-low')
    let fullScreen = document.getElementById('fullscreen-button')
    let wrapper = document.getElementById('wrapper')

    video.controls = false;

    play.addEventListener('click', handlePlayBtn);
    pause.addEventListener('click', handlePauseBtn);
    playBtn.addEventListener('click', handlePlayBtn);
    pauseBtn.addEventListener('click', handlePauseBtn);
    highVol.addEventListener('cick',volOn)
    lowVol.addEventListener('click',volOff)

    function handlePlayBtn() {
        if (play.style.display == "block" && playBtn.style.display == "block") {
            play.style.display = "none";
            pause.style.display = "block";
            playBtn.style.display = "none";
            pauseBtn.style.display = "block";
            video.play();
        }

    }

    function handlePauseBtn() {
        if (pause.style.display == "block" && pauseBtn.style.display == "block") {
            pause.style.display = "none";
            play.style.display = "block";
            pauseBtn.style.display = "none";
            playBtn.style.display = "block";
            video.pause();
        }

    }

    
    video.addEventListener('click', () => {
        if (video.paused || video.ended) {
            video.play();
            console.log("play");
            handlePlayBtn();
        } else {
            video.pause();
            console.log("pause");
            handlePauseBtn();

        }
    })


function volOn(){
    if (volume.value == 100 && volume.value < 100) {
        highVol.style.display = 'block';
            lowVol.style.display = 'none';
            console.log(volume.value);

    }
}
function volOff(){
    if (volume.value == 0 ) {
        highVol.style.display = 'none';
            lowVol.style.display = 'block';
            console.log(volume.value);
    }
   
}


    video.addEventListener('loadedmetadata', () => {
        progressBar.setAttribute('max', video.duration);
    })

    video.addEventListener('timeupdate', () => {

        progressBar.value = video.currentTime;
        progressBar.style.width = `${Math.floor(video.currentTime * 100 / video.duration)}%`;
    });

    progressBar.addEventListener('mousedown', function () {
        video.pause();
        console.log('playing');
    })
    progressBar.addEventListener('mouseup', function () {
        video.play();
    })

    volume.addEventListener("change", function () {
        video.volume = volume.value;
    });

    // formatTime takes a time length in seconds and returns the time in
    // minutes and seconds
    function formatTime(timeInSeconds) {
        const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);

        return {
            minutes: result.substr(3, 2),
            seconds: result.substr(6, 2),
        };
    };


    function initializeVideo() {
        const videoDuration = Math.round(video.duration);
        const time = formatTime(videoDuration);
        duration.innerText = `${time.minutes}:${time.seconds}`;
        duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    }

    video.addEventListener('loadedmetadata', initializeVideo);



    // function updateTimeElapsed() {
    //     const time = formatTime(Math.round(video.currentTime));
    //     // timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    //     timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    // }
    // video.addEventListener('timeupdate', updateTimeElapsed);

    let currentTime01 = () => {
        let currentMinutes = Math.floor(video.currentTime / 60)
        let currentSeconds = Math.floor(video.currentTime = currentMinutes * 60)
        let durationMinutes = Math.floor(video.duration / 60)
        let durationSeconds = Math.floor(video.duration - durationMinutes * 60)
        timer.innerHTML = `${currentMinutes}:${currentSeconds}`;
        duration.innerHTML = `${durationMinutes}:${durationSeconds}`;

    }
    video.addEventListener('click', currentTime01);

    faster.addEventListener('click', function playfaster() {
        video.playbackRate = 2.0;
        console.log(faster);
    })
    fast.addEventListener('click', function playfast() {
        video.playbackRate = 1.5;
        console.log(video.playbackRate);


    })
    normal.addEventListener('click', function playnormal() {
        video.playbackRate = 1.0;
        console.log(video.playbackRate);


    })
    slow.addEventListener('click', function playslow() {
        video.playbackRate = 0.75;
        console.log(video.playbackRate);

    })
    slower.addEventListener('click', function playslower() {
        video.playbackRate = 0.5;
        console.log(video.playbackRate);

    })


    // fullScreen.addEventListener('click', toggleFullscreen);


    // function toggleFullscreen() {
    //     if (document.fullscreenElement){
    //         document.exitFullscreen();
    //     }else {
    //         document.requestFullscreen();
    //     }

    // }   
    if (!document?.fullscreenEnabled) {
        fullScreen.style.display = 'none';
    }
    fullScreen.addEventListener('click', (e) => {
        handleFullscreen();
    });

    function handleFullscreen() {
        if (document.fullscreenElement !== null) {
            document.exitFullscreen();
            setFullscreenData(false);
        } else {
            setFullscreenData(true);
            video.requestFullscreen();
        }
    }
    function setFullscreenData(state) {
        video.setAttribute('data-fullscreen', !state);
    }

    document.addEventListener('fullscreenchange', (e) => {
        setFullscreenData(!document.fullscreenElement);
    });



}