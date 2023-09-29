import itertools
import math
def getstats(i, dices):
    res={}
    elems = float(i**dices)
    for c in itertools.product(range(1,i+1), repeat=dices):
        sc=sum(c)
        if sc in res:
            res[sc]+=1
        else:
            res[sc]=1
    for i in res:
        res[i]=float(res[i])/elems
    return res
allstats={}
for i in xrange(2,14,2):
    for dices in xrange(1,6):
        allstats[str(dices)+"d"+str(i)]=getstats(i,dices)
def geteq(stat1,stat2):
    eqcoef=0.0
    for i in set(stat1.keys()+stat2.keys()):
        if i in stat2 and i not in stat1:
            eqcoef+=10000 # impossible variant
            continue
        if i in stat1 and i not in stat2:
            eqcoef+=stat1[i]**2
            continue
        eqcoef += abs(stat1[i]-stat2[i])**2
    return math.sqrt(eqcoef)
for i in xrange(3):
    points = sorted([int(x) for x in raw_input().split()[:-1]])
    stats = dict((x,float(points.count(x))/len(points)) for x in set(points))
    equalitylist=[]
    for i in allstats:
        equalitylist.append((i, geteq(allstats[i],stats)))
    equalitylist.sort(key=lambda x: x[1])
    print equalitylist[0][0],
