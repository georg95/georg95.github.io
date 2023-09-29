import sys
l=int(raw_input())
lst = [int(x) for x in raw_input().split()]
for i in xrange(l):
    used=[False]*10000
    cur = lst[i]
    iters = 0
    while not used[cur]:
        iters+=1
        used[cur]=True
        cur = (cur*cur/100)%10000;
    sys.stdout.write(str(iters)+" ")