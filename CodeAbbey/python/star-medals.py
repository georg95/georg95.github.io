l=int(raw_input())
for i in xrange(l):
    pt,interval = map(int, raw_input().split())
    print pt*(interval-1),