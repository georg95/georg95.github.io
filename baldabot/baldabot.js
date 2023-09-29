"use strict"
var field;
var fieldsize;
var dicready = false;
var alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";
var ccount = 0;
var selectedWord;
var usedWords=[];

// =================== loading dictionary (rdict variable) ===================
var script = document.createElement("script");
script.type = "text/javascript";
script.src = "deps/russdict.js";
script.onload = function(){
    newGame("слово");
};
document.body.appendChild(script);
// ========================================================================

// =================== main and most difficult function ===================
// returns {left:123,right:345,found:true}
function binsearch(left, right, pos, letter)
    {

    var bounds = {left:undefined,right:undefined,found:true};
    //console.dir(arguments);
    var i = 0;
    var first = left;
    var last = right;
    while(first < last && i < 100)
        {
        ccount++;
        i++;
        var mid = Math.floor((last+first)/2);

        if (pos < rdict[mid].length && letter.charCodeAt(0) <= rdict[mid].charCodeAt(pos))
            {
            last = mid;
            //console.log("right = "+mid);
            }
        else
            {
            first = mid+1;
            //console.log("left = "+mid+" + 1");
            }
        //console.log("l = "+left+"; r = "+right);
        }
    if(i === 100) { console.warn("infinite loop in bsearch"); }
    i = 0;
    bounds.left = first;
    first = left;
    last = right;
    while(first < last && i < 100)
        {
        i++;
        var mid = Math.floor((last+first)/2);

        if (pos < rdict[mid].length && letter.charCodeAt(0) < rdict[mid].charCodeAt(pos))
            {
            last = mid;
            //console.log("right = "+mid);
            }
        else
            {
            first = mid+1;
            //console.log("left = "+mid+" + 1");
            }
        //console.log("l = "+left+"; r = "+right);
        }
    if(i === 100) { console.warn("infinite loop in bsearch"); }
    bounds.right = first;
    if(bounds.left === bounds.right) { bounds.found=false; }
    //console.dir(bounds);
    return bounds;
    }
// ========================================================================

function promptLetter(e)
    {
    //console.log("clicked "+this.x+", "+this.y);
    var letter = prompt("input letter", 'б');
    if (!letter) { return; }
    if(letter.length === 1 && alphabet.indexOf(letter) > -1)
        { setLetter(this.x, this.y, letter); }
    else { setLetter(this.x, this.y, undefined); }
    viewField();
    clearHighlight();
    findAllWords();
    }
// =================== field operations ===================
function createField(size)
    {
    fieldsize = size;
    field = [];
    var gfield = document.getElementById("gamefield");
    var table = document.createElement("table");
    table.id = "gametable";
    table.border = 6;
    for(var y = 0; y < size; y++)
        {
        field[y] = [];
        var trow = document.createElement("tr");
        for(var x = 0; x < size; x++)
            {
            field[y][x]={char:undefined,used:false};
            var tcell = document.createElement("td");
            tcell.addEventListener("click", promptLetter.bind({"x":x,"y":y}));
            trow.appendChild(tcell);
            }
        table.appendChild(trow);
        }
    gfield.appendChild(table);
    }
function freeField()
    {
    for(var y = 0; y < fieldsize; y++)
    for(var x = 0; x < fieldsize; x++)
        {
        field[y][x].used=false;
        }
    }
function viewField()
    {
    var gametable = document.getElementById("gametable");
    for(var y = 0; y < fieldsize; y++)
    for(var x = 0; x < fieldsize; x++)
        {
        if (field[x][y].char)
            gametable.childNodes[y].childNodes[x].innerHTML="<p>"+field[x][y].char+"</p>";
        else
            gametable.childNodes[y].childNodes[x].innerHTML="";
        }
    }
function setLetter(x,y,letter)
    {
    if (x < 0 || y < 0 || x >= fieldsize || y >= fieldsize)
        {
        console.warn("setLetter: bad index");
        return;
        }
    field[x][y].char = letter;
    }
function resetLetter(x,y)
    {
    if (x < 0 || y < 0 || x >= fieldsize || y >= fieldsize)
        {
        console.warn("setLetter: bad index");
        return;
        }
    field[x][y].char = undefined;
    }

function isAvailableToUse(x,y)
    {
    if (x < 0 || y < 0 || x >= fieldsize || y >= fieldsize)
        {
        return false;
        }
    return !field[x][y].used;
    }
function setUsed(x,y,isused)
    {
    if (x < 0 || y < 0 || x >= fieldsize || y >= fieldsize)
        {
        return;
        }
    return field[x][y].used = isused;
    }
function getLetter(x,y)
    {
    if (x < 0 || y < 0 || x >= fieldsize || y >= fieldsize)
        {
        console.warn("getLetter: bad index");
        return;
        }
    return field[x][y].char;
    }
// ========================================================================
// =================== find word starting at (x,y) cell ===================
function findNext(bounds,pos,x,y,pasted,stack,verticles)
    {
    var letter = getLetter(x,y);
    if(letter === undefined)
        {
        if(pasted.state) { return; }
        for(var i in alphabet)
            {
            setLetter(x,y,alphabet[i]);
            setUsed(x,y,true);
            findNext(bounds, pos, x, y, {state:true,char:alphabet[i]}, stack, verticles);
            setUsed(x,y,false);
            resetLetter(x,y);
            }
        }
    else
        {
        verticles.push({"x":x,"y":y});
        var newbounds = binsearch(bounds.left, bounds.right,pos,letter);
        if(!newbounds.found) { verticles.pop(); return; }
        //console.log("pos: "+pos+"; bounds: "+rdict[newbounds.left]+", "+rdict[newbounds.right-1]);
        if(rdict[newbounds.left].length === pos+1 && pasted.state && !usedWords[rdict[newbounds.left]])
            {
            //console.log("word found: "+rdict[newbounds.left]);
            stack.push({word:rdict[newbounds.left],pos:verticles.slice(),char:pasted.char});
            }

        if (isAvailableToUse(x+1,y))
            {
            setUsed(x+1,y,true);
            findNext(newbounds, pos+1, x+1,y, pasted, stack, verticles);
            setUsed(x+1,y,false);
            }
        if (isAvailableToUse(x-1,y))
            {
            setUsed(x-1,y,true);
            findNext(newbounds, pos+1, x-1,y, pasted, stack, verticles);
            setUsed(x-1,y,false);
            }
        if (isAvailableToUse(x,y+1))
            {
            setUsed(x,y+1,true);
            findNext(newbounds, pos+1, x,y+1, pasted, stack, verticles);
            setUsed(x,y+1,false);
            }
        if (isAvailableToUse(x,y-1))
            {
            setUsed(x,y-1,true);
            findNext(newbounds, pos+1, x,y-1, pasted, stack, verticles);
            setUsed(x,y-1,false);
            }
        verticles.pop();
        }
    }
// ========================================================================
function clearHighlight()
    {
    var table = document.getElementById("gametable");
    for(var y = 0; y < table.childNodes.length; y++)
    for(var x = 0; x < table.childNodes[y].childNodes.length; x++)
        {
        table.childNodes[y].childNodes[x].setAttribute("style", "");
        }
    }

// =================== show word function ===================
function showword(e)
    {
    viewField();
    clearHighlight();
    var wordinfo = this.stack[parseInt(e.target.value)];
    selectedWord = wordinfo;
    var verticles = wordinfo.pos;
    //console.log(wordinfo.word);
    var table = document.getElementById("gametable");
    for(var i in verticles)
        {
        var cv = verticles[i];
        if(getLetter(cv.x, cv.y) === undefined)
            {
            table.childNodes[cv.y].childNodes[cv.x].innerHTML="<p>"+wordinfo.char+"</p>";
            }
        table.childNodes[cv.y].childNodes[cv.x].setAttribute("style","background:green");
        //console.log(cv);
        }
    }
// ==========================================================

// =================== find word starting at (x,y) cell ===================
function findWords(x,y,stack)
    {
    var bounds = {left:0, right:rdict.length};
    var verticles=[];
    if (getLetter(x,y) !== undefined) { setUsed(x,y,true); }
    findNext(bounds,0,x,y,{state:false},stack,verticles);
    setUsed(x,y,false);
    }
// ========================================================================
// =================== find all possible words ===================
function findAllWords()
    {
    var bounds = {left:0, right:rdict.length};
    var stack=[];
    for(var y = 0; y < fieldsize; y++)
    for(var x = 0; x < fieldsize; x++)
        {
        findWords(x,y,stack);
        }
    //console.log("ALL WORDS:");
    stack.sort(function(a,b) { return b.word.length-a.word.length; });
    document.getElementById("answers").innerHTML="";
    var answers = document.createElement("select");
    answers.multiple="";
    answers.size=10;
    for(var i in stack)
        {
        //console.log(stack[i].word);
        var option = document.createElement("option");
        option.innerHTML = stack[i].word;
        option.value = ""+i;
        //option.addEventListener("select", function(e) { console.log(stack[parseInt(e.target.value)].word+" focused"); });
        answers.appendChild(option);
        }
    var thisobj={"stack":stack};
    answers.addEventListener("change", showword.bind(thisobj));
    answers.addEventListener("blur", function() { viewField(); clearHighlight(); });
    document.getElementById("answers").appendChild(answers);
    }
// ========================================================================
function addUsedWord(word)
    {
    usedWords[word]=true;
    var newusedword = document.createElement("option");
    newusedword.innerHTML = word;
    document.getElementById("usedwords").appendChild(newusedword);
    }
function acceptChoice()
    {
    if(!selectedWord) { return; }
    for(var i in selectedWord.pos)
        {
        if (!getLetter(selectedWord.pos[i].x, selectedWord.pos[i].y))
            {
            setLetter(selectedWord.pos[i].x, selectedWord.pos[i].y, selectedWord.char);
            break;
            }
        }
    addUsedWord(selectedWord.word);
    clearHighlight();
    viewField();
    }
function newGame(w)
    {
    var word;
    if (!w) { word = prompt("Please input initial word", "слово"); if(!word) { return; } }
    else    { word = w; }
    if (word.length > 11) { alert("Word is too long"); return; }
    for(var i in word)
        {
        if (alphabet.indexOf(word[i]) < 0) { alert("invalid symbols"); return; }
        }
    ccount=0;
    selectedWord=undefined;
    usedWords=[];
    document.getElementById("gamefield").innerHTML="";
    document.getElementById("usedwords").innerHTML="";
    createField(word.length);
    addUsedWord(word);
    for(var i = 0; i < word.length; i++)
        {
        setLetter(i,Math.floor(word.length/2),word[i]);
        }
    findAllWords();
    viewField();
    }
