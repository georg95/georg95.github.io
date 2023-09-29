l=int(raw_input())
for i in xrange(l):
    field=[' ']*9
    ind=0
    for i,x in enumerate([int(x)-1 for x in raw_input().split()]):
        field[x]='X' if i%2==0 else 'O'
        sets = ["".join(field[:3]), "".join(field[3:6]), "".join(field[6:])] #rows
        a=zip(field[:3],field[3:6],field[6:])
        sets += ["".join(a[0]), "".join(a[1]), "".join(a[2])] #cols
        sets += ["".join([field[0],field[4],field[8]]), "".join([field[2],field[4],field[6]])] #diags
        if "XXX" in sets or "OOO" in sets:
            ind = i+1
            break
    print ind,