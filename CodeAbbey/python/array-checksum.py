import sys

l=int(raw_input())
values=[int(x) for x in raw_input().split()]
checksum = 0
for i in values:
    checksum=((checksum+i)*113)%10000007
print(checksum)