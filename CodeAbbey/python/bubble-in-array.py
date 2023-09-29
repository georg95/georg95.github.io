def chsum(array):
    checksum = 0
    for i in array:
        checksum=((checksum+i)*113)%10000007
    return checksum
values=[float(x) for x in raw_input().split()][:-1]
swaps = 0
for i in xrange(len(values)-1):
    if values[i]>values[i+1]:
        swaps+=1
        values[i],values[i+1]=values[i+1],values[i]
print(str(swaps)+" "+str(int(chsum(values))))