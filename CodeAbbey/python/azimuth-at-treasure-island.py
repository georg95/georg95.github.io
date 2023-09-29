import math
useless = raw_input()
x,y=0.0,0.0
while True:
    inp = raw_input()
    if inp == "Dig here!":
        break
    ft,angle=[int(a) for a in inp.split() if a.isdigit()]
    x,y=x+ft*math.cos((450-angle)*math.pi/180),y+ft*math.sin((450-angle)*math.pi/180)
    print ft,angle
print int(round(x)),int(round(y))