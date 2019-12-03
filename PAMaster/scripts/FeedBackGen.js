var audioCtx;
var oscillator;
var freqArray;
var gainNode;
var feedbackGain;
var freqIndex;
var isUp;
var timeOutId;

$(function () {

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    feedbackGain = 0;
    //$("#stan").hide();
    isUp = false;
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = feedbackGain;

    freqArray = [63,80,100,125,160,200,250,315,400,500,630,800,1000,1250,1600,2000,2500,3150,4000,5000,6300,8000,10000];

    oscillator.type = 'sine';
    oscillator.start();

 document.getElementById('button').addEventListener('click', function() {
  audioCtx.resume().then(() => {
    console.log('Playback resumed successfully');
	$('#button').remove();
  });
});
   


    $(".fader").click(function () {
        
        var userChoice = $(this).attr("freqIndex")*1;

        console.log("clicked: " + userChoice);
        console.log("current: " + freqIndex);

        if (userChoice == freqIndex) {
            
            clearTimeout(timeOutId);
            startGame();
        }


    });

    alert("P.A Master, feedback emulator. please use carefully, excessive volume may cause damage to you and your equipment.\n click OK to Start");
    startGame();
});

function startGame() {

    if (isUp) {
        $("#stan").animate({ marginTop: "+=100px" }, 300);
        isUp = false;
    }
    freqIndex = getRandomFreq();
    oscillator.frequency.value = freqArray[freqIndex]; // value in hertz
    feedbackGain =0;
    gainNode.gain.value = feedbackGain;

    timeOutId = setTimeout(function () {
        isUp = true;
        $("#stan").animate({ marginTop: "-=100px" }, 300);
    }, 6000);


    var intervalId = setInterval(function () {

        if (feedbackGain < 1) {
            feedbackGain += 0.003;
            gainNode.gain.value = feedbackGain;
        } else {

            clearInterval(intervalId);
        }

    }, 80);

}

function getRandomFreq() {

    return Math.floor(Math.random() * 23);

}