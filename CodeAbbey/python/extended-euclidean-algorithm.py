def gcd(a,b):
    x2,x1,y2,y1=1,0,0,1
    while b!=0:
        x1,x2=x2-(a/b)*x1,x1
        y1,y2=y2-(a/b)*y1,y1
        a,b=b,a%b
    return a,x2,y2
l=int(raw_input())
for i in xrange(l):
    a,b=map(int, raw_input().split())
    print " ".join([str(x) for x in gcd(a,b)])