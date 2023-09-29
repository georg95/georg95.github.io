import math
l=int(raw_input())
for i in xrange(l):
    D1,A,B=map(float,raw_input().split())
    A,B=A*math.pi/180,B*math.pi/180
    D2=math.tan(A)*D1/(math.tan(B)-math.tan(A))
    print int(round(math.tan(B)*D2)),