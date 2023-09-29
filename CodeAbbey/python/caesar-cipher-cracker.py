import re
endict = {}
f = open('words.txt', 'r')
p = ""
while True:
    p = f.readline().replace("\n","").replace("\r","")
    if p == "":
        break
    endict[p.upper()]=True
alphabet = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
def getkey(k):
    key = {}
    for i in xrange(len(alphabet)):
        key[alphabet[(i+k)%len(alphabet)]]=alphabet[i]
    return key
def cezar(s, key):
    return "".join([key[x] if x in key else x for x in list(s)])
l = int(raw_input())
for i in xrange(l):
    phrase = raw_input()
    betterdecrypt=phrase,0,0
    for k in xrange(len(alphabet)):
        key = getkey(k)
        decr = cezar(phrase,key)
        words = re.findall(r"[\w']+", decr)
        matches = [x for x in words if x in endict]
        if len(matches) > betterdecrypt[1]:
            betterdecrypt=" ".join(words[:3]),len(matches),k
    print betterdecrypt[0],betterdecrypt[2],