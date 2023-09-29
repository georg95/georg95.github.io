import sys

l = int(raw_input())
for i in range(l):
    a,b=raw_input().split()
    sys.stdout.write(str(int(a)+int(b)))
    sys.stdout.write(" ")