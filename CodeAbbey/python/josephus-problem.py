n,k=[int(x) for x in raw_input().split()]
people=range(1,n+1)
while len(people) != 1:
    people = people[(k-1)%len(people)+1:]+people[:(k-1)%len(people)]
print(people[0])