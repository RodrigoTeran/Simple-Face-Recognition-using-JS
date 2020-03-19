//--------------------------------------------------------Normal functionalities--------------------------------------------------------
var YesStartAll = false;
function isMobile(){    // check if the user is in a mobile device
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/iBlackBerry/i))
    );
};
var noMobile = document.getElementsByClassName("noMobile")[0];
var todo = document.getElementsByClassName("todo")[0];
if(isMobile()){ //if it is mobile, hide todo
    todo.id = 'noDisplay';
    noMobile.id = 'yesDisplay';
}else{  //if it is in a website hide noMobile
	if (document.documentMode || /Edge/.test(navigator.userAgent)) {
		todo.id = 'noDisplay';
    	noMobile.id = 'yesDisplay';
    	noMobile.innerHTML = "Edge is not supported";
    }else{
	    todo.id = 'yesDisplay';
	    noMobile.id = 'noDisplay';
	    YesStartAll = true;
    };
};
function actualizarTama(){  //this is for not changing the size of the screen
    $("body").css("zoom", window.innerWidth / 1530);
};
$(document).ready(function(){   //this is for not changing the size of the screen
    $(window).on("resize", actualizarTama);
    actualizarTama();  
});

//--------------------------------------------------------Video Recognition functionalities--------------------------------------------------------
const video = document.getElementById("video");

function startVideo(){
	navigator.getUserMedia = (navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);
	navigator.getUserMedia(
		{video : {} },
		stream => video.srcObject = stream,
		err => console.log(err)
	);
};
if(YesStartAll){	//All the functionalities
	Promise.all([
		faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
		faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
		faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
		faceapi.nets.faceExpressionNet.loadFromUri("/models"),
		faceapi.nets.ageGenderNet.loadFromUri("/models")
	]).then(startVideo());

	video.addEventListener("play", async () => {
		const canvas = faceapi.createCanvasFromMedia(video);
		document.getElementsByClassName("todo")[0].append(canvas);
		const displaySize = {width: video.width, height: video.height};
		faceapi.matchDimensions(canvas, displaySize);
		setInterval(async () => {
			const detections = await faceapi.detectAllFaces(video, new 
				faceapi.TinyFaceDetectorOptions());
			const resizedDetections = faceapi.resizeResults(detections, displaySize);
			canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height);

			faceapi.draw.drawDetections(canvas, resizedDetections);
		}, 100);
	});
};
//--------------------------------------------------------Video Server functionalities--------------------------------------------------------
var socket = io();  //connection with the server
if(YesStartAll){
	socket.emit("GetPersonas");
};
//socket.on("CantidadPersonas", function(){
//});
