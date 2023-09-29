import math
l=int(raw_input())
points=[]
for i in xrange(l):
    points.append(map(float, raw_input().split()))
cp=sum(c[0] for c in points)/len(points),sum(c[1] for c in points)/len(points)
pp=points[0]
s=0
for i in points[1:]+[points[0]]:
    a,b,c=map(lambda (a1,a2): math.sqrt((a1[0]-a2[0])**2+(a1[1]-a2[1])**2), [[pp,cp],[cp,i],[i,pp]])
    p=(a+b+c)/2
    pp=i
    s+=math.sqrt(p*(p-a)*(p-b)*(p-c))
print s