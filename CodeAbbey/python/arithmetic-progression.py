import sys

l=int(raw_input())
for i in xrange(l):    
    a,b,n = (int(x) for x in raw_input().split())
    sys.stdout.write(str(a*n+n*(n-1)/2*b)+" ")