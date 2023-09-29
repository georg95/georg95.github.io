import sys
brmem=[0]
mempt=0
code = list(raw_input())
inpdata=[int(x) for x in raw_input().split()]
inpdata.reverse();
corrbr={}
brstack=[]
for i,ch in enumerate(code):
    if ch == '[':
        brstack.append(i)
    if ch == ']':
        num = brstack.pop()
        corrbr[num]=i
        corrbr[i]=num
ptr=0
while True:
    if ptr >= len(code):
        break
    instr=code[ptr]
    if instr == '.': sys.stdout.write(chr(brmem[mempt]))
    if instr == ':': print str(brmem[mempt]),
    if instr == ';': brmem[mempt]=inpdata.pop()
    if instr == '+': brmem[mempt]+=1
    if instr == '-': brmem[mempt]-=1
    if instr == '>':
        mempt+=1
        if mempt >= len(brmem): brmem.append(0)
    if instr == '<': mempt-=1
    if instr == '[':
        if brmem[mempt] == 0:
            ptr=corrbr[ptr]
    if instr == ']': ptr=corrbr[ptr]-1
    ptr+=1