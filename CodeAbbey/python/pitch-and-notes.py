order=dict((x,y) for (y,x) in enumerate("C,C#,D,D#,E,F,F#,G,G#,A,A#,B".split(",")))
l=int(raw_input())
lst=raw_input().split()
for i in lst:
    note,octav=order[i[:-1]],int(i[1:].replace("#",""))-1
    print int(round(440.0/pow(2,float(9)/12.0+3)*pow(2,float(note)/12.0+octav))),