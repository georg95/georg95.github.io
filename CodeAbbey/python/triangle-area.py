import math
l = int(raw_input())
for i in xrange(l):
    x1,y1,x2,y2,x3,y3=[float(x) for x in raw_input().split()]
    a,b,c=map(lambda (dx,dy): math.sqrt(dx**2+dy**2), [[x2-x1,y2-y1],[x3-x1,y3-y1],[x3-x2,y3-y2]])
    s=(a+b+c)/2
    print math.sqrt(s*(s-a)*(s-b)*(s-c)),