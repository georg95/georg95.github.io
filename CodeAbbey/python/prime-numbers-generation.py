l = int(raw_input())
getprimes = [int(x)-1 for x in raw_input().split()]
primes=[2]
i = 3
while len(primes) < 200000:
    primeflag = True
    for t in primes:
        if t**2 > i:
            break
        if i%t == 0:
            primeflag = False
            break
    if primeflag:
        primes.append(i)
    i+=2
for i in getprimes:
    print primes[i],