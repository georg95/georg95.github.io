deskabc={"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8};
l=int(raw_input())
for i in xrange(l):
    q,k=[list(x) for x in raw_input().split()]
    q[0],k[0]=deskabc[q[0]],deskabc[k[0]]
    q[1],k[1]=int(q[1]),int(k[1])
    print "Y" if q[0] == k[0] or q[1] == k[1] or abs(q[1]-k[1]) == abs(q[0]-k[0]) else "N",