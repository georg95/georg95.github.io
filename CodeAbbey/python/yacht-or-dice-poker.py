l = int(raw_input())
for i in xrange(l):
    values=sorted(list(map(int, raw_input().split())))
    lens=sorted([values.count(x) for x in set(values)])
    if len(set(values)) == 1:
        print "yacht",
        continue
    if values == [1,2,3,4,5]:
        print "small-straight",
        continue
    if values == [2,3,4,5,6]:
        print "big-straight",
        continue
    if lens == [2,3]:
        print "full-house",
        continue
    if lens == [1,2,2]:
        print "two-pairs",
        continue
    if lens == [1,4]:
        print "four",
        continue
    if lens == [1,1,3]:
        print "three",
        continue
    if lens == [1,1,1,2]:
        print "pair",
        continue