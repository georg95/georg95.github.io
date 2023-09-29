import math
l=int(raw_input())
for i in xrange(l):
    a,b,c=map(int, raw_input().split())
    D=b**2-4*a*c
    real = int(-b//(2*a))
    sqrd = math.sqrt(abs(D))
    s=";" if i != l-1 else ""
    if D < 0:
        print str(real)+"+"+str(int(sqrd//(2*a)))+"i",
        print str(real)+"-"+str(int(sqrd//(2*a)))+"i"+s,
    else:
        print str(int((-b+sqrd)//(2*a))),
        print str(int((-b-sqrd)//(2*a)))+s,
