$(function () {

    var isPlaying = false;
    var boatInterval = null;
    var seqSpeed = 1000;
    var seqArray = [0, 0, 0, 0, 0, 0, 0, 0];
    var currentStep = 0;

    var osc_a_volume = 1.0;
    var osc_b_volume = 1.0;
    var osc_sub_volume = 1.0;

    var detuneAmount = 0;

    //every seq step change will trigger this...
    $(".seqSteps").change(function (e) {

        console.log(e.target.value);
        console.log(e.target.getAttribute("step-data"));

        seqArray[Number(e.target.getAttribute("step-data"))] = Number(e.target.value);

        console.log(seqArray);

    });

    //when we change the speed slider
    $("#speed_sld").on("input",function () {

        console.log($(this).val());

        if (!isPlaying) {
            return;
        }

        seqSpeed = Number(401 - $(this).val());
        stopSeq();
        startSeq();

    });


    $(".synthSld").on("input", function () {
        sldValue = $(this).val();
        element_id = $(this).attr("id");

        switch (element_id) {
            case "osc_a_vol_sld":
                osc_a_volume = sldValue;
                break;
            case "osc_b_vol_sld":
                osc_b_volume = sldValue;
                break;
            case "osc_sub_vol_sld":
                osc_sub_volume = sldValue;
                break;
            case "osc_detune_sld":
                detuneAmount = Number(sldValue);
                break;
            default:
        }





    });



    //change button text and isPlay variable.
    $("#transport_btn").click(function (e) {

        console.log("trasport btn click");

        if (e.target.innerHTML=="Start") {
            e.target.innerHTML = "Stop"
            isPlaying = true;
            startSeq();

        } else {
            e.target.innerHTML = "Start"
            isPlaying = false;
            stopSeq();
        }
        

    });





    //every seq tik function
    function stepFunction() {
        console.log("tik! " + seqArray[currentStep]);
        if (currentStep < seqArray.length - 1) {
            currentStep++;
        } else {
            currentStep = 0;
        }

        currentVal = seqArray[currentStep];

        osc_a.frequency.setValueAtTime(currentVal - detuneAmount, audioContext.currentTime);
        osc_b.frequency.setValueAtTime(currentVal + detuneAmount, audioContext.currentTime);

        osc_sub.frequency.setValueAtTime(currentVal/2, audioContext.currentTime);


        osc_gain_a.gain.linearRampToValueAtTime((0.3 * osc_a_volume), audioContext.currentTime + 0.05);
        osc_gain_a.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + (seqSpeed));

        osc_gain_b.gain.linearRampToValueAtTime((0.3 * osc_b_volume), audioContext.currentTime + 0.05);
        osc_gain_b.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + (seqSpeed));

        osc_gain_sub.gain.linearRampToValueAtTime((0.3 * osc_sub_volume), audioContext.currentTime + 0.05);
        osc_gain_sub.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + (seqSpeed));

    }

    //start the seq
    function startSeq() {
        console.log("start seq");
        boatInterval = setInterval(stepFunction, seqSpeed);
    }

    //stop the seq
    function stopSeq() {
        console.log("stop seq");
        clearInterval(boatInterval);
    }

    $('#allowAudio').click(function () {
        audioContext.resume().then(() => {
            console.log('Playback resumed successfully');

            osc_a = audioContext.createOscillator();
            osc_b = audioContext.createOscillator();
            osc_sub = audioContext.createOscillator();

            osc_gain_a  = audioContext.createGain();
            osc_gain_b  = audioContext.createGain();
            osc_gain_sub = audioContext.createGain();
            master_gain = audioContext.createGain();

            osc_gain_a.gain.setValueAtTime(0, audioContext.currentTime);
            osc_gain_b.gain.setValueAtTime(0, audioContext.currentTime);
            osc_gain_sub.gain.setValueAtTime(0, audioContext.currentTime);
            master_gain.gain.setValueAtTime(0.3, audioContext.currentTime);

            osc_a.start();
            osc_b.start();
            osc_sub.start();

            osc_a.connect(osc_gain_a);
            osc_b.connect(osc_gain_b);
            osc_sub.connect(osc_gain_sub);

            osc_gain_a.connect(master_gain);
            osc_gain_b.connect(master_gain);
            osc_gain_sub.connect(master_gain);

            master_gain.connect(audioContext.destination);

        });
    });

    var audioContext = new (window.AudioContext || window.webkitAudioContext);

    var osc_a = null;
    var osc_b = null;
    var osc_sub = null;

    var osc_gain_a = null;
    var osc_gain_b = null;
    var osc_gain_sub = null;

    var biquadFilter = null;



    var compressor = null;

    var master_gain = null;


    //    = aContext.createBiquadFilter();
    //biquadFilter.type = "lowpass";


});