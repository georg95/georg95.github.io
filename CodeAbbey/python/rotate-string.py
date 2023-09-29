import sys
l=int(raw_input())
for i in xrange(l):
    k,cur_s = raw_input().split()
    k=int(k)
    sys.stdout.write(cur_s[k:]+cur_s[:k]+" ")