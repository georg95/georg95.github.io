l=int(raw_input())
for i in xrange(l):
    a,b,m=map(int,raw_input().split())
    bbits=bin(b)[2:][::-1]
    res=1
    for n,bt in enumerate(bbits):
        if int(bt):
            res=(res*a)%m
        a=(a*a)%m
    print res,