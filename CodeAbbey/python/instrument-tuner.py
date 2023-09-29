import math
order="C,C#,D,D#,E,F,F#,G,G#,A,A#,B".split(",")
l=int(raw_input())
lst=raw_input().split()
freqC1=440.0/pow(2,float(9)/12.0+3)
for i in lst:
    noteord=int(round(12*math.log(float(i)/freqC1)/math.log(2)))
    print order[noteord%12]+str(noteord/12+1),