import math
l=int(raw_input())
for i in xrange(l):
    A,B,C,D=map(float,raw_input().split())
    s,f = 0.0,100.0
    for i in xrange(200):
        x = (s+f)/2.0
        if A * x + B * math.sqrt(x ** 3) - C * math.exp(-x / 50) - D == 0:
            break
        if A * x + B * math.sqrt(x ** 3) - C * math.exp(-x / 50) - D < 0:
            s=x
        else:
            f=x
    print x,