import sys

lst = raw_input().split()
mx=mn=int(lst[0])
for i in lst:
    mn=int(i) if int(i) < mn else mn
    mx=int(i) if int(i) > mx else mx
sys.stdout.write(str(mx)+' '+str(mn))