suits = ['Clubs', 'Spades', 'Diamonds', 'Hearts']
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
l=int(raw_input())
lst = [int(x) for x in raw_input().split()]
def printone(x):
    print ranks[x%13]+"-of-"+suits[x//13],
map(printone, lst)