l=int(raw_input())
def worddist(w1, w2):
    if len(w1) > len(w2): w1,w2=w2,w1
    n, m = len(w1), len(w2)
    curr_row = range(n+1)
    for i in range(1, m+1):
        prev_row, curr_row = curr_row, [i]+[0]*n
        for j in range(1,n+1):
            add, delete, change = prev_row[j]+1, curr_row[j-1]+1, prev_row[j-1]
            if w1[j-1] != w2[i-1]:
                change += 1
            curr_row[j] = min(add, delete, change)
    return curr_row[n]

for i in xrange(l):
    w1,w2=raw_input().split()
    print worddist(w1,w2),