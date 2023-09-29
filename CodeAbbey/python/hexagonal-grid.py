import math
dirs={'A': 0.0, 'B': 60.0, 'C': 120.0, 'D': 180.0, 'E': 240.0, 'F': 300.0}
l=int(raw_input())
for i in xrange(l):
    steps = [(math.cos(dirs[x]*math.pi/180),math.sin(dirs[x]*math.pi/180)) for x in list(raw_input())]
    x,y=sum(x[0] for x in steps),sum(y[1] for y in steps) 
    print round(math.sqrt(x**2+y**2),8),