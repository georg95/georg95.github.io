import sys
import math
lst = raw_input().split()
l=int(lst[0])
lst=lst[1:]
for i in lst:
    f=float(i)
    sys.stdout.write(str(int(round((f-32)*100/(212-32))))+" ")