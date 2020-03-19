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