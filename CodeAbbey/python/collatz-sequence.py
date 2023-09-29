import sys
l=int(raw_input())
lst=[int(x) for x in raw_input().split()]
for i in lst:    
    p=0
    while i != 1:
        p+=1
        i = i/2 if i%2 == 0 else i*3+1
    sys.stdout.write(str(p)+" ")