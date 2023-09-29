alphabet=list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
def getkey(k):
    key = {}
    for i in xrange(len(alphabet)):
        key[alphabet[(i+k)%len(alphabet)]]=alphabet[i]
    return key
def cezar(s, key):
    return "".join([key[x] if x in key else x for x in list(s)])
    
l,k=[int(x) for x in raw_input().split()]
key = getkey(k)
for i in xrange(l):
    s = cezar(raw_input(), key)
    print s,
