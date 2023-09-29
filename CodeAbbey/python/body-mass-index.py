import sys

l=int(raw_input())
for i in xrange(l):
    a,b=raw_input().split()
    a,b=float(a),float(b)
    bmi = a/(b**2)
    if bmi < 18.5:
        sys.stdout.write("under ")
        continue
    if bmi < 25.0:
        sys.stdout.write("normal ")
        continue
    if bmi < 30.0:
        sys.stdout.write("over ")
        continue
    sys.stdout.write("obese ")