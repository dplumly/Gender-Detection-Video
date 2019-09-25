const video = document.getElementById('computerVisionVideo')

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
  console.log("in detection loop");
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withAgeAndGender()
        //console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        //faceapi.draw.drawDetections(canvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)


      //let age = detections[0].age;
      let gender = detections[0].gender;
      if (gender === "male") {
          console.log("dude between 30 and 40");
          videoNumber = videosClips[1];
          playVid1(videoNumber);
      } else if (gender === "female") {
          console.log("lady");
      }
  }, 3000)
});


let theVid = document.getElementById("videoContainer");
function playVid1() {
    theVid.src = videoNumber;
    theVid.play();
    console.log("play video1!");
}


//Video Files
var videosClips = [
    'video/sample1.mp4',
    'video/sample2.mp4'
];
