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
    letters = raw_input().split()
    wordlen,letters=int(letters[0]),letters[1:]
    counter=0
    for word in endict:
        if len(word) != wordlen: continue
        word=list(word)
        issubset=True
        for lt in word:
            if word.count(lt) > letters.count(lt):
                issubset=False
                break
        if issubset:
            counter+=1
    print counter,