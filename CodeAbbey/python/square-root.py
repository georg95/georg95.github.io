import sys
l=int(raw_input())
for i in xrange(l):
    x,n = raw_input().split()
    x,n=float(x),int(n)
    mysqr=1
    for p in xrange(n):
        mysqr=(mysqr+x/mysqr)/2.0
    sys.stdout.write(str(mysqr)+" ")
