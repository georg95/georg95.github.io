import sys
l=int(raw_input())
for i in xrange(l):
    alldata=[int(x) for x in raw_input().split()]
    t1,t2=alldata[:4],alldata[4:]
    t1 = t1[0]*24*3600+t1[1]*3600+t1[2]*60+t1[3]
    t2 = t2[0]*24*3600+t2[1]*3600+t2[2]*60+t2[3]
    delta=t2-t1
    secs,delta  = str(delta%60),int(delta/60)
    mins,delta  = str(delta%60),int(delta/60)
    hours,delta = str(delta%24),int(delta/24)
    days = str(delta)
    sys.stdout.write("("+days+" "+hours+" "+mins+" "+secs+") ")