import sys

l=int(raw_input())
for i in xrange(l):
    a=float(raw_input())
    sys.stdout.write(str(int(a*6)+1)+" ")