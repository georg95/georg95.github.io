import sys
l=int(raw_input())
values=[float(x) for x in raw_input().split()]
sys.stdout.write(str(values[0])+" ")
for i in xrange(1,l-1):
    result = (values[i-1]+values[i]+values[i+1])/3.0;
    sys.stdout.write(str(result)+" ")
sys.stdout.write(str(values[l-1]))