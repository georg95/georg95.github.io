a,b=map(int, raw_input().split())
lst=[]
for i in xrange(b-a+1): lst.append([float(x) for x in raw_input().split()[1:]])
Sx,Sy,Sxy=sum(x for x,y in lst),sum(y for x,y in lst),sum(x*y for x,y in lst)
Sxx,Syy=sum(x**2 for x,y in lst),sum(y**2 for x,y in lst)
betta=(len(lst)*Sxy-Sx*Sy)/(len(lst)*Sxx-Sx**2)
print betta,Sy/len(lst)-betta*Sx/len(lst)