import math
primes=[2]
i = 3
while len(primes) < 220000:
    primeflag = True
    sqrti = math.sqrt(i)
    for t in primes:
        if t > sqrti:
            break
        if i%t == 0:
            primeflag = False
            break
    if primeflag:
        primes.append(i)
    i+=2

l = int(raw_input())
for i in xrange(l):
    a,b=map(int, raw_input().split())
    print primes.index(b)-primes.index(a)+1,