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
    /*todo.id = 'noDisplay';
    noMobile.id = 'yesDisplay';*/
    todo.id = 'yesDisplay';
    noMobile.id = 'noDisplay';
    YesStartAll = true;
}else{  //if it is in a website hide noMobile
    todo.id = 'yesDisplay';
    noMobile.id = 'noDisplay';
    YesStartAll = true;
}
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
	)
};
if(YesStartAll){	//All the functionalities
	startVideo();
};
//--------------------------------------------------------Video Server functionalities--------------------------------------------------------
var socket = io();  //connection with the server
if(YesStartAll){
	socket.emit("GetPersonas");
};
socket.on("CantidadPersonas", function(){
	document.getElementsByClassName("todo")[0].innerHTML += "<video id='video' width='720' height='560' autoplay muted></video>";
});
