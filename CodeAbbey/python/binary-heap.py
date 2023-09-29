class Heap:
    def __init__(self):
        self.data=[]
    def putnew(self,elem):
        self.data.append(elem)
        i = len(self.data)-1
        parent = (i-1)/2
        while i>0 and self.data[parent] > self.data[i]:
            self.data[parent],self.data[i]=self.data[i],self.data[parent]
            i,parent=parent,(parent-1)/2
    def printheap(self):
        for i in self.data:
            print i,
    def heapify(self,i):
        while True:
            lC,rC,minC=2*i+1,2*i+2,i
            if lC < len(self.data) and self.data[lC] < self.data[minC]: minC=lC
            if rC < len(self.data) and self.data[rC] < self.data[minC]: minC=rC
            if minC == i: break
            self.data[i],self.data[minC]=self.data[minC],self.data[i]
            i=minC
    def applyElem(self, elem):
        if elem == 0:
            self.data[0]=self.data.pop()
            self.heapify(0)
        else:
            self.putnew(elem)
    
a=Heap()
l=int(raw_input())
lst=map(int, raw_input().split())
map(a.applyElem, lst)
a.printheap()