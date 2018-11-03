import mido
import time, threading
import random

#note lengths seq
seq_01 = [0.1,0.25,0.5,0.75]
seq_02 = [0.25,0.25,0.25,0.75]
seq_03 = [0.05,0.05,0.05,0.05, 0.05,0.2]
seq_04 = [0.1,0.2,0.2,0.1,0.1]
seq_05 = [0.05,0.06,0.07,0.08,0.09,0.1,0.11, 0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2]
seq_06 = seq_05[::-1]
seq_07 = [0.05,0.07,0.09,0.1,0.2,0.3,0.2,0.1,0.09,0.07,0.05]

#notes
tone_A = 32
tone_C = 35

#modes/clusters
mode_ionian = [1,3,5,6,8,10,12,13]
mode_aeolian = [1,3,4,6,8,9,12,13]
mode_harmonicMinor = [1,3,4,6,8,9,12,14]
mode_dim = [1,4,7,10,13,16,19]
mode_augmented = [1,3,5,7,9,11,13,15,17]

cluster_a = [1,1,1,5,1,2,6]
cluster_b = [1,1,1,3,3,3,3,4,6,8,8,8,10,1]

#seq generator
def looper(seq):
    loop_length = len(seq)-1
    counter = 0
    while True:
        yield seq[counter]
        if loop_length == counter:
            counter = 0
        else:
            counter += 1





#set playRun
scale = cluster_b           #mode OR cluster
tone = tone_C +12              # C OR A
sequence = looper(seq_05)   #set a sequence
speed = 1.0                   #0.2 - 2.0~




#print output names
print(mido.get_output_names())

#set midi port
outport = mido.open_output(mido.get_output_names()[1])

#Notes dispatch
class playTread(threading.Thread):
    def run(self):
        nt=scale[random.randint(0, len(scale)-1)]+tone
        outport.send(mido.Message("note_on",note=nt, velocity=30, time=5))
        time.sleep(0.01)
        outport.send(mido.Message("note_off", note=nt))
        
        
#thread maker
def loopFunc():
    tr = playTread()
    tr.start()
    threading.Timer(next(sequence)*speed, loopFunc).start()


#start script
loopFunc()
