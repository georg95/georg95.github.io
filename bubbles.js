
function makeTable (width, heigth)
	{
	var ides = 101;
	var maxId = 100 + width;
	var tablice = "";
	while(maxId <= heigth*100 + width)
	{
	tablice += "<tr>";
	var oldValueIdes = ides;
		while(ides <= maxId)
		{
		tablice += "<td onClick='MyEvent (this);' id =" + String(ides) + ">" + "&nbsp;</td>";
		ides += 1;
		}
	ides = oldValueIdes + 100;
	maxId +=              100;
	tablice += "</tr>";
	}
	document.all.tabl.innerHTML = "<table cellspacing='0'>" + tablice + "</table>"; 
	}

var state = new Array(19);
var savedscores = eval(document.all.scores.innerHTML);
for (var i = 0; i < 19; i++)
{
state[i] = new Array(11);
}

function SaveState()
{
for (var x = 1; x <= 19; x++)
{
for (var y = 1; y <= 11; y++)
{
state[x-1][y-1] = document.getElementById(""+(y*100+x)).bgColor;
}
}
}

function Restore()
{
document.all.scores.innerHTML=""+savedscores;
for (var x = 1; x <= 19; x++)
{
for (var y = 1; y <= 11; y++)
{
document.getElementById(""+(y*100+x)).bgColor = state[x-1][y-1];
}
}
IsCombos();
}



makeTable(19, 11);
randomFill();
IsCombos();
//setTimeout("ScrollRight();", 10000);


function MyEvent (objectAdress)
{
//alert (objectAdress.id);
SaveState();
var mssv = findObject (objectAdress, false);
if(mssv) { Bang(findObject (objectAdress, true)); }
if (!IsCombos())
{
NoMoreCombos();
}
}

function NewGame()
{
makeTable(19, 11);
randomFill();
document.all.scores.innerHTML = "0";
IsCombos();
}

function NoMoreCombos()
{
alert("No more combinations!");
}

function IsCombos()
{
//alert("IsCombos");
var x = 1;
var y = 1;
var blue = 0;
var red = 0;
var green = 0;
var yellow = 0;
var violet = 0;
var good = false;
while(x <= 19)

{
//alert("X="+x);
	while(y <= 11)
	{
	var newId = y*100 + x;
	var curr_color = document.getElementById(newId.toString()).bgColor;
if(curr_color == "#ff0000") { red++; }
if(curr_color == "#00ff00") { green++; }
if(curr_color == "#0000ff") { blue++; }
if(curr_color == "#ff00ff") { violet++; }
if(curr_color == "#ffff00") { yellow++; }
	if (curr_color == "" || curr_color == "#ffffff") { y++; continue; }
	var bubblesnear = findNear(newId, curr_color);
	//alert(bubblesnear);
	//alert(bubblesnear[0]);
	if (bubblesnear[0] != undefined) { good = true; }
	y++;
	}

y = 1;
x ++;
}
document.getElementById("reds").innerHTML=""+red;
document.getElementById("greens").innerHTML=""+green;
document.getElementById("blues").innerHTML=""+blue;
document.getElementById("yellows").innerHTML=""+yellow;
document.getElementById("violets").innerHTML=""+violet;
return good;
}


function Bang (bubbles)
{
var len = 0;
while(!isNaN(bubbles[len])) { len++; }
bubbles = Sorting(bubbles, len);
/*
var sd = 0;
while(sd < len)
{
alert(bubbles[sd]);
sd++;
}
*/
var i = 0;
//alert(len + " length");
while(i < len)
{
var k = 1;
//alert("i = " + i);
//alert("bubbles[" + eval(i+k-1) + "] = " + bubbles[i + k - 1]);

while(bubbles[i + k - 1] + 100 == bubbles[i + k]) { /*alert("k++ = " + k);*/ k++; }

var x = bubbles[i + k - 1]%100; var y = (bubbles[i + k - 1] - x)/100;
//alert("x = " + x + " y = " + y + "k = " + k);
Down (x, y, k);
i += k;
}
ScrollRight();
}



function Sorting (bubbles, len)
{
var save = 1;
var i = 0;
while (save != 0)
{
	save = 0;
	while (i + 1 < len)
	{
	if (bubbles[i]%100 < bubbles[i + 1]%100) { save = bubbles[i]; bubbles[i] = bubbles[i + 1]; bubbles[i + 1] = save; }
	i++;
	}
i = 0;
}
save = 1;
i = 0;
while (save != 0)                              
{
save = 0;
while(i + 1 < len)
{
if(bubbles[i]%100 == bubbles[i + 1]%100 && (bubbles[i]-(bubbles[i]%100))/100 > (bubbles[i + 1]-(bubbles[i + 1]%100))/100) { save = bubbles[i]; bubbles[i] = bubbles[i + 1]; bubbles[i + 1] = save; }
i++;
}
i = 0;
}
return bubbles;
}



function Down (x, y, len)
{
var nearId = 0;
var nextId = 0;

while(y - len >= 1)
{
nearId = y*100 + x;
nextId = nearId-len*100;
document.getElementById(nearId.toString()).bgColor = document.getElementById(nextId.toString()).bgColor;
y--;
}

while(y >= 1)
{
nearId = y*100 + x;
document.getElementById(nearId.toString()).bgColor = "";
y--;
}

}


function Right (x, y, len)
{
var nearId = 0;
var nextId = 0;
while(x - len >= 1)
{
nearId = y*100 + x;
nextId = nearId-len;
document.getElementById(nearId.toString()).bgColor = document.getElementById(nextId.toString()).bgColor;
x--;
}

while(x >= 1)
{
nearId = y*100 + x;
document.getElementById(nearId.toString()).bgColor = "";
x--;
}

}




function painting (objectAdress)
	{
	var color = "blue";
	if(document.forms[0].elements[0].checked) { color = "red";    }
	if(document.forms[0].elements[1].checked) { color = "#00ff00";  }
	if(document.forms[0].elements[2].checked) { color = "blue";   }
	if(document.forms[0].elements[3].checked) { color = "yellow"; }
	if(document.forms[0].elements[4].checked) { color = "#ff00ff"; }
	objectAdress.bgColor = color;
	}



function findObject (bubbleAdress, includeScores)
{
var color = bubbleAdress.bgColor;
if(color == "" || color == "#ffffff") { return false; }  
var xPos = bubbleAdress.id%100;
var yPos = (bubbleAdress.id-xPos)/100;

var usingBubbles = new Array(9999);
var allBubbles   = new Array(1000);

allBubbles[0] = yPos*100 + xPos;
usingBubbles[yPos*100 + xPos] = yPos*100 + xPos;

var elem = 0;
var bubbleNumber = 0;

while(bubbleNumber >= elem)
	{
	//alert(allBubbles[elem] + " UsBElem " + elem + " elem " + bubbleNumber + "BNum");
	
	var bubbles = findNear(allBubbles[elem], color);
	
	var nearNum = 0;
	while(nearNum <= 3 && !isNaN(bubbles[nearNum]))
		{
		//alert(bubbles[nearNum] + "NearB");
		
		if(usingBubbles[bubbles[nearNum]] != bubbles[nearNum]) 
		{
		bubbleNumber++;
		usingBubbles[bubbles[nearNum]] = bubbles[nearNum]; 
		allBubbles[bubbleNumber]       = bubbles[nearNum];
		}
		nearNum++;
		}
	elem++;
	}
//var i = 0;
//while(i < elem)
//{
//alert(allBubbles[i]);
//i++;
//}
//alert(elem/2*(elem-1)*10 + " �����");
var scores = elem/2*(elem-1)*10;
savedscores = eval(document.all.scores.innerHTML);
if(scores != 0) { if (includeScores) {document.all.scores.innerHTML = savedscores + scores;} }
else            { return false; }
return allBubbles;
}



function findNear (idFind, color)
{
var xPos = idFind%100;
var yPos = (idFind-xPos)/100;
var bubbles = new Array(8);
var nearId = 0;
var num = 0;       
nearId = xPos - 1 +   yPos*100; if(xPos >  1 && yPos >= 1) { if(document.getElementById(nearId.toString()).bgColor == color) { bubbles[num] = nearId; num++; } }
nearId = xPos + (yPos - 1)*100; if(xPos >= 1 && yPos >  1) { if(document.getElementById(nearId.toString()).bgColor == color) { bubbles[num] = nearId; num++; } }
nearId = xPos + (yPos + 1)*100; if(xPos >= 1 && yPos < 11) { if(document.getElementById(nearId.toString()).bgColor == color) { bubbles[num] = nearId; num++; } }
nearId = xPos + 1 +   yPos*100; if(xPos < 19 && yPos >= 1) { if(document.getElementById(nearId.toString()).bgColor == color) { bubbles[num] = nearId; } }
return bubbles;
}



function ScrollRight()
{
var x = 19;
var y = 11;
var startX = 0;
var startY = 0;
var len = 0;
var ID = 0;

while (y >= 1)

{
	while (x >= 1)
	{
	ID = y*100 + x;
	if (document.getElementById (ID.toString()).bgColor == "") { /*alert("id = " + ID);*/ if(!len) { startX = x; startY = y; } len++; }
	else 
	{
	//alert ("len = " + len);
	if (len) { /*alert ("x = " + startX + "; y = " + startY + "; len = " + len);*/ Right (startX, startY, len); x = startX; y = startY; len = 0; }
	}
	x--;
	}
len = 0;
x = 19;
y--;
}

}



function isElemInside (array, arrLen, subElem)
{
var i = 0;
while(i < arrLen)
{
if(array[i] == subElem) { return true; }
i++;
}
return false;
}



function randomFill()
{
var x = 1;
var y = 1;
while(x <= 19)

{
	while(y <= 11)
	
	{
	var newId = y*100 + x;
	var rand = Math.round(Math.random() * 4);
	var color = ""
	if(rand == 0) { color = "#ff0000"; }
	if(rand == 1) { color = "#00ff00"; }
	if(rand == 2) { color = "#0000ff"; }
	if(rand == 3) { color = "#ffff00"; }
	if(rand == 4) { color = "#ff00ff"; }
	document.getElementById(newId.toString()).bgColor = color;
	y++;
	}

y = 1;
x ++;
}

}

