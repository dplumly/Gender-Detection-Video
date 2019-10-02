const video = document.getElementById('computerVisionVideo')

// RODO: Variable to store if we have an active person
var isTherePerson = false;
// Variable to set and clear the isTherePerson timeout
var activeTimeout;
var timerDuration = 5000;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
    console.log("in detection loop"); // debugging, making sure the main loop has triggered
	const canvas = faceapi.createCanvasFromMedia(video)
	document.body.append(canvas)
	const displaySize = { width: video.width, height: video.height }
	faceapi.matchDimensions(canvas, displaySize)


    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
        // Uncomment if you want to see the computer visions variables
        console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
		// if you want to draw the computer vision information
		// go into css and comment out <#computerVisionVideo>

        //faceapi.draw.drawDetections(canvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
		//faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

		// Controls what video gets played
		// let age = detections[0]expressions;
        // let age = detections[0].age;



        console.log("We've got a person!"); // debugging
        //RODO: If there is no active face, fire the displayText Function
        // set the isTherePerson variable to true
        // set a time out to de-activate the face after a duration
        if (!isTherePerson) {
            let gender = detections[0].gender;
            if (gender === "male") {
                console.log("dude between 30 and 40");
                videoNumber = videosClips[0];
                playVid(videoNumber);
                
                timerDuration = 5000;  // setting timeDuration to 5 secs to delay setInterval
                console.log("timeDuration should be 5 secs " + timerDuration);
            } else if (gender === "female") {
                console.log("lady");
            }

            isTherePerson = true;
            activeTimeout = setTimeout(() => {
                isTherePerson = false;
            }, timerDuration);
        } else {
            // waiting for the video to end, then we can check again
            isVideoDone();
            // reset the timeout
            clearTimeout(activeTimeout);
            activeTimeout = setTimeout(() => {
                isTherePerson = false;
            }, timerDuration);
        }
    }, 3000)
});

// is the video done playing
function isVideoDone() {
    const videoContent = document.getElementById('videoContainer');
    videoContent.onended = (event) => {
        timerDuration = 3000;
        console.log("Waiting for video to end " + timerDuration);
    }
}

// Plays content based on computer vision recognition
let theVid = document.getElementById("videoContainer");
function playVid() {
    theVid.src = videoNumber;
    theVid.play();
    console.log("play video");
}

//Video Files to play
var videosClips = [
    'video/sample1.mp4',
    'video/sample2.mp4'
];
