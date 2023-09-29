import sys

l=int(raw_input())
for i in xrange(l):
    values=[int(x) for x in raw_input().split()]
    result = float(sum(values))/float(len(values)-1)
    sys.stdout.write(str(int(round(result)))+" ")