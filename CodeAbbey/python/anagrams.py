endict = []
f = open('words.txt', 'r')
p = ""
while True:
    p = f.readline().replace("\n","").replace("\r","")
    if p == "":
        break
    endict.append(p)
l = int(raw_input())
for i in xrange(l):
    cword = raw_input()
    print len([word for word in endict if sorted(word) == sorted(cword) and word != cword]),
