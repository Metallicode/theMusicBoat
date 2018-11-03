var userArp = [];
var freqws = T(function (count) {
   
    return userArp[count % userArp.length];
});

function setBPM() {
  
    BPMValue = document.getElementById("SpeedSld").value;
    document.getElementById("BPMCounter").innerText = BPMValue;

    interval.set({ value: Math.round(30000 / BPMValue) });

}

function setSin() {
    synth.wave = "sin";
    //synth = T("osc", { wave: "sin", freq: freqws, mul: 0.5 }).play();
    console.log("sin");
}
function setSaw() {

    synth.wave = "saw";
    //synth = T("osc", { wave: "saw", freq: freqws, mul: 0.5 }).play();
    console.log("saw");
}
function setTri() {
    synth.wave = "tri";
    //synth = T("osc", { wave: "tri", freq: freqws, mul: 0.5 }).play();
    console.log("tri");
}
function setPulse() {
    synth.wave = "pulse";
    //synth = T("osc", { wave: "pulse", freq: freqws, mul: 0.5 }).play();
    console.log("pulse");
}

var hasReverb = false;
var reverb;

var hasDelay = false;
var Delay;


function setReverb() {
    if (hasReverb) {
        synth.removeFrom(reverb);
        hasReverb = false;
    } else {
        reverb = T("reverb", { room: 0.7, damp: 0.2, mix: 0.75 }, synth).play();
        hasReverb = true;
    }
}

function setDelay() {
    if (hasDelay) {
        synth.removeFrom(Delay);
        hasDelay = false;
    } else {
        Delay = T("delay", { time: 60000/(BPMValue*1), fb:0.7, mix: 0.65 }, synth).play();
        hasDelay = true;
    }
}


function EnterString() {


    console.log("enter string");
    var str = document.getElementById("txtBoxComposer").value.trim();
    console.log(str);
    userArp = [];
    var AsciStr = "";
    for (var i = 0; i < str.length; i++) {
      //  console.log(str[i], str[i].charCodeAt(0) - 32);
    //    console.log(Math.round(midiToNewFreq(keydict.at(str[i].charCodeAt(0) - 32))));
        userArp.push(Math.round(midiToNewFreq(keydict.at(str[i].charCodeAt(0) - 32))))
        AsciStr += '{key="' + str[i] + '"' + ';code="' + str[i].charCodeAt(0) + '";}';
    }

    marki.innerText = AsciStr;
   
}


function setMyVcf() {

    //var cutoff = T("sin", { freq: "50ms", mul: 800, add: 10600 }).kr();
    filter = T("lpf", { cutoff: cutOffPoint }, synth).play();
}

function setFilterCutoff() {

    cutOffPoint = document.getElementById("FilterCutoff").value;
    filter.set({ cutoff: cutOffPoint * 1, Q: 9 });
    console.log(cutOffPoint);
}

var filter;
var cutOffPoint = 500;

var synth = T("osc", { wave: "sin", freq: freqws, mul: 0.9 });

var marki = document.getElementById("myMarquee");

var BPMValue = 300;
var EG = T("exp", { a: 5, d: 100 }, synth).bang();
var interval = T("param", { value: BPMValue });

T("interval", { interval: interval }, freqws, EG).start();
EG.play();

var keydict = T("ndict.key");
var midicps = T("midicps");
var noteModifier = [0,0,0,0,0,0,0,0,0,0,0,0];

var sliders;

var sinWave, sawWave, triWave, pulseWave;

var BpmSlider;
var FilterCutoff;
var revBtn;
var DelayBtn;


function initialFunction() {



    sliders = document.getElementsByClassName("PitchFader");

    for (var i = 0; i < sliders.length; i++) {
       
        var sld = sliders[i];
        console.log(sld.name);
        sliders[i].addEventListener('change', function () {

            listClick(this);

        }, true);


    }

    
    FilterCutoff = document.getElementById("FilterCutoff");
    FilterCutoff.addEventListener("click", setFilterCutoff, false);

    revBtn = document.getElementById("reverbBtn");
    revBtn.addEventListener("click", setReverb, false);

    DelayBtn = document.getElementById("delayBtn");
    DelayBtn.addEventListener("click", setDelay, false);

    BpmSlider = document.getElementById("SpeedSld");
    BpmSlider.addEventListener("click", setBPM, false);

    sinWave = document.getElementById("sinPic");
    sinWave.addEventListener("click", setSin, false);

    sawWave = document.getElementById("sawPic");
    sawWave.addEventListener("click", setSaw, false);

    triWave = document.getElementById("triPic");
    triWave.addEventListener("click", setTri, false);

    pulseWave = document.getElementById("pulsePic");
    pulseWave.addEventListener("click", setPulse, false);

    setMyVcf();
}



//T("keyboard").on("keydown", function (e) {
//    var midi = keydict.at(e.keyCode);
//    if (midi) {

//        var freq = Math.round(midiToNewFreq(midi));

//        synth.freq.value = freq;
//        EG.bang();
//        //synth.noteOnWithFreq(freq, 40);
//    }
//}).on("keyup", function (e) {
//    var midi = keydict.at(e.keyCode);
//    if (midi) {
//        var freq = Math.round(midiToNewFreq(midi));
//        EG.release();
//        //synth.noteOff(freq, 100);
//    }
//}).start();

function listClick(e) {
    console.log(e.name);
    switch (e.name) {
        case ("C"): noteModifier[0] = e.value / 5;
            break;
        case ("C#"): noteModifier[1] =  e.value /5;
            break;
        case ("D"): noteModifier[2] = e.value / 5;
            break;
        case ("D#"): noteModifier[3] = e.value / 5;
            break;
        case ("E"): noteModifier[4] = e.value / 5;
            break;
        case ("F"): noteModifier[5] = e.value / 5;
            break;
        case ("F#"): noteModifier[6] = e.value / 5;
            break;
        case ("G"): noteModifier[7] = e.value / 5;
            break;
        case ("G#"): noteModifier[8] = e.value / 5;
            break;
        case ("A"): noteModifier[9] = e.value / 5;
            break;
        case ("A#"): noteModifier[10] = e.value / 5;
            break;
        case ("B"): noteModifier[11] = e.value / 5;
            break;
        default:
            break;

    }
}

function midiToNewFreq(midi) {

    //console.log("calculating new pitch");
    //console.log("freq: " + midicps.at(midi));
    //console.log("Diff: " + midicps.at(noteModifier[midi % 12]));
    //console.log(midicps.at(midi) + midicps.at(noteModifier[midi % 12]));

   
    return midicps.at(midi) + midicps.at(noteModifier[midi % 12]);

}