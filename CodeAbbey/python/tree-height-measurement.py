import math
l = int(raw_input())
for i in xrange(l):
    dist,angle=map(float, raw_input().split())
    print int(round(dist*math.tan((angle-90.0)*math.pi/180.0))),