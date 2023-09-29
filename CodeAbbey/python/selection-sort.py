l=int(raw_input())
lst=map(int, raw_input().split())
for i in xrange(1,l):
    index = lst.index(max(lst[:l-i+1]))
    lst[l-i],lst[index]=lst[index],lst[l-i]
    print index,