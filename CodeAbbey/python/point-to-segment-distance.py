import math
l=int(raw_input())
def dst(x1,y1,x2,y2):
    return math.sqrt((x2-x1)**2+(y2-y1)**2)
for i in xrange(l):
    x1,y1,x2,y2,xp,yp=map(float, raw_input().split())
    A,B,C=(y1-y2,x2-x1,x1*y2-x2*y1)
    dp=abs(A*xp+B*yp+C)/math.sqrt(A**2+B**2)
    d1,d2,dl=dst(x1,y1,xp,yp),dst(x2,y2,xp,yp),dst(x1,y1,x2,y2)
    truedst=dp
    if d1**2-dp**2 > dl**2: truedst = d2
    if d2**2-dp**2 > dl**2: truedst = d1
    print truedst,