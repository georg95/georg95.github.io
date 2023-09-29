import sys
import math
l = int(raw_input())
for i in xrange(l):
    a,b=raw_input().split()
    a,b=float(a),float(b)    
    sys.stdout.write(str(int(round(a/b)))+" ")