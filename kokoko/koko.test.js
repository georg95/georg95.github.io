
var assert = require('assert')
function koko(text)
  {
  var toSameCase = (ch, out) =>
    ch.toUpperCase() == ch ?
      out.toUpperCase() :
      out.toLowerCase();
  var wordToKoko = (word) => (new Array((word.length+2)/2|0)
          .join('ко')+
          (word.length%2 == 1 ? 'к' : ''))
          .split('')
          .map((kokoChar, i) => toSameCase(word[i], kokoChar))
          .join('')
  return text.replace(/[a-zA-Zа-яА-ЯёЁ]+/g, wordToKoko)
  }

describe('test koko-fication function',() =>
  {
  it('change only word to kokoko', () =>
    assert.equal(koko('вован'), 'кокок'))
  it('change text with spaces to kokoko', () =>
    assert.equal(koko('вован гребень'), 'кокок кококок'))
  it('save uppercase letters', () =>
    assert.equal(koko('Её'), 'Ко'))
  })
