alphabet=list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
def fact(n): return 1 if n == 0 else n*fact(n-1)
def num2permutation(k,n,abc):
    if n == 0: return ""
    letter=abc[k/fact(n-1)]
    return letter+num2permutation(k%fact(n-1),n-1,filter(lambda x: x != letter,abc))
l=int(raw_input())
tests=[]
for i in xrange(l): tests.append(int(raw_input()))
n = 1
while fact(n) < max(tests): n+=1
for i in tests:
    print num2permutation(i,n,alphabet),