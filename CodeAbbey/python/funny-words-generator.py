cons="bcdfghjklmnprstvwxz"
vowels="aeiou"
def gen(x0,n):
    a,c,m=445,700001,2097152
    result=[]
    for j in xrange(n):
        x0=(a*x0+c)%m
        result.append(cons[x0%19] if j%2 == 0 else vowels[x0%5])
    return result,x0
l,x=map(int, raw_input().split())
lst=map(int, raw_input().split())
for i in lst:
    word,x=gen(x,i)
    print "".join(word),