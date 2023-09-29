secret,l=raw_input().split()
nums=raw_input().split()
for i in nums:
    eq=0
    for p in xrange(10):
        eq+=min(list(i).count(str(p)),list(secret).count(str(p)))
    t = len([i for i, j in zip(list(i), list(secret)) if i == j])
    print str(t)+"-"+str(eq-t),