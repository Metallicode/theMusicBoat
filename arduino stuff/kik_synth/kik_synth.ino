int outPin = 8;
int inPin_a = 0;
int inPin_b = 1;
int inPin_c = 2;
int val_a = 255;
int val_b = 30;
int val_c = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(outPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:

  val_a = analogRead(inPin_a);
  val_a = map(val_a, 0, 1023, 0, 255);
  
  val_b = analogRead(inPin_b);
  val_b = map(val_b, 0, 1023, 0, 255);
  
  val_c = analogRead(inPin_c);
  val_c = map(val_c, 0, 1023, 0, 1000);

  
  for (int i=0; i <= val_a; i++){
      digitalWrite(outPin, HIGH);
      delayMicroseconds(val_b*i);
      delayMicroseconds(val_c);
      digitalWrite(outPin, LOW);
      delayMicroseconds(val_b*i);
      delayMicroseconds(val_c);
  }


}
