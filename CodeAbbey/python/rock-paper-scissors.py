rules = {"SS":0,"RR":0,"PP":0,"PR":1,"RP":2,"SP":1,"PS":2,"RS":1,"SR":2}
l=int(raw_input())
for i in xrange(l):
    game = map(lambda x: rules[x], raw_input().split())
    print "2" if game.count(2)>game.count(1) else "1",