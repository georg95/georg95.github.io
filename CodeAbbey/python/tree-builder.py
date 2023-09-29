import sys
class Tree(object):
    def __init__(self,d):
        self.left,self.right,self.data = None,None,d
def printtree(tree):
    sys.stdout.write('(')
    if tree.left: printtree(tree.left)
    else: sys.stdout.write('-')
    sys.stdout.write(','+str(tree.data)+',')
    if tree.right: printtree(tree.right)
    else: sys.stdout.write('-')
    sys.stdout.write(')')
def putintree(tree, v):
    if v > tree.data:
        if tree.right: putintree(tree.right,v)
        else: tree.right=Tree(v)
    else:
        if tree.left: putintree(tree.left,v)
        else: tree.left=Tree(v)
l=int(raw_input())
lst=[int(x) for x in raw_input().split()]
a=Tree(lst[0])
for e in lst[1:]:
    putintree(a,e)
printtree(a)