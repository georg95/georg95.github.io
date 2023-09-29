import math
l = int(raw_input())
lst = raw_input().split()
for i in lst:
    h,m=map(float,i.split(":"))
    h,m=2.0*math.pi*(h+m/60.0)/12.0,2.0*math.pi*m/60.0
    print 10.0+6.0*math.sin(h), 10.0+6.0*math.cos(h), 10.0+9.0*math.sin(m), 10.0+9.0*math.cos(m),