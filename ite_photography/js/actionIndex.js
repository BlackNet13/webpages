window.onload = choosePic;

var myPix = new Array("images/tinted_bg.jpg", "images/blackNwhite1.jpg", "images/blackNwhite2.jpg", "images/blackNwhite3.jpg");

function choosePic()
{
    var randomNum = Math.floor((Math.random() * myPix.length));
    document.getElementById("mainContainer").style.backgroundImage =
        "url(" + myPix[randomNum] + ")";
} 