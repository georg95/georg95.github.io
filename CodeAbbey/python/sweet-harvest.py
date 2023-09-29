l=int(raw_input())
def getmax(maxv, isles, n):
    while n >= 0:
        np2 = maxv[n+3] if n+3 < len(isles) else 0
        np1 = maxv[n+2] if n+2 < len(isles) else 0
        maxv[n]=max(np2,np1)+isles[n]
        n-=1
    return maxv[0]
for i in xrange(l):
    isles=map(int, raw_input().split())
    maxv=[0]*len(isles)
    maxv[len(isles)-1]=isles[len(isles)-1]
    print getmax(maxv, isles, len(isles)-1),