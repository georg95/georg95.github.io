"use strict"

var canvas = document.getElementById('game');
var area = canvas.getContext("2d");
var bgimg = new Image();
bgimg.src="bg.png";
var atrolleyimg = new Image();
atrolleyimg.src="trolley.png";
var ahandimg = new Image();
ahandimg.src="hand.png";
var adynamiteimg = new Image();
adynamiteimg.src="dynamite.png";
var amanimg = new Image();
amanimg.src="man.png";
var aenemyimg = new Image();
aenemyimg.src="enemy.png";
var retryimg = new Image();
retryimg.src="retry.png";
var enemyimg, handimg, dynamiteimg, manimg, trolleyimg;
var obamaimg=new Image(); obamaimg.src="obama.png";
var obamahandimg=new Image(); obamahandimg.src="obamahand.png";
var putinkaimg=new Image(); putinkaimg.src="putinka.png";
var vatnikimg=new Image(); vatnikimg.src="vatnik.png";
var obamacarimg=new Image(); obamacarimg.src="obamacar.png";
function switchNormal()
    {
    enemyimg = aenemyimg;
    dynamiteimg = adynamiteimg;
    manimg = amanimg;
    handimg = ahandimg;
    trolleyimg = atrolleyimg;
    texmode = "normal";
    document.title="Kill trolls";
    }
function switchVata()
    {
    enemyimg = vatnikimg;
    dynamiteimg = putinkaimg;
    manimg = obamaimg;
    handimg = obamahandimg;
    trolleyimg = obamacarimg;
    texmode = "vata";
    document.title="Kill vatniks";
    }
var hash = window.location.hash.substring(1);
if(hash === "v") { switchVata(); }
else { switchNormal(); }
var texmode = "normal";
document.addEventListener("keydown", function(e) {
   if(e.keyCode === 32)
    { if(texmode === "normal") { switchVata(); }
      else                     { switchNormal(); }} 
});    
var killed = 0;
var alltrolls = 0;
var man = {sizex:150/2, sizey:200/2,handangle:0,hp:150,maxhp:150,state:0};
var trolley = {x:300,y:200,vx:4,vy:0,sizex:300/2,sizey:200/2};
var mx = 0; var my = 0;
var dx=0;
var clicked = false;
var worldx = 0;
var timer = 60*60;
var endgame = false;
var bonussec = 2;
var dynamites=[];
var effects=[];
var enemies=[];
function setdefaults()
    {
    bonussec = 2;
    killed = 0;
    alltrolls = 0;
    dynamites=[];
    effects=[];
    enemies=[];
    man = {sizex:150/2, sizey:200/2,handangle:0,hp:150,maxhp:150,state:0};
    trolley = {x:300,y:200,vx:4,vy:0,sizex:300/2,sizey:200/2};
    mx = 0;
    my = 0;
    dx=0;
    clicked = false;
    worldx = 0;
    timer = 60*60;
    endgame = false;
    man.act = function()
        {
        if(this.state == 0) { this.state = 60; addEntity(dynamites, new dynamite(trolley.x, trolley.y, mx, my)); }
        }
    man.hit = function(dmg)
        {
        this.hp-=dmg;
        if(this.hp<0) { this.hp = 0; }
        }
    man.draw = function(x,y,left)
        {
        area.translate(x, y);
        area.fillStyle = "#0F0";
        area.fillRect(-this.sizex/2, -this.sizey-4, Math.round(this.sizex*this.hp/this.maxhp), 4);
        if(left) { area.scale(-1,1); }
        area.drawImage(manimg, -this.sizex/2, -this.sizey, this.sizex, this.sizey);
        area.setTransform(1, 0, 0, 1, 0, 0);
        this.drawhand(x,y,left);
        }
    man.drawhand = function(x,y,left)
        {
        var handx = x;
        var handy = y-this.sizey/3;
        area.translate(handx, handy);
        if(left) { area.scale(-1,1); }
        area.rotate(this.handangle);
        area.drawImage(handimg, -50/4, -50/4, 180/2, 50/2);
        area.setTransform(1, 0, 0, 1, 0, 0);
        }
    man.update=function()
        {
        if (this.hp <= 0)
            {
            this.draw=function(){};
            endgame=true;
            }
        if(this.state != 0) { this.state--; }
        this.handangle=Math.PI/2*(this.state-45)/15;
        if(this.state <= 45) { this.handangle=Math.PI/2; }
        }

    trolley.update=function()
        {
        this.x+=this.vx;
        this.y+=this.vy;
        if(this.x<0){this.x=0; this.vx=-this.vx;}
        if(this.y<0){this.y=0; this.vy=-this.vy;}
        if(this.x>canvas.width) {this.x=canvas.width;  this.vx=-this.vx;}
        if(this.y>canvas.height){this.y=canvas.height; this.vy=-this.vy;}
        man.update();
        }
    trolley.draw=function()
        {
        var flip=this.vx>0?false:true;
        man.draw(this.x, this.y-this.sizey/3, flip);
        area.translate(this.x, this.y);
        if(flip) { area.scale(-1,1); }
        area.drawImage(trolleyimg, -this.sizex/2, -this.sizey/2,this.sizex,this.sizey);
        area.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
setdefaults();
function effectBigBoom(t, sx, sy, radius)
    {
    this.time = t;
    this.alltime=t;
    this.sx = sx;
    this.sy = sy;
    this.radius = radius;
    return this;
    };
effectBigBoom.prototype.update=function() { if(this.time <= 0) { return false; } this.time-=1; return true; }
effectBigBoom.prototype.draw = function()
    {
    area.globalAlpha=this.time/this.alltime;
    area.strokeStyle = "#FF0";
    area.lineWidth=this.radius/4;
    area.beginPath();
    area.arc(this.sx,this.sy,this.radius*(1-this.time/this.alltime),0,2*Math.PI);
    area.stroke();
    area.globalAlpha=1;
    }
function effectTralDie(t, sx, sy, size)
    {
    this.time = t;
    this.alltime=t;
    this.sx = sx;
    this.sy = sy;
    this.size = size;
    return this;
    };
effectTralDie.prototype.update=function() { if(this.time <= 0) { return false; } this.time-=1; return true; }
effectTralDie.prototype.draw = function()
    {
    area.drawImage(enemyimg, this.sx-this.size/2, this.sy-this.size*this.time/this.alltime,
                   this.size, this.size*this.time/this.alltime);
    }
function dynamite(x,y,fx,fy)
    {
    this.x = x;
    this.y = y;
    this.dx = fx-x;
    this.dy = fy-y;
    this.sx = x;
    this.sy = y;
    this.t = 0;
    this.angle = 0; 
    }
function effectFlowText(t, text, style, color, sx, sy, dy)
    {
    this.time = t;
    this.alltime=t;
    this.text = text;
    this.style = style;
    this.color = color;
    this.sx = sx;
    this.sy = sy;
    this.dy = dy;
    return this;
    }
effectFlowText.prototype.update=function() { if(this.time <= 0) { return false; } this.time-=1; return true; }
effectFlowText.prototype.draw = function()
    {
    area.font = this.style;
    area.fillStyle = "rgba("+this.color+","+this.time/this.alltime+")";
    area.textAlign = "center";
    area.textBaseline = "bottom";
    area.fillText(this.text, this.sx,
                  this.sy+this.dy-this.dy*this.time/this.alltime)
    }
dynamite.prototype.sizex=50;
dynamite.prototype.sizey=50;
dynamite.prototype.update = function()
    {
    this.t+=1;
    if(this.t>=100)
        {
        AoeDamage(this.x, this.y, 150, 200);
        addEntity(effects, new effectBigBoom(30, this.x, this.y, 100)); return false;
        }
    this.x=this.sx+this.dx*this.t/100;
    this.y=this.sy+this.dy*this.t/100;
    this.angle+=0.2;
    return true;
    }
dynamite.prototype.draw= function()
    {
    area.translate(this.x, this.y);
    area.rotate(this.angle);
    area.drawImage(dynamiteimg, -this.sizex/2, -this.sizey/2, this.sizex, this.sizey);
    area.setTransform(1, 0, 0, 1, 0, 0);
    }

function updateEntities(array) { for(var i in array) { if(!array[i].update()) { delete array[i];} } }
function drawEntities(array) { for(var i in array) { array[i].draw(); } }
function addEntity(array, ent)
    {
    for(var i = 0; i <= array.length; i++)
        {
        if(array[i] === undefined) { array[i]=ent; break; }
        }
    }

function drawBg(dx)
    {
    var dxs = Math.floor(dx/canvas.width*800);
    if(dx != canvas.width) area.drawImage(bgimg,dxs,0,800-dxs, 600, 0,0, canvas.width-dx,canvas.height);
    if(dx != 0) area.drawImage(bgimg,0,0,dxs, 600, canvas.width-dx,0, dx,canvas.height);
    }
function Enemy(x,y,vx,vy)
    {
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.step=0;
    this.hp = 100;
    }
Enemy.prototype.maxhp = 100;
Enemy.prototype.size = 64;
Enemy.prototype.hit=function(dmg)
    {
    this.hp-=dmg;
    if(this.hp<0) { this.hp = 0; }
    }
Enemy.prototype.update = function()
    {
    if(this.hp<=0)
        {
        alltrolls--;
        killed++;
        timer+=60*bonussec;
        addEntity(effects, new effectFlowText(40, "+"+bonussec+"s", "bold 20px Arial", "80,255,120",
                this.x, this.y-this.size/2, -this.size/2));
        bonussec++;
        addEntity(effects, new effectTralDie(20, this.x,this.y+this.size/2,this.size));
        return false;
        }
    this.step++;
    if(this.step>20) { this.step = 0; }
    this.x+=this.vx;
    this.y+=this.vy;
    if(this.x<0){this.x=0; this.vx=-this.vx;}
    if(this.y<0){this.y=0; this.vy=-this.vy;}
    if(this.x>canvas.width) {this.x=canvas.width;  this.vx=-this.vx;}
    if(this.y>canvas.height){this.y=canvas.height; this.vy=-this.vy;}
    return true;
    }
Enemy.prototype.draw = function()
    {
    area.fillStyle = "#0F0";
    area.translate(this.x, this.y);
    area.fillRect(-this.size/2, -this.size/2, Math.round(this.size*this.hp/this.maxhp), 4);
    if(this.step > 10) { area.scale(-1,1); }
    area.drawImage(enemyimg, -this.size/2, -this.size/2, this.size, this.size);
    area.setTransform(1, 0, 0, 1, 0, 0);
    }
function AoeDamage(x, y, radius, dmg)
    {
    for(var i in enemies)
        {
        var dst = Math.sqrt((enemies[i].x-x)*(enemies[i].x-x)+(enemies[i].y-y)*(enemies[i].y-y));
        if (dst < radius)
            {
            enemies[i].hit(dmg*(radius-dst)/radius);
            }
        }
    var dst = Math.sqrt((trolley.x-x)*(trolley.x-x)+(trolley.y-y)*(trolley.y-y));
    if (dst < radius)
        {
        man.hit(dmg*(radius-dst)/radius);
        }
    }
function AddEnemies()
    {
    if(Math.random()<0.002*(10-alltrolls))
        {
        alltrolls++;
        var en = new Enemy(Math.random()*canvas.width, canvas.height,
                           -1.5+Math.random()*3,-1-Math.random()*2)
        addEntity(enemies, en);
        }
    }
function DrawTimer()
    {
    area.font = "bold 20px Arial";
    area.textAlign = "left";
    area.textBaseline = "top";
    area.fillStyle = "#FFF";
    area.fillText("TIME: "+Math.floor(timer/60)+"s", 20, 20);
    }
function DrawLoop()
    {
    //area.fillStyle="#FFF";
    //worldx-=2;
    //dx-=2;
    if(dx < 0) { dx+=canvas.width; }
    if(dx >= canvas.width) { dx-=canvas.width; }
    drawBg(dx);
    if (!endgame)
        {
        if(clicked) { man.act(); }
        AddEnemies();

        timer--;
        }
    bonussec = 2;
    updateEntities(dynamites);
    updateEntities(effects);
    updateEntities(enemies);
    trolley.update();
    trolley.draw();
    drawEntities(enemies);
    drawEntities(dynamites);
    drawEntities(effects);
    if(endgame)
        {
        area.fillStyle="#000";
        var statsx = 300;
        var statsy = 150;
        area.fillRect(canvas.width/2-statsx/2, canvas.height/2-statsy/2, statsx, statsy);
        area.font = "bold 20px Arial";
        area.textAlign = "center";
        area.textBaseline = "middle";
        area.fillStyle = "#FFF";
        area.fillText("GAME OVER", canvas.width/2, canvas.height/2-30);
        area.fillText("TROLLS KILLED: "+killed, canvas.width/2, canvas.height/2);
        var retryx=canvas.width/2;
        var retryy=canvas.height/2+40;
        area.drawImage(retryimg, retryx-20, retryy-20, 40, 40);
        if(clicked && (mx-retryx)*(mx-retryx)+(my-retryy)*(my-retryy) < (20*20)/2)
            {
            setdefaults();
            }
        }
    DrawTimer();
    if(timer == 0) { endgame=true; }
    window.requestAnimationFrame(DrawLoop);
    clicked=false;
    }
function start()
    {
    (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();
    canvas.onclick=function(e) { clicked = true; mx = e.pageX-canvas.offsetLeft; my = e.pageY-canvas.offsetTop; }
    canvas.onkeydown=function(e)
        {
        ;
        }
    window.requestAnimationFrame(DrawLoop);
    }
