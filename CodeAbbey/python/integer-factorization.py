from math import sqrt
def factor(x):
    for i in xrange(2,int(sqrt(x))+1):
        if x%i == 0:
            return [i]+factor(x//i)
    return [x]
l=int(raw_input())
for i in xrange(l):
    print "*".join([str(x) for x in factor(int(raw_input()))]),