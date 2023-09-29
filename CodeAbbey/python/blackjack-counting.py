points={"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"T":10,"J":10,"Q":10,"K":10,"A":11};
l=int(raw_input())
for i in xrange(l):
    scores=[points[x] for x in raw_input().split()]
    s=0
    for i in scores:
        s += i if i != 11 else 11 if s+i <= 21 else 1
    print s if s <= 21 else "Bust",