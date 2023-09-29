import sys

l=int(raw_input())
data = raw_input().split()
for i in data:
    lst = [int(x) for x in list(i)]    
    wsd=0
    for p in xrange(len(i)):
        wsd += (p+1)*lst[p]
    sys.stdout.write(str(wsd)+" ")