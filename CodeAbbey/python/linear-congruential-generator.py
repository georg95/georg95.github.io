l=int(raw_input())
for i in xrange(l):
    a,c,m,x0,n=[int(x) for x in raw_input().split()]
    for j in xrange(n):
        x0=(a*x0+c)%m
    print x0,