import mido
import time, threading
import random

#note lengths
noteLengths = [0.1,0.25,0.5,0.75]

notes_a = [45,47,48,49,52,54,56,58,60]

print(mido.get_output_names())
outport = mido.open_output(mido.get_output_names()[0])

class playTread(threading.Thread):
    def run(self):
        outport.send(mido.Message("note_on",note=notes_a[random.randint(0, len(notes_a)-1)], velocity=30, time=5))


def loopFunc():
    tr = playTread()
    tr.start()
    threading.Timer(noteLengths[random.randint(0, len(noteLengths)-1)], loopFunc).start()


loopFunc()
