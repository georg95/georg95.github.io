import math
lst,result=raw_input().split(),[]
for i in lst:
    if  "__"+i+"__" in dir(1):
        a,b=result.pop(),result.pop()
        result.append(int(getattr(b,"__"+i+"__")(a)))
    if i == "sqrt": result.append(int(math.sqrt(result.pop())))
    if i.isdigit(): result.append(int(i))
print result[0]