import math
def f(A,B,C,x,y):
    return (x-A)**2+(y-B)**2+C*math.e**(-(x + A)**2-(y+B)**2)
l,A,B,C=map(float, raw_input().split())
for i in xrange(int(l)):
    x,y=map(float, raw_input().split())
    fp=f(A,B,C,x,y)
    fdx=f(A,B,C,x+1e-9,y)-fp
    fdy=f(A,B,C,x,y+1e-9)-fp
    print int(round(math.atan2(fdy/1e-9, fdx/1e-9)/math.pi*180))+180,