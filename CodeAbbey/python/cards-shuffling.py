import itertools
suits = ['C','D','H','S']
ranks = ['A','2','3','4','5','6','7','8','9','T','J','Q','K']
cards=["".join(x) for x in list(itertools.product(suits,ranks))]
values = [int(x) for x in raw_input().split()]
for i in xrange(len(cards)):
    cards[values[i]%52], cards[i] = cards[i], cards[values[i]%52]
print " ".join(cards)