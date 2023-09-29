dirs={(-1,0):"U",(1,0):"D",(0,-1):"L",(0,1):"R"}
w,h=map(int,raw_input().split())
game=[['0']*(w+2)]
for y in xrange(h): game.append(list("0"+raw_input()+"0"))
game.append(['0']*(w+2))
w,h=w+2,h+2
def findpath(findmap,points,depth):
    newpoints={}
    for i in points:
        for a,b in [(-1,0),(1,0),(0,-1),(0,1)]:
            if findmap[i[0]+a][i[1]+b] == '1':
                findmap[i[0]+a][i[1]+b] = depth
                newpoints[(i[0]+a,i[1]+b)]=True
    return newpoints.keys()
def getpaths(gamemap,pt,starts):
    points,depth,gamemap[pt[0]][pt[1]]=[pt],1,0
    while len(points) > 0:
        points,depth=findpath(gamemap,points,depth),depth+1
    ways=[]
    for spt in starts:
        prevp,depth,way=spt,gamemap[spt[0]][spt[1]],""
        while prevp != pt:
            for a,b in [(-1,0),(1,0),(0,-1),(0,1)]:
                if gamemap[prevp[0]+a][prevp[1]+b] == depth-1:
                    way+=dirs[(a,b)]
                    prevp=(prevp[0]+a,prevp[1]+b)
                    break
            depth-=1
        ways.append(way)
    return ways
paths = getpaths(game,(1,1),[(1,w-2),(h-2,1),(h-2,w-2)])
for p in paths:
    finway,ctr,p="",1,p+"E"
    for i in xrange(1,len(p)):
        if p[i]!=p[i-1]:
            finway+=str(ctr)+p[i-1]
            ctr=0
        ctr+=1
    print finway,