l=int(raw_input())
for i in xrange(l):
    a,b = [int(x)%6+1 for x in raw_input().split()]
    print a+b,