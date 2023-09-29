def partition(array, left, right):
    lt = left
    rt = right
    di = 'left'
    pivot = array[left]
    while lt < rt:
        if di == 'left':
            if array[rt] > pivot:
                rt = rt - 1
            else:
                a[lt] = a[rt]
                lt = lt + 1
                di = 'right'
        else:
            if array[lt] < pivot:
                lt = lt + 1
            else:
                a[rt] = a[lt]
                rt = rt - 1
                di = 'left'
    array[lt] = pivot
    return lt
def quicksort(array, left, right):
    print str(left)+"-"+str(right),
    pivot_pos = partition(array, left, right)
    if pivot_pos - left > 1:
        quicksort(array, left, pivot_pos - 1)
    if right - pivot_pos > 1:
        quicksort(array, pivot_pos + 1, right)
l = int(raw_input())
a = [int(x) for x in raw_input().split()]
quicksort(a,0,len(a)-1)