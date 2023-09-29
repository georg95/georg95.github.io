import sys
l=int(raw_input())
for i in xrange(l):    
    abc = [int(x) for x in raw_input().split()]
    abc.sort()
    sys.stdout.write("1 " if abc[2]<=abc[1]+abc[0] else "0 ")