l=int(raw_input())
lst=map(int, raw_input().split())
for i in lst:
    x1,x2,ind=1,0,0
    while x1%i != 0:
        x1,x2=(x1+x2)%i,x1
        ind+=1
    print ind+1,