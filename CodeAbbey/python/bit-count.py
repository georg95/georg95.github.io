import sys
l=int(raw_input())
lst = [int(x) for x in raw_input().split()]
for i in lst:
    bits = len("{0:b}".format(i).replace("0",""))
    if i < 0:    
        bits = 32-len("{0:b}".format(-i-1).replace("0",""))
    if i == 0:
        bits = 32
    sys.stdout.write(str(bits)+" ")