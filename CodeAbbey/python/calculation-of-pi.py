import math
p,steps=map(int, raw_input().split())
side,N,R=10**p,6,10**p
def isqrt(n):
    x = n
    y = (x+1)//2
    while y < x:
        x = y
        y = (x+n//x)//2
    return x
for i in xrange(steps):
    N*=2
    d=side//2
    h=isqrt(R**2-d**2)
    side=isqrt(d**2+(R-h)**2)
print side*N//2