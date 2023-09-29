import sys

m,n=(int(x) for x in raw_input().split())
lst = [int(x)-1 for x in raw_input().split()]
arr=[0 for i in xrange(n)]
for i in lst: arr[i]+=1
for i in xrange(n):
    sys.stdout.write(str(arr[i])+" ")