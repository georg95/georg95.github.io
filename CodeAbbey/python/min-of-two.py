import sys

l = int(raw_input())
for i in range(l):
    a,b=raw_input().split()
    a,b=int(a),int(b)
    sys.stdout.write(str(a if a < b else b))
    sys.stdout.write(" ")