import sys

l = int(raw_input())
lst = raw_input().split()
sum = 0
for i in lst:
    sum+=int(i)
print(sum)