#include <SD.h>                      // need to include the SD library
//#define SD_ChipSelectPin 53  //example uses hardware SS pin 53 on Mega2560
#define SD_ChipSelectPin 4  //using digital pin 4 on arduino nano 328, can use other pins
#include <TMRpcm.h>           //  also need to include this library...
#include <SPI.h>

TMRpcm tmrpcm;   // create an object for use in this sketch
int inPin_a = 0;
int val_a = 255;

void setup(){

  tmrpcm.speakerPin = 9; //5,6,11 or 46 on Mega, 9 on Uno, Nano, etc

  if (!SD.begin(SD_ChipSelectPin)) {  // see if the card is present and can be initialized:
    return;   // don't do anything more if not
  }
  tmrpcm.play("a.wav"); //the sound file "music" will play each time the arduino powers up, or is reset
}



void loop(){  
    val_a = analogRead(inPin_a);
    val_a = map(val_a, 0, 1023, 5, 500);

    delay(val_a);
    tmrpcm.stopPlayback(); 
    tmrpcm.play("a.wav", 0.02);


}
