import math
l=int(raw_input())
for i in xrange(l):
    n,k=map(int,raw_input().split())
    print math.factorial(n)/math.factorial(k)/math.factorial(n-k),