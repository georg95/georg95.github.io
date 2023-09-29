l=int(raw_input())
def gcd(a,b):
    return b if a%b == 0 else gcd(b, a%b)
for i in xrange(l):
    x,y,n=map(float, raw_input().split())
    n1 = int(round(n*x/(x+y)))
    n2 = n-n1
    print int(min(max(y*n1, x*n2), max(y*(n1-1), x*(n2+1)), max(y*(n1+1), x*(n2-1)))),