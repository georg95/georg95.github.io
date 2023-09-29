import sys
l=int(raw_input())
for i in xrange(l):
    inpstr = raw_input().lower()
    for s in " ,.;!?\'\"-":
        inpstr=inpstr.replace(s, "")
    result = "Y" if inpstr == inpstr[::-1] else "N"
    sys.stdout.write(result+" ")