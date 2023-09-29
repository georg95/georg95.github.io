l=int(raw_input())
array=[int(x) for x in raw_input().split()]
changed = True
swaps = 0
runs = 0
while changed:
    changed = False
    runs+=1
    for i in xrange(l-1):
        if array[i]>array[i+1]:
            array[i],array[i+1]=array[i+1],array[i]
            swaps+=1
            changed=True
print(str(runs)+" "+str(swaps))