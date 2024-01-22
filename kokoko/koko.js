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

function $(id)
  {
  return document.getElementById(id);
  }

function kokoify()
  {
  $('dest').value = koko($('source').value)
  }
