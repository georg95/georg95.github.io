l=int(raw_input())
for i in xrange(l):
    s,r,p = [float(x) for x in raw_input().split()]
    years=0
    while s<r:
        s*=1.0+float(p)/100.0
        s=float(int(s*100))/100.0
        years+=1
    print years,