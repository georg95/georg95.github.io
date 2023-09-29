import sys
l=int(raw_input())
def gcd(a,b):
    return b if a%b == 0 else gcd(b, a%b)
print (gcd(30, 25))
for i in xrange(l):
    a,b=[int(x) for x in raw_input().split()]
    ab_gcd=gcd(a,b)
    sys.stdout.write("("+str(ab_gcd)+" "+str(a*b/ab_gcd)+") ")