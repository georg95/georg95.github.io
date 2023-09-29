answer=int(raw_input())
operations=[]
M=0
while True:
    op,v=raw_input().split()
    if op == '%':
        M=int(v)
        break
    operations.append((op,v))
for op,v in operations:
    if op == '+': answer+=int(v)
    if op == '*': answer*=int(v)
    answer%=M
print(answer)