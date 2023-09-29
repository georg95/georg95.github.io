import math
l=int(raw_input())
for i in xrange(l):
    mes=raw_input()
    print sum(float(mes.count(x))/len(mes)*(-math.log(float(mes.count(x))/len(mes),2)) for x in set(mes)),