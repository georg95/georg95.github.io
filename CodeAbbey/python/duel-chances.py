l=int(raw_input())
for i in xrange(l):
    pA,pB=[float(x)/100.0 for x in raw_input().split()]
    pAwin,pBwin=0,0
    for t in range(0,10000)[::-1]:
        prob=(1.0-pA)**(t/2)*(1.0-pB)**(t-t/2)
        pAwin,pBwin=pAwin+pA*prob*((t+1)%2),pBwin+pB*prob*(t%2)
    print int(round(pAwin*100)),