def numcheck(n):
    sr = map(lambda (i,x): x if i%2==1 else x*2 if x*2 < 10 else x*2-9, enumerate(n))
    return sum(sr)%10==0
l=int(raw_input())
for i in xrange(l):
    n = raw_input()
    if '?' in n:
        for t in xrange(10):
            if numcheck([int(x) for x in list(n.replace('?',str(t)))]):
                print n.replace('?',str(t)),
                break
    else:
        lst = [int(x) for x in list(n)]
        for t in xrange(len(n)-1):
            a=list(lst)
            a[t],a[t+1]=a[t+1],a[t]
            if numcheck(a):
                print "".join([str(x) for x in a]),
                break