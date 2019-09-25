const video = document.getElementById('video')

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

    console.log(detections);
    //console.log(detections[0].age);

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)



    let age = detections[0].age;
    let gender = detections[0].gender;
    switch(true) {
      // Check if male
        case (age < 20 && gender == "male"):
        console.log('Dude less than 20');
        break;
        case (age > 21 && age < 30 && gender == "male"):
        console.log('Dude between 20 and 30');
        case (age > 31 && age < 40 && gender == "male"):
        console.log('Dude between 30 and 40');
        case (age > 41 && age < 50 && gender == "male"):
        console.log('Dude between 40 and 50');
       // male40To50(); 

        // Check if female
        case (age < 20 && gender == "female"):
        console.log('lady less than 20');
		//femaleLessThan20();
        break;
        case (age > 21 && age < 30 && gender == "female"):
          console.log('lady between 20 and 30');
		  //female20To30();
        break;
        case (age > 31 && age < 40 && gender == "female"):
		  console.log('lady between 30 and 40');
          //female30To40();
        break;
        case (age > 41 && age < 50 && gender == "female"):
          console.log('lady between 40 and 50');
          //female40To50();
        break;
      default:
        console.log('you\'re dead');
	}
  }, 400)
});





			/*

			setTimeOut(() => {
	
			}, 5000);

			let theVid = document.getElementById("videoContainer"); 
			function playVid() { 
				theVid.src = "img/sample1.mp4";
				theVid.play(); 
				console.log("play video1!");
			}

			let theVid2 = document.getElementById("videoContainer"); 
			function playVid1() { 
				theVid2.src = "img/sample2.mp4";
				theVid2.play(); 
				console.log("play video2!");
			}

			let testVideo = document.getElementById("videoContainer"); 
			function playVid() { 
				theVideo.src = "img/sample1.mp4";
				testVideo.play(); 
				console.log("play video!");
			}








      
function maleLessThan20() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude less than 20" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
function male20To30() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude between 20 and 30" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 20 and 30" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function male30To40() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude between 30 and 40" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 30 and 40" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function male40To50() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude between 40 and 50" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 40 and 50" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    

    function femaleLessThan20() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude less than 20" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function female20To30() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Lady between 20 and 30" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 20 and 30" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function female30To40() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Lady between 30 and 40" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 30 and 40" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function female40To50() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Lady between 40 and 50" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 40 and 50" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
		}



/*
    let age = detections[0].age;
    let gender = detections[0].gender;
    switch(true) {
      // Check if male
        case (age < 20 && gender == "male"):
        console.log('Dude less than 20');
        maleLessThan20();
        break;
        case (age > 21 && age < 30 && gender == "male"):
        console.log('Dude between 20 and 30');
        male20To30(); 
        case (age > 31 && age < 40 && gender == "male"):
        console.log('Dude between 30 and 40');
        male30To40(); 
        case (age > 41 && age < 50 && gender == "male"):
        console.log('Dude between 40 and 50');
        male40To50(); 

        // Check if female
        case (age < 20 && gender == "female"):
        console.log('Dude less than 20');
        femaleLessThan20();
        break;
        case (age > 21 && age < 30 && gender == "female"):
          console.log('Dude between 20 and 30');
          female20To30();
        break;
        case (age > 31 && age < 40 && gender == "female"):
          console.log('Dude between 30 and 40');
          female30To40();
        break;
        case (age > 41 && age < 50 && gender == "female"):
          console.log('Dude between 40 and 50');
          female40To50();
        break;
      default:
        console.log('you\'re dead');
    }
  }, 400)
})

function maleLessThan20() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude less than 20" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
function male20To30() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude between 20 and 30" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 20 and 30" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function male30To40() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude between 30 and 40" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 30 and 40" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function male40To50() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude between 40 and 50" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 40 and 50" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    

    function femaleLessThan20() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Dude less than 20" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function female20To30() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Lady between 20 and 30" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 20 and 30" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function female30To40() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Lady between 30 and 40" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 30 and 40" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
    }
    function female40To50() 
		{ 
			console.log("in text function");
			var text = document.getElementById("textBox");
				setTimeout(function(){ text.value="Lady between 40 and 50" }, 1000);
				setTimeout(function(){ text.value="here\'s some more info about 40 and 50" }, 6000);
				setTimeout(function(){ text.value="And even more..." }, 12000);
				setTimeout(function(){ document.getElementById("form").reset(); }, 18000);
			console.log('I\'m done!');
		}
*/

/*
   let age = detections[0].age;
    if (age < 20) {
      console.log('less than 20');
    } 
    if (age > 21 && age < 40) {
      console.log('between 20 and 40');
    }

document.write("<h1>Hello World!</h1><p>Have a nice day!</p>");
*/

