def findpt(points, alpha):
    newpts=[]
    for i in xrange(len(points)-1):
        dx=points[i+1]['x']-points[i]['x']
        dy=points[i+1]['y']-points[i]['y']
        newx=points[i]['x']+dx*alpha
        newy=points[i]['y']+dy*alpha
        newpts.append({'x':newx,'y':newy})
    if len(newpts) == 1: return newpts[0]
    return findpt(newpts, alpha)
l,dalph = map(int, raw_input().split())
pts=[]
for i in xrange(l):
    a,b = map(int, raw_input().split())
    pts.append({'x':a,'y':b})
for i in xrange(dalph):
    pt = findpt(pts, float(i)/(dalph-1))
    print int(round(pt['x'])),int(round(pt['y'])),