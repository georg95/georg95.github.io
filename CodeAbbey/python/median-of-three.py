import sys

l=int(raw_input())
for i in xrange(l):
    a,b,c=raw_input().split()
    x=[int(a),int(b),int(c)]
    x.sort()
    sys.stdout.write(str(x[1])+" ")