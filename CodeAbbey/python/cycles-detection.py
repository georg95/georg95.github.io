l=int(raw_input())
def findway(roads, visited, city, prevcity):
    #print "findway from",city,"visited:",visited
    for x in roads[city]:
        if x in visited:
            if x != prevcity:
                return True
            else:
                continue
        visited.append(x)
        #print x,"visited"
        if findway(roads, visited, x, city): return True
    return False

for i in xrange(l):
    r = map(lambda x: (x[0],x[2]), raw_input().split()[1:])
    r = r+[(y,x) for (x,y) in r]
    roads=dict()
    for way in r:
        if way[0] in roads:
            roads[way[0]].append(way[1])
        else:
            roads[way[0]]=[way[1]]
    #print roads
    visited=[roads.keys()[0]]
    if findway(roads, visited, roads.keys()[0], ""):
        print "1",
    else: print "0",