import sys

l = int(raw_input())
for i in xrange(l):
    a,b,c=raw_input().split()
    a,b,c=int(a),int(b),int(c)
    sys.stdout.write(str(min(a,b,c))+' ')