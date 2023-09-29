import sys
l=int(raw_input())
for i in xrange(l):
    dist,va,vb = [float(x) for x in raw_input().split()]
    t=dist/(va+vb)
    sys.stdout.write(str(va*t)+" ")