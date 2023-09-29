var canvas, area;
canvas = document.getElementById("canv");
area = canvas.getContext("2d");
var mainlayer;
var curchange=[];
var lastcoords={x:0,y:0};
var lastmove = Date.now();
function canvDraw()
    {
    area.fillStyle="#000";
    area.fillRect(0,0,canvas.width,canvas.height);
    }
var clicked = false;
var curcolor = document.getElementById("colorpicker").value;
var cursize = document.getElementById("brushsize").value;
var curtransparency = document.getElementById("transparent").value;
document.getElementById("size").innerHTML="size: "+cursize;
document.getElementById("transp").innerHTML="transparency: "+curtransparency;
function chcolor(picker)
    {
    curcolor=picker.value;
    //console.log(curcolor);
    }
function chrange(range)
    {
    cursize=range.value;
    document.getElementById("size").innerHTML="size: "+cursize;
    }
function chtransparent(range)
    {
    curtransparency=range.value;
    document.getElementById("transp").innerHTML="transparency: "+curtransparency;
    }
canvas.onmousedown=function(e)
    {
    e.preventDefault();
    var mx = e.pageX-canvas.offsetLeft;
    var my = e.pageY-canvas.offsetTop;

    
    curchange.push({x:mx,y:my});
    //lastcoords={x:mx,y:my};
    clicked=true;
    }
document.onmouseup=function(e)
    {
    e.preventDefault();
    area.putImageData(mainlayer,0,0);
    area.globalAlpha=1-curtransparency/100;
    drawLine();
    area.globalAlpha=1;
    mainlayer = area.getImageData(0,0,canvas.width,canvas.height);
    clicked=false;
    curchange=[];
    }
function drawLine()
    {
    area.strokeStyle = curcolor;
    area.lineJoin = "round";
    area.lineCap = "round";
    area.lineWidth=cursize;
    if(curchange.length < 1) { return; }
    area.beginPath();
    area.moveTo(curchange[0].x, curchange[0].y);
    for(var i = 1; i < curchange.length-1; i++)
        {
        area.lineTo(curchange[i].x, curchange[i].y);
        }
    area.stroke();
    }
var canvas, area;
canvas = document.getElementById("canv");
area = canvas.getContext("2d");
var mainlayer;
var curchange=[];
var lastcoords={x:0,y:0};
var lastmove = Date.now();
function canvDraw()
    {
    area.fillStyle="#000";
    area.fillRect(0,0,canvas.width,canvas.height);
    }
var clicked = false;
var curcolor = document.getElementById("colorpicker").value;
var cursize = document.getElementById("brushsize").value;
var curtransparency = document.getElementById("transparent").value;
document.getElementById("size").innerHTML="size: "+cursize;
document.getElementById("transp").innerHTML="transparency: "+curtransparency;
function chcolor(picker)
    {
    curcolor=picker.value;
    //console.log(curcolor);
    }
function chrange(range)
    {
    cursize=range.value;
    document.getElementById("size").innerHTML="size: "+cursize;
    }
function chtransparent(range)
    {
    curtransparency=range.value;
    document.getElementById("transp").innerHTML="transparency: "+curtransparency;
    }
canvas.onmousedown=function(e)
    {
    var mx = e.pageX-canvas.offsetLeft;
    var my = e.pageY-canvas.offsetTop;

    
    curchange.push({x:mx,y:my});
    //lastcoords={x:mx,y:my};
    clicked=true;
    }
document.onmouseup=function(e)
    {
    area.putImageData(mainlayer,0,0);
    area.globalAlpha=1-curtransparency/100;
    drawLine();
    area.globalAlpha=1;
    mainlayer = area.getImageData(0,0,canvas.width,canvas.height);
    clicked=false;
    curchange=[];
    }

function drawLine()
    {
    area.strokeStyle = curcolor;
    area.lineJoin = "round";
    area.lineCap = "round";
    area.lineWidth=cursize;
    if(curchange.length < 1) { return; }
    area.beginPath();
    area.moveTo(curchange[0].x, curchange[0].y);
    for(var i = 1; i < curchange.length-1; i++)
        {
        area.lineTo(curchange[i].x, curchange[i].y);
        }
    area.stroke();
    }
document.onmousemove=function(e)
    {
    if(!clicked) { return; }
    e.preventDefault();
    var mx = e.pageX-canvas.offsetLeft;
    var my = e.pageY-canvas.offsetTop;
    area.putImageData(mainlayer,0,0);
    //if(Date.now()-lastmove > 10) {
        curchange.push({x:mx,y:my});
    //}
    //lastmove = Date.now();
    area.globalAlpha=1-curtransparency/100;
    drawLine();
    area.globalAlpha=1;
    /*
    area.globalAlpha=0.2;
    area.beginPath();
    area.moveTo(lastcoords.x, lastcoords.y);
    lastcoords.x=mx;
    lastcoords.y=my;
    area.lineTo(mx, my);
    area.stroke();
    area.globalAlpha=1;*/
    }
function download(text, name, type)
    {
    var a = document.getElementById("a");
    //var file = new Blob([canvas.toDataURL("image/png")], {type:"image/png"});
    a.href=canvas.toDataURL("image/png").replace(/^data:image\/[^;]/,"data:application/octet-stream"); //URL.createObjectURL(file);
    a.download="pic.png";
    a.click();
    }
canvDraw();
mainlayer = area.getImageData(0,0,canvas.width,canvas.height);
