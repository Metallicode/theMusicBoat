
var oscillator1;
var oscillator2;
var oscillator3;
var oscillator4;
var myLFO;
var gainNode;
var sineGain;
var filterGain;
var biquadFilter;
var FilterFreq;
var osc01IsOn;
var osc02IsOn;
var FilterQ;
var synthDelay;

var analyser;

$(function () {


    FilterQ = 7;
    osc01IsOn = false;
    osc02IsOn = false;

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    FilterFreq = 1000;
    oscillator1 = audioCtx.createOscillator();
    oscillator3 = audioCtx.createOscillator();
    oscillator4 = audioCtx.createOscillator();
    myLFO = audioCtx.createOscillator();
    biquadFilter = audioCtx.createBiquadFilter();
    synthDelay = audioCtx.createDelay(15.0);
    synthDelay.delayTime.value = 0.50;
    analyser = audioCtx.createAnalyser();
    myLFO.frequency.value = 4;

    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = FilterFreq;
    biquadFilter.gain.value = 40;
    biquadFilter.Q.value = FilterQ;


    oscillator2 = audioCtx.createOscillator();
    dlyGain = audioCtx.createGain();
    gainNode = audioCtx.createGain();
    sineGain = audioCtx.createGain();
    filterGain = audioCtx.createGain();

    sineGain.gain.value = 10000;
    filterGain.gain.value = 1000;


    $("#active02").change(function () {

 
        if (osc01IsOn) {
         
            oscillator3.disconnect();
            osc01IsOn = false;
        }
        else {
           
            oscillator3.connect(sineGain);
            osc01IsOn = true;
        }
      
    });
    $("#active03").change(function () {

      
        if (osc02IsOn) {
            oscillator4.disconnect();
            osc02IsOn = false;
        }
        else {
            oscillator4.connect(sineGain);
            osc02IsOn = true;
        }
       
    });

    myLFO.start();
    myLFO.type = 'sine';

    oscillator1.connect(sineGain);
    sineGain.connect(oscillator2.frequency);
    oscillator2.connect(biquadFilter);

    biquadFilter.connect(gainNode);
    myLFO.connect(filterGain);
    filterGain.connect(biquadFilter.frequency);
   
    gainNode.connect(analyser);
    gainNode.connect(audioCtx.destination);

    oscillator1.type = 'sawtooth';
    oscillator2.type = 'sine';
    oscillator3.type = 'sine';
    oscillator4.type = 'sine';


    oscillator1.start();
    oscillator2.start();
    oscillator3.start();
    oscillator4.start();
    var range1 = document.getElementById('range1');
    var range2 = document.getElementById('range2');
    var range3 = document.getElementById('range3');
    var range5 = document.getElementById('range5');

    noUiSlider.create(range5, {
        start: 1000,
        behaviour: 'tap',
        connect: 'upper',
        range: {
            'min': 40,
            'max': 12000
        }
    });


    range5.noUiSlider.on('slide', function (e) {

        FilterFreq = e;
        biquadFilter.frequency.value = FilterFreq;
    });

    noUiSlider.create(range1, {
        start: 1,
        behaviour: 'tap',
        connect: 'upper',
        range: {
            'min': 0.1,
            'max': 12000
        }
    });


    range1.noUiSlider.on('slide', function (e) {

        oscillator1.frequency.value = e;
        console.log(e);
    });




    noUiSlider.create(range2, {
        start: 1,
        behaviour: 'tap',
        connect: 'upper',
        range: {
            'min': 0.1,
            'max': 12000
        }
    });


    range2.noUiSlider.on('slide', function (e) {

        oscillator3.frequency.value = e;
        console.log(e);
    });

    noUiSlider.create(range3, {
        start: 1,
        behaviour: 'tap',
        connect: 'upper',
        range: {
            'min': 0.1,
            'max': 12000
        }
    });


    range3.noUiSlider.on('slide', function (e) {

        oscillator4.frequency.value = e;
        console.log(e);
    });
})