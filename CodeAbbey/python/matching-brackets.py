brackets = {"(":1,")":0,"<":1,">":0,"{":1,"}":0,"[":1,"]":0}
types    = {"(":0,")":0,"<":1,">":1,"{":2,"}":2,"[":3,"]":3}
l=int(raw_input())
for i in xrange(l):
    bs=[]
    game = filter(lambda x: x in brackets, list(raw_input()))
    balance = True
    for b in game:
        if brackets[b]:
            bs.append(b)
        else:
            if len(bs) == 0 or types[bs.pop()] != types[b]:
                balance = False
                break
    print "1" if balance and len(bs) == 0 else "0",