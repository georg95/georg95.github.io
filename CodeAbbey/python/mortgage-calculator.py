import math
def mortgage(debt, perc, months, permonth):
    for i in xrange(months):
        #print i+1,"# ",debt, float(debt)*perc/100/12
        debt+=float(debt)*perc/100/12
        debt-=permonth
    return debt
debt,perc,months=[float(x) for x in raw_input().split()]
months=int(months)
start,fin=0.0,debt
while int(start) != int(fin):
    x=(start+fin)/2.0
    if (mortgage(debt, perc, months, x) > 0):
        start=x
    else:
        fin=x
print int(math.ceil(start)),