import sys
def arrkey(a):
    return a[0]
l=int(raw_input())
lst=raw_input().split();
array=[0]*l
for i in xrange(l):
    array[i]=(int(lst[i]),i+1) 
array.sort(key=arrkey)
for i in xrange(l):
    sys.stdout.write(str(array[i][1])+" ")