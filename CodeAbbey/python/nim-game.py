import httplib

tok = "token: WOZSYymO3X0QCAHfGmhTQTc3\n"
answer = 0
conn = httplib.HTTPConnection("codeabbey.sourceforge.net")
conn.request("POST", "/nim-game.php", tok)
response = conn.getresponse()
heaps = [int(x) for x in response.read().split()[1:]]

def nim(heaps):
    return reduce(lambda x,y: x^y, heaps)

while True:
    move = [0,1]
    for x in xrange(3):
        for y in xrange(1,heaps[x]+1):
            heaps[x]-=y
            if nim(heaps) == 0:
                move = [str(x), str(y)]
            heaps[x]+=y
    data = tok+"move: "+" ".join(move)+"\n"
    print data
    conn.request("POST", "/nim-game.php", data)
    response = conn.getresponse()
    #print str(response.status) + " " + response.reason
    resp = response.read().split("\n")
    print resp
    heaps=[int(x) for x in resp[1].split()[1:]]
    if resp[2].find("end:") == 0:
        answer=resp[2].split()[1].replace("\r","")
        break
print "#: ",answer