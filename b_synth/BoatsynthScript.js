$(function () {

    var isPlaying = false;
    var boatInterval = null;
    var seqSpeed = 500;
    var seqArray = [0, 0, 0, 0, 0, 0, 0, 0];
    var currentStep = 0;

    var osc_a_volume = 1.0;
    var osc_b_volume = 1.0;
    var osc_sub_volume = 1.0;

    var detuneAmount = 0.1;

    var waveformz = ["sine", "square", "sawtooth", "triangle"];
    var osc_a_Waveform = 0;
    var osc_b_Waveform = 0;

    var osc_a_oct = 1;
    var osc_b_oct = 1;

    var pitch_attack = 0;
    var pitch_decay = 0.69;
    var pitch_amount = 1;

    var amp_attack = 0;
    var amp_decay = 0.69;

    var filter_cutoff = 6000;
    var filter_q = 0;

    var filter_attack = 0;
    var filter_decay = 0.69;
    var filter_amount = 1;

    var lfo_speed = 0;
    var lfo_depth = 0;

    var freqMod = 1;

    var reverbGain = 0;

    var lastStepElement = $(".seqSteps")[0];


    var drift_amount = 0;

    $("#output_reverb_sld").on("input", function () {

        reverbGain = Number($(this).val());
        reverb_gain.gain.setValueAtTime(reverbGain, audioContext.currentTime);

    });


    
    $("#filter_FREQ_MOD_sld").on("change", function () {
        freqMod = Number($(this).val());
        
    });


    $("#filter_LFO_DEPTH_sld").on("change", function () {
        lfo_depth = Number($(this).val());
        lfo_gain.gain.setValueAtTime(lfo_depth, audioContext.currentTime);
    });

    $("#filter_LFO_SPEED_sld").on("change", function () {
        lfo_speed = Number($(this).val());
        lfo.frequency.setValueAtTime(lfo_speed, audioContext.currentTime);
    });



    $("#drift_sld").on("change", function () {
        drift_amount = Number($(this).val());
    });

    $(".octBtn").click(function () {

        currentBtnId = $(this).attr("id");

        if (currentBtnId == "osc_a_oct_btn") {
            osc_a_oct++;
            if (osc_a_oct>10) {
                osc_a_oct = 1;
            }
        } else {
            osc_b_oct++;
            if (osc_b_oct > 10) {
                osc_b_oct = 1;
            }
        }




    });


    $(".octRstBtn").click(function () {
        currentBtnId = $(this).attr("id");
        if (currentBtnId == "osc_a_oct_Reset_btn") {
            osc_a_oct=1;
        } else {
            osc_b_oct = 1;
        }
    });




    //change shape button click
    $(".shapeBtn").click(function () {

        currentBtnId = $(this).attr("id");

        isOsc_a = true;
        currentOsc = osc_a;
        currentOscWaveform = osc_a_Waveform;

        if (currentBtnId == "osc_b_shape_btn") {
            currentOsc = osc_b;
            currentOscWaveform = osc_b_Waveform;
            isOsc_a = false;
        }

        if (currentOscWaveform == waveformz.length - 1) {
            currentOscWaveform = 0;
        } else {
            currentOscWaveform += 1;
        }
        currentOsc.type = waveformz[currentOscWaveform];

        if (isOsc_a) {
            osc_a_Waveform = currentOscWaveform;
        } else {
            osc_b_Waveform = currentOscWaveform;
        }

        $(this).html(waveformz[currentOscWaveform]);

    });

    //when we change the cutoff slider
    $("#filter_cut_sld").on("input", function () {

        filter_cutoff = $(this).val();
        biquadFilter.frequency.value = filter_cutoff;

    });

    //when we change the Q slider
    $("#filter_q_sld").on("input", function () {

        filter_q = $(this).val();
        biquadFilter.Q.value = filter_q;

    });

    //compression slide
    $("#output_comp_atk_sld").on("input", function () {

        compressor.threshold.setValueAtTime($(this).val(), audioContext.currentTime);

    });

    //output volume slide
    $("#output_vol_sld").on("input", function () {

        master_gain.gain.setValueAtTime($(this).val(), audioContext.currentTime);
    });


    //every seq step change will trigger this...
    $(".seqSteps").change(function (e) {

        //console.log(e.target.value);
        //console.log(e.target.getAttribute("step-data"));

        seqArray[Number(e.target.getAttribute("step-data"))] = Number(e.target.value);

        console.log(seqArray);

    });

    //when we change the speed slider
    $("#speed_sld").on("input", function () {

        //console.log($(this).val());

        if (!isPlaying) {
            return;
        }

        seqSpeed = Number(401 - $(this).val());
        //stopSeq();
        //startSeq();

    });

    //when we change any synth slider
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
            case "amp_attack_sld":
                amp_attack = Number(sldValue);
                break;
            case "amp_decay_sld":
                amp_decay =  Number(sldValue);
                break;
            case "filter_env_atk_sld":
                filter_attack = Number(sldValue);
                break;
            case "filter_dcy_sld":
                filter_decay = Number(sldValue);
                break;
            case "filter_env_sld":
                filter_amount = Number(sldValue);
                break;
            case "osc_pitch_env_sld":
                pitch_amount = Number(sldValue);
                break;
            case "osc_pitch_env_atk_sld":
                pitch_attack = Number(sldValue);
                break;
            case "osc_pitch_env_dcy_sld":
                pitch_decay = Number(sldValue);
                break;
            default:
        }

    });

    //distortion slider
    $("#output_dist_sld").on("input", function () {

        distortion.curve = makeDistortionCurve(Number($(this).val()));

    });




    //change button text and isPlay variable.
    $("#transport_btn").click(function (e) {

        //console.log("trasport btn click");

        if (e.target.innerHTML == "Start") {
            e.target.innerHTML = "Stop"
            isPlaying = true;
            startSeq();

        } else {
            e.target.innerHTML = "Start"
            isPlaying = false;
            stopSeq();
        }


    });



    //reverbStuff....






    //every seq tik function
    function stepFunction() {
        //console.log("tik! " + seqArray[currentStep]);
        if (currentStep < seqArray.length - 1) {
            currentStep++;
        } else {
            currentStep = 0;
        }

        currentVal = seqArray[currentStep];


        pitchDelta = (seqSpeed * pitch_decay) + pitch_attack;


        osc_a.frequency.setValueAtTime((currentVal - detuneAmount) * osc_a_oct, audioContext.currentTime);
        osc_b.frequency.setValueAtTime((currentVal + detuneAmount) * osc_b_oct, audioContext.currentTime);

        osc_sub.frequency.setValueAtTime((currentVal / 2) , audioContext.currentTime);


        osc_a.frequency.linearRampToValueAtTime(((currentVal - detuneAmount) * pitch_amount) * osc_a_oct , audioContext.currentTime + pitch_attack);
        osc_b.frequency.linearRampToValueAtTime(((currentVal + detuneAmount) * pitch_amount) * osc_b_oct , audioContext.currentTime + pitch_attack);

        osc_sub.frequency.linearRampToValueAtTime(((currentVal / 2) * pitch_amount), audioContext.currentTime + pitch_attack);



        osc_a.frequency.linearRampToValueAtTime((currentVal - detuneAmount) * osc_a_oct  , audioContext.currentTime + (pitchDelta / 800));
        osc_b.frequency.linearRampToValueAtTime((currentVal + detuneAmount) * osc_b_oct  , audioContext.currentTime + (pitchDelta / 800));

        osc_sub.frequency.linearRampToValueAtTime((currentVal / 2) , audioContext.currentTime + (pitchDelta / 800));




        delta = (seqSpeed * amp_decay) + amp_attack;


        osc_gain_a.gain.linearRampToValueAtTime((0.3 * osc_a_volume), (audioContext.currentTime + amp_attack));
        osc_gain_a.gain.linearRampToValueAtTime(0, audioContext.currentTime + (delta / 800) );

        osc_gain_b.gain.linearRampToValueAtTime((0.3 * osc_b_volume), (audioContext.currentTime + amp_attack));
        osc_gain_b.gain.linearRampToValueAtTime(0, audioContext.currentTime + (delta / 800) );

        osc_gain_sub.gain.linearRampToValueAtTime((0.3 * osc_sub_volume), (audioContext.currentTime + amp_attack));
        osc_gain_sub.gain.linearRampToValueAtTime(0, audioContext.currentTime + (delta / 800));


        filterDelta = (seqSpeed * filter_decay);



        biquadFilter.frequency.linearRampToValueAtTime((filter_amount * filter_cutoff) * freqMod, (audioContext.currentTime + filter_attack));
        biquadFilter.frequency.linearRampToValueAtTime(filter_cutoff, audioContext.currentTime + (filterDelta / 900));


        if (isPlaying) {
            setTimeout(stepFunction, getNextStepTime());
        }

        lastStepElement.style.backgroundColor = "white";
        $(".seqSteps")[currentStep].style.backgroundColor = "gold";
        lastStepElement = $(".seqSteps")[currentStep];
   

    }

    //start the seq
    function startSeq() {
        console.log("start seq");
        //boatInterval = setInterval(stepFunction, seqSpeed);

        setTimeout(stepFunction, getNextStepTime());


    }

    function getNextStepTime() {
        rnd = Math.random() * drift_amount;
        return seqSpeed + rnd;
    }


    //stop the seq
    function stopSeq() {
        console.log("stop seq");
        //clearInterval(boatInterval);
    }

    //the waveshaper (distortion) function
    function makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    };

    //the reverb convolotion buffer function
    function base64ToArrayBuffer(base64) {
        var base64_fix = _arrayBufferToBase64(base64);
        var binaryString = window.atob(base64_fix);
        var len = binaryString.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
    //dont ask... this is the reverb halper to convert the file data to base 64
    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }



    //audio setup
    $('#allowAudio').click(function () {
        audioContext.resume().then(() => {
            //console.log('Playback resumed successfully');

            osc_a = audioContext.createOscillator();
            osc_b = audioContext.createOscillator();
            osc_sub = audioContext.createOscillator();

            lfo = audioContext.createOscillator();
            lfo.frequency.setValueAtTime(lfo_speed, audioContext.currentTime);

            osc_gain_a = audioContext.createGain();
            osc_gain_b = audioContext.createGain();
            osc_gain_sub = audioContext.createGain();

            lfo_gain = audioContext.createGain();

            master_gain = audioContext.createGain();

            osc_gain_a.gain.setValueAtTime(0, audioContext.currentTime);
            osc_gain_b.gain.setValueAtTime(0, audioContext.currentTime);
            osc_gain_sub.gain.setValueAtTime(0, audioContext.currentTime);

            lfo_gain.gain.setValueAtTime(lfo_depth, audioContext.currentTime);

            

            biquadFilter = audioContext.createBiquadFilter();
            biquadFilter.type = "lowpass";
            biquadFilter.frequency.value = 6000;



            //here
            lfo.connect(lfo_gain);
            lfo_gain.connect(biquadFilter.frequency);

            reverb = audioContext.createConvolver();
            var reverbSoundArrayBuffer = base64ToArrayBuffer(reverbImpolseResponse);
            audioContext.decodeAudioData(reverbSoundArrayBuffer, function (buffer) {reverb.buffer = buffer;},function (e) {alert('Reverb Error ' + e.err);});

            reverb_gain = audioContext.createGain();
            //me!
            reverb_gain.gain.setValueAtTime(reverbGain, audioContext.currentTime);

            distortion = audioContext.createWaveShaper();
            distortion.oversample = '4x';
            distortion.curve = makeDistortionCurve(1);

            compressor = audioContext.createDynamicsCompressor();
            compressor.threshold.setValueAtTime(-1, audioContext.currentTime);
            compressor.knee.setValueAtTime(40, audioContext.currentTime);
            compressor.ratio.setValueAtTime(8, audioContext.currentTime);
            compressor.attack.setValueAtTime(0, audioContext.currentTime);
            compressor.release.setValueAtTime(0.25, audioContext.currentTime);

            master_gain.gain.setValueAtTime(0.3, audioContext.currentTime);

            osc_a.start();
            osc_b.start();
            osc_sub.start();

            lfo.start();

            osc_a.connect(osc_gain_a);
            osc_b.connect(osc_gain_b);
            osc_sub.connect(osc_gain_sub);

            osc_gain_a.connect(biquadFilter);
            osc_gain_b.connect(biquadFilter);
            osc_gain_sub.connect(biquadFilter);

            biquadFilter.connect(reverb);
            biquadFilter.connect(distortion);
            reverb.connect(reverb_gain);
            reverb_gain.connect(distortion);

            distortion.connect(compressor);

            compressor.connect(master_gain);

            master_gain.connect(audioContext.destination);


            $("#allowAudio").hide();
            $("#synthMask").hide();


        });
    });

    var audioContext = new (window.AudioContext || window.webkitAudioContext);

    var request = new XMLHttpRequest();

    request.open('GET', 'irHall.ogg', true);
    request.responseType = 'arraybuffer';
    request.send();
    request.onload = function () {
        reverbImpolseResponse = request.response;
    }


    var reverbImpolseResponse = null;
    var osc_a = null;
    var osc_b = null;
    var osc_sub = null;

    var lfo = null;

    var osc_gain_a = null;
    var osc_gain_b = null;
    var osc_gain_sub = null;

    var lfo_gain = null;

    var biquadFilter = null;

    var reverb = null;
    var reverb_gain = null;


    var distortion = null;

    var compressor = null;

    var master_gain = null;



});