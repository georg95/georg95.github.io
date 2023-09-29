import math
for i in xrange(3):
    slope=map(int, raw_input().split())
    cpts=[]
    for num,p in enumerate(slope[1:]):
        if p != slope[num]: cpts.append(((num+1)*4,p*4))
    for j in xrange(3):
        v,angle=map(float, raw_input().split())
        vx,vy=v*math.cos(angle*math.pi/180.0),v*math.sin(angle*math.pi/180.0)
        for n,pt in enumerate(cpts):
            t=float(pt[0])/vx
            y=vy*t-9.81*t**2/2.0
            if y > pt[1]: continue
            if y >= cpts[n-1][1]:
                print int(math.floor(pt[0])),
            else:
                height = cpts[n-1][1]
                D=math.sqrt(vy*vy-2*9.81*height)
                t=(D+vy)/9.81
                print int(math.floor(vx*t)),
            break