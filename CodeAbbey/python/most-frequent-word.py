cons="bcdfghjklmnprstvwxz"
vowels="aeiou"
def gen(x0,n):
    a,c,m=445,700001,2097152
    result=[]
    for j in xrange(n):
        x0=(a*x0+c)%m
        result.append(cons[x0%19] if j%2 == 0 else vowels[x0%5])
    return "".join(result),x0
l,x=900000, int(raw_input())
allwords={}
curmax="",0
for i in xrange(l):
    word,x=gen(x,6)
    if word in allwords:
        allwords[word]+=1
        if allwords[word]>curmax[1]:
            curmax=(word,allwords[word])
    else:
        allwords[word]=1
print curmax[0],