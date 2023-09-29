l=int(raw_input())
lst=map(int, raw_input().split())
for i in xrange(1,l):
    elem = lst[i]
    firstpart=sorted(lst[:i+1])
    shifted = i-firstpart.index(elem)
    lst = firstpart+lst[i+1:]
    print shifted,