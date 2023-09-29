import sys
def fibnum(a):
    num = 0
    n1=n2=1
    while n1 <= a:
        num+=1
        (n1,n2)=(n2,n1+n2)
    return num
l=int(raw_input())
for i in xrange(l):
    sys.stdout.write(str(fibnum(int(raw_input())))+" ")