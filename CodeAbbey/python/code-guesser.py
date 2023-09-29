answers = []
l=int(raw_input())
for i in xrange(l):
    answers.append(raw_input().split())
nlen = len(answers[0][0])
for x in xrange(10**nlen):
    passed = True
    for a in answers:
        if len([i for i, j in zip(list(str(x).zfill(nlen)), list(a[0])) if i == j]) != int(a[1]):
            passed = False
            break
    if passed:
        print str(x).zfill(nlen)
        break