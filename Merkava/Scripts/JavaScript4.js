
var resInterval;
var resTempo;

var resArry;
var curruntRes;
var lastRes;
var lastResNum;

var isResPlay;

$(function () {
    lastResNum = 0;
    resArry = [];
    resTempo = 120;
    isResPlay = false;

    var xxx = document.getElementsByClassName("seqStep2");
    for (var i = 0; i < xxx.length; i++) {
        resArry.push(xxx[i]);
    }

    lastRes = resArry[resArry.length-1];

    $("#playBtn2").click(function () {

     

        if (!isResPlay) {
            FilterQ = 14;

                resInterval = setInterval(function () {

                    curruntRes = resArry[lastResNum];


              
                    curruntRes.style.backgroundColor = "red";
                    lastRes.style.backgroundColor = "dodgerblue";

                    if (lastResNum == resArry.length-1) {
                        lastResNum=0;
                    } else {
                        lastResNum++;
                    }
                    lastRes = curruntRes;


                    biquadFilter.frequency.value = (Math.random() * 2000)*3;

                }, resTempo, null);
                isResPlay = true;

            } else {
            FilterQ = 7;
                clearInterval(resInterval);
                isResPlay = false;
            }

         

      
            console.log(isResPlay);


    });


    $("#dubleUp").click(function () {

        resTempo -= 10;

        clearInterval(resInterval);
        resInterval = setInterval(function () {

            curruntRes = resArry[lastResNum];



            curruntRes.style.backgroundColor = "red";
            lastRes.style.backgroundColor = "dodgerblue";

            if (lastResNum == resArry.length - 1) {
                lastResNum = 0;
            } else {
                lastResNum++;
            }
            lastRes = curruntRes;


            biquadFilter.frequency.value = (Math.random() * 2000) * 3;

        }, resTempo, null);
        isResPlay = true;


    });
    $("#dubleDown").click(function () {

        resTempo += 10;

        clearInterval(resInterval);
        resInterval = setInterval(function () {

            curruntRes = resArry[lastResNum];



            curruntRes.style.backgroundColor = "red";
            lastRes.style.backgroundColor = "dodgerblue";

            if (lastResNum == resArry.length - 1) {
                lastResNum = 0;
            } else {
                lastResNum++;
            }
            lastRes = curruntRes;


            biquadFilter.frequency.value = (Math.random() * 2000) * 3;

        }, resTempo, null);
        isResPlay = true;

    });

});