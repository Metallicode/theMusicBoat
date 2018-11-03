function printPolyScale(val){

    var iib, ii, iiib, iii, iv, vb, v, vib, vi, viib, vii, viii;

    var inputBpm = val;


    iib = (inputBpm / 15) * 16.0;
    ii = (inputBpm / 8) * 9.0;

    iiib = (inputBpm / 27) * 32.0;
    iii = (inputBpm / 4) * 5.0;

    iv = (inputBpm / 3) * 4.0;

    vb =  (inputBpm / 45) * 64.0;
    v =  (inputBpm / 2) * 3.0;

    vib =  (inputBpm / 81) * 128.0;
    vi =  (inputBpm / 3) * 5.0;

    viib = (inputBpm / 9) * 16.0;
    vii = (inputBpm / 8) * 15.0;

    viii = inputBpm * 2.0;

    console.log("I: " + inputBpm);
    console.log("IIb: " + iib);
    console.log("II: " + ii);
    console.log("IIIb: " + iiib);  
    console.log("III: " + iii);  
    console.log("IV: " + iv);
    console.log("Vb: " + vb);
    console.log("V: " + v);
    console.log("VIb: " + vib);
    console.log("VI: " + vi);
    console.log("VIIb: " + viib);
    console.log("VII: " + vii);
    console.log("VIII: " + viii);



}