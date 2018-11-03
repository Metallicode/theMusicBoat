var myInterval;
var steps;
var currentStep;
var lastStep;
var currentStepNumber;
var isSeqOn;
var seqSpeed;
var nowTime;

$(function () {
    currentStepNumber = 0;
    steps = [];
    isSeqOn = false;
    var xx = document.getElementsByClassName("seqStep");
    seqSpeed = 120;
    for (var i = 0; i < xx.length; i++) {
        steps.push(xx[i]);
    }
    lastStep = steps[steps.length-1];


    var range4 = document.getElementById('range4');

    noUiSlider.create(range4, {
        start: 120,
        behaviour: 'tap',
        connect: 'upper',
        range: {
            'min': 40,
            'max': 1000
        }
    });


    range4.noUiSlider.on('slide', function (e) {

        seqSpeed = e;
        console.log(e);
    });

    range4.noUiSlider.on('set', function (e) {

        if (!isSeqOn) {
          
        } else {
            clearInterval(myInterval);
            myInterval = setInterval(function () {
                currentStep = steps[currentStepNumber];
                if (currentStepNumber == steps.length - 1) {
                    currentStepNumber = 0;
                } else {
                    currentStepNumber++;
                }

                var b = Math.random() * 100;
                oscillator4.frequency.value = b;
                oscillator3.frequency.value = b;
                oscillator2.frequency.value = b;
                oscillator1.frequency.value = b;
                myLFO.frequency.value = Math.random() * 10;



                var balls = document.getElementsByClassName('draggable');


                for (var i = 0; i < balls.length; i++) {
                    balls[i].style.transform =
           'translate(' + Math.round(Math.random() * 500) + 'px, ' + Math.round(Math.random() * 10) + 'px)';
                    balls[i].style.backgroundColor = "#" + Math.round(Math.random() * 250);
                }

                //oscillator2.frequency.value = Math.random() * currentStepNumber;
                //oscillator3.frequency.value = Math.random() * currentStepNumber;

                currentStep.style.backgroundColor = "red";
                lastStep.style.backgroundColor = "dodgerblue";
                lastStep = currentStep;
            }, seqSpeed, null);
        }

    });

    $("#playBtn").click(function () {

        if (!isSeqOn) {
            myInterval = setInterval(function () {

                currentStep = steps[currentStepNumber];
                if (currentStepNumber == steps.length - 1) {
                    currentStepNumber = 0;
                } else {
                    currentStepNumber++;
                }

                var b = Math.random() * 100;
                oscillator4.frequency.value = b;
                oscillator3.frequency.value = b;
                oscillator2.frequency.value = b;
                oscillator1.frequency.value = b;

                myLFO.frequency.value = Math.random() * 10;

                var balls = document.getElementsByClassName('draggable');

                for (var i = 0; i < balls.length; i++) {
                    balls[i].style.transform =
           'translate(' + Math.round(Math.random() * 500) + 'px, ' + Math.round(Math.random() * 10) + 'px)';
                    balls[i].style.backgroundColor = "#" + Math.round(Math.random() * 250);
                }


                currentStep.style.backgroundColor = "red";
                lastStep.style.backgroundColor = "dodgerblue";
                lastStep = currentStep;
                isSeqOn = true;
            }, seqSpeed, null);
        } else {
            clearInterval(myInterval);
            isSeqOn = false;
        }



    });


})

