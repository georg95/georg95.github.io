import sys
l=int(raw_input())
for i in xrange(l):    
    abc = [int(x) for x in raw_input().split()]
    abc.sort()
    answer="R"
    if abc[0]**2+abc[1]**2 == abc[2]**2:
        answer="R"
    if abc[0]**2+abc[1]**2 < abc[2]**2:
        answer="O"
    if abc[0]**2+abc[1]**2 > abc[2]**2:
        answer="A"
    sys.stdout.write(answer+" ")