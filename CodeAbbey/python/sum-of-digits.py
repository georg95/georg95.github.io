import sys

l=int(raw_input())
for i in xrange(l):
    a,b,c=(int(x) for x in raw_input().split())
    result = a*b+c
    s = sum([int(x) for x in list(str(result))])
    sys.stdout.write(str(s)+" ")