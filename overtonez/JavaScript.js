var audioCtx;
var mainGainNode;
$(function () {

	document.querySelector('#unmuteButton').addEventListener('click', function() {
	audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	set_audio();
	
	
	
	});


    var toneFreq = 60;

    var Est = false;

    var gainArray = new Array();
    var pitchArray = new Array();


    var wavForms = ["sine", "square", "sawtooth", "triangle"];
    var currentWavIndex = 1;

    

    var mainGainValue = 0.5;

	function set_audio(){
		
		
    mainGainNode = audioCtx.createGain();
    mainGainNode.gain.setValueAtTime(mainGainValue, audioCtx.currentTime);
    mainGainNode.connect(audioCtx.destination);


    var oscilloscope = new Oscilloscope('.js-oscilloscope', audioCtx);
    mainGainNode.connect(oscilloscope.analyserNode);
    oscilloscope.start();

    for (var i = 0; i < $(".aFader").length; i++) {
        freq = toneFreq * (i + 1);

        var gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.0, audioCtx.currentTime);
        gainArray.push(gainNode);

        var oscillator = audioCtx.createOscillator();
        oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
        pitchArray.push(oscillator)

        oscillator.connect(gainNode);
        gainNode.connect(mainGainNode);

        oscillator.start();

    }
		
	}
	


    $("#mainPitch").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
        }

        var pitchValue = keyboardKeyToPitch(event.key);
        console.log(pitchValue);
        changePitch(pitchValue);
        $("#mainPitch").val(pitchValue);
        $("#hertzHolder").text(pitchValue);
    });


    function keyboardKeyToPitch(e) {

        var val = 0;

        var scaleA = [65, 69, 73, 77, 82, 87, 92, 98, 103, 110, 116, 123, 130];
        var scaleB = [65, 69, 71, 77, 82, 87, 92, 98, 103, 107, 116, 123, 130];

        var curScale = scaleA;

        if (Est) {
            curScale = scaleB;
        } 


        switch (e) {

            case "a":
                val = curScale[0];
                break;

            case "w":
                val = curScale[1];
                break;

            case "s":
                val = curScale[2];
                break;

            case "e":
                val = curScale[3];
                break;

            case "d":
                val = curScale[4];
                break;

            case "f":
                val = curScale[5];
                break;

            case "t":
                val = curScale[6];
                break;

            case "g":
                val = curScale[7];
                break;

            case "y":
                val = curScale[8];
                break;

            case "h":
                val = curScale[9];
                break;

            case "u":
                val = curScale[10];
                break;

            case "j":
                val = curScale[11];
                break;

            case "k":
                val = curScale[12];
                break;

            default:
                break;
        }

        return val;

    }




    function nameToInt(name) {

        var val = 0;

        switch (name) {
            case "r1":
                val = 0;
                break;
            case "r2":
                val = 1;
                break;
            case "r3":
                val = 2;
                break;
            case "r4":
                val = 3;
                break;
            case "r5":
                val = 4;
                break;
            case "r6":
                val = 5;
                break;
            case "r7":
                val = 6;
                break;
            case "r8":
                val = 7;
                break;
            case "r9":
                val = 8;
                break;
            case "r10":
                val = 9;
                break;
            case "r11":
                val = 10; 
                break;
            case "r12":
                val = 11;
                break;
            case "r13":
                val = 12;
                break;
            case "r14":
                val = 13;
                break;
            case "r15":
                val = 14;
                break;
            case "r16":
                val = 15;
                break;
            default:
                break;
        }

        return val;


    }


    $(".aFader").on("input", function () {

        console.log($(this).attr('name'), $(this).val());

        console.log(nameToInt($(this).attr('name')));


        gainArray[nameToInt($(this).attr('name'))].gain.setValueAtTime($(this).val()*0.8, audioCtx.currentTime);



    })

    


    $("#scalebutton").click(function () {

        Est = !Est;

        if (Est) {
            $(this).text("scale B");
        } else {
            $(this).text("scale A");
        }

       
    });


    $("#wavbutton").click(function () {

        if (wavForms.length == currentWavIndex) {
            currentWavIndex = 0;
        }
        
        

        for (var i = 0; i < $(".aFader").length; i++) {

            pitchArray[i].type = wavForms[currentWavIndex];


        }
        
        currentWavIndex += 1;

    });

    $("#clrbutton").click(function () {

      
        for (var i = 0; i < $(".aFader").length; i++) {
            gainArray[i].gain.setValueAtTime(0, audioCtx.currentTime);
        }

        $(".aFader").each(function () {

            $(this).val(0);

        })

    });

    $("#nicebutton").click(function () {

        var harmonlist = new Array(0.6, 0.33, 0.2, 0.17, 0.15, 0.13, 0.10, 0.088, 0.07, 0.06, 0.05, 0.040, 0.035, 0.03, 0.027, 0.025);

        for (var i = 0; i < $(".aFader").length; i++) {
            gainArray[i].gain.setValueAtTime(harmonlist[i], audioCtx.currentTime);
        }

        harmonlist.reverse();

        $(".aFader").each(function () {

            $(this).val(harmonlist.pop());

        })

    });

    $("#rndbutton").click(function () {

        var harmonlist = new Array();

        for (var i = 0; i < $(".aFader").length; i++) {
            harmonlist.push(Math.random()*0.5);
        }

        

        for (var i = 0; i < $(".aFader").length; i++) {
            gainArray[i].gain.setValueAtTime(harmonlist[i], audioCtx.currentTime);
        }

        harmonlist.reverse();

        $(".aFader").each(function () {

            $(this).val(harmonlist.pop());

        })

    });

    $("#mainVolume").on("input", function () {


       
        mainGainNode.gain.setValueAtTime($(this).val(), audioCtx.currentTime);


    })

    function changePitch(v) {

        for (var i = 0; i < $(".aFader").length; i++) {
            if (i % 2 == 0) {
                pitchArray[i].frequency.setValueAtTime(v * (i + 1) + ((i + 1) * 50) * $("#detune").val(), audioCtx.currentTime);
            } else {
                pitchArray[i].frequency.setValueAtTime(v * (i + 1) - ((i + 1) * 50) * $("#detune").val(), audioCtx.currentTime);
            }

        }



    }


    $("#mainPitch").on("input", function () {

        toneFreq = $(this).val();
        changePitch(toneFreq);

        $("#hertzHolder").text($(this).val());
        console.log($(this).val());
       // $("#detune").val(0);
        
    })


    $("#detune").on("input", function () {

 

        for (var i = 0; i < $(".aFader").length; i++) {
            if (i % 2 == 0) {
                pitchArray[i].frequency.setValueAtTime(toneFreq * (i + 1) + ((i+1) * 50) * $(this).val(), audioCtx.currentTime);
            } else {
                pitchArray[i].frequency.setValueAtTime(toneFreq * (i + 1) - ((i+1) * 50) * $(this).val(), audioCtx.currentTime);
            }
            
        }

        console.log($(this).val());


    })

})