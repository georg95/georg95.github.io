l=int(raw_input())
for i in xrange(l):
    lst = [int(x) for x in raw_input().split()]
    initlst=list(lst)
    iters=0
    sortedlist = sorted(lst)
    cur = 918255
    while sortedlist != lst:
        for j in xrange(len(lst)):
            y = cur/1000+(cur%1000)*1000
            cur=(cur*y/1000)%1000000
            lst[j],lst[cur%len(lst)]=lst[cur%len(lst)],lst[j]
        if lst == initlst:
            iters = -1
            break
        iters+=1
    print iters,