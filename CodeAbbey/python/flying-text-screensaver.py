w,h,l=map(int,raw_input().split())
w-=(l-1)
x,y,vx,vy=0,0,1,1
for i in xrange(101):
    print x,y,
    if y+vy < 0 or y+vy >= h:
        vy=-vy
    if x+vx < 0 or x+vx >= w:
        vx=-vx
    x,y=x+vx,y+vy