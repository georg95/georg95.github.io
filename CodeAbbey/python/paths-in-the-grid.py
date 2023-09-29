a,b=map(int, raw_input().split())
dunge=[]
for i in xrange(a): dunge.append(list(raw_input().split()))
dunge[a-1][b-1]=1
for y in reversed(xrange(a)):
    for x in reversed(xrange(b)):
        if dunge[y][x] == "X" or x+y == a+b-2: continue
        down  = (dunge[y+1][x] if y+1<a and dunge[y+1][x] != 'X' else 0)
        right = (dunge[y][x+1] if x+1<b and dunge[y][x+1] != 'X' else 0)
        dunge[y][x] = down+right
print dunge[0][0]