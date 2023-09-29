import math
l=int(raw_input())
for i in xrange(l):
    inp = raw_input().split()
    prices=[float(x) for x in inp[1:]]
    mean = sum(prices)/len(prices)
    deviation = math.sqrt(sum([(x-mean)**2 for x in prices])/len(prices))
    if deviation >= mean*0.04:
        print inp[0],