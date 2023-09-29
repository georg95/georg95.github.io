a,c,m,n,x0=[445, 700001, 2097152]+[int(x) for x in raw_input().split()]
graph=[]
for i in xrange(n): graph.append(dict())
verts=[]
for i in xrange(n*4):
    x0=(a*x0+c)%m
    verts.append(x0%n)
verts=zip(verts[0::4],verts[1::4],verts[2::4],verts[3::4])
for i,v in enumerate(verts):
    if v[0] not in graph[i] and v[0] != i:
        graph[i][v[0]]=v[1]+1
        graph[v[0]][i]=v[1]+1
    if v[2] not in graph[i] and v[2] != i:
        graph[i][v[2]]=v[3]+1
        graph[v[2]][i]=v[3]+1
for i in xrange(n):
    print sum(graph[i][x] for x in graph[i]),