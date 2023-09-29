import sys
def letters(s):
    summ=0
    vowels=tuple("aouiey")
    for char in tuple(s):
        if char in vowels:
            summ+=1
    return summ

l=int(raw_input())
for i in xrange(l):
    s=raw_input()
    sys.stdout.write(str(letters(s))+" ")