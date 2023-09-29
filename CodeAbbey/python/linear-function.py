import sys
l=int(raw_input())
for i in xrange(l):
    x1,y1,x2,y2=[int(x) for x in raw_input().split()]
    a = (y2-y1)/(x2-x1)
    b = y1-a*x1
    sys.stdout.write("("+str(a)+" "+str(b)+") ")