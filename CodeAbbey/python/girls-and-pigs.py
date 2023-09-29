l=int(raw_input())
for i in xrange(l):
    legs,breasts=map(int,raw_input().split())
    solutions=0
    for girls in xrange(1,breasts/2+1):
        b2=breasts-girls*2
        l2=legs-girls*2
        if l2%4 != 0 or l2 < 0:
            continue
        pigs = l2/4
        if pigs == 0:
            solutions+=1 if b2 == 0 else 0
            #if b2 == 0:
                #print "# ",girls,0
            continue
        if b2%pigs == 0 and (b2/pigs)%2 == 0:
            solutions+=1
            #print "# ",girls,pigs
    print solutions,