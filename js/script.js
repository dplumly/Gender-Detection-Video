const video = document.getElementById('computerVisionVideo')


var isTherePerson = false; // Variable to store if we have an active person
var activeTimeout; // Variable to set and clear the isTherePerson timeout
var timerDuration = 5000; // timer to avoid main setInterval from triggering

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
        
        console.log(detections); // To see the computer visions variables
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
		// if you want to draw the computer vision information on screen
		// go into css and comment out <#computerVisionVideo> styles and uncomment .draws below

        //faceapi.draw.drawDetections(canvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
		//faceapi.draw.drawFaceExpressions(canvas, resizedDetections)



        console.log("We've got a person!"); // debugging
        //If there is a person play video dependant on computer vision variables
        // set the isTherePerson variable to true
        // set a time out to de-activate the face after a duration
        if (!isTherePerson) {
            // find out gender/age/expression here

            // Other variables to make more personalized
		    // let age = detections[0]expressions;
            // let age = detections[0].age;
            let gender = detections[0].gender;
            if (gender === "male") {
                console.log("We found a dude!");
                videoNumber = videosClips[0];
                playVid(videoNumber);
                
                timerDuration = 5000;  // setting timeDuration to 5 secs to delay setInterval main loop
                console.log("timeDuration should be 5 secs " + timerDuration);
            } else if (gender === "female") {
                console.log("We found a lady");
                videoNumber = videosClips[1];
                playVid(videoNumber);
            }
            isTherePerson = true;
            activeTimeout = setTimeout(() => {
                isTherePerson = false;
            }, timerDuration);
        } else {
            // waiting for the video to end, then we can check for a person
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
        timerDuration = 300;
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
