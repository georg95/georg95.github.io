s=raw_input()
suffarr=[(s[i:],i) for i in xrange(len(s))]
suffarr.sort(key=lambda x: x[0])
print " ".join(str(x[1]) for x in suffarr)