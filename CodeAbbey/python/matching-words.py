from collections import Counter
words=" ".join(sorted(list(set(x for x,v in Counter(raw_input().split()[:-1]).iteritems() if v > 1))))
print words