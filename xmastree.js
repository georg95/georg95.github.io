var treevis = document.getElementById("xmastree");
    
var array = [];
var wires = [];
var lines=[1,1,3,5,7,9,9,11,11,13,13,13,15,15,1];
var sum = 0;
var balls = 30;
    
function erasetree()
    {
    wires = [];
    sum = 0;
    for(var i = 0; i < 15; i++)
        {
        array[i]=[];
        if(lines[i] === 1) { continue; }
        sum += lines[i];
        for (var x = 0; x < lines[i]; x++)
            {
            array[i][x+(15-lines[i])/2] = {type:"wire", dir:{top:true,left:true,right:true,down:true}, charge:false};
            }
        }
    array[0][7]={type:"star", dir:{top:false,left:false,right:false,down:true}, charge:false};
    array[1][7]={type:"wire", dir:{top:true,left:true,right:true,down:true}, charge:false};
    array[14][7]={type:"wire", dir:{top:true,left:true,right:true,down:true}, charge:true};
    }

function delplace(places, a)
    {
    for(var i = a+1; i < places.length; i++) { places[i-1]=places[i]; }
    places.pop();
    }
    
function putrandomball(places, allballs)
    {
    var rnd = Math.floor(Math.random()*places.length);
    var y = places[rnd].y;
    var x = places[rnd].x;
    var balldir = {top:false,left:false,right:false,down:false};
    var dirs = [];
    if (array[y][x+1] && array[y][x+1].type === "wire") { dirs.push("right"); }
    if (array[y][x-1] && array[y][x-1].type === "wire") { dirs.push("left"); }
    if (array[y+1] && array[y+1][x] && array[y+1][x].type === "wire") { dirs.push("down"); }    
    if (array[y-1] && array[y-1][x] && array[y-1][x].type === "wire") { dirs.push("top"); }    
    if(dirs.length === 0)
        {
        //console.log("fail "+places.length);
        delplace(places, rnd);
        return false;
        }
    var startdir = Math.floor(Math.random()*dirs.length);
    for (var i = 0; i < dirs.length; i++)
        {
        balldir[dirs[(startdir+i)%dirs.length]] = true;
        array[y][x]={type:"ball", dir:balldir};
        
        if(testtree(allballs+1))
            {
            //console.log("ok "+places.length);
            delplace(places, rnd);
            return true;
            }
        
        array[y][x] = {type:"wire", dir:{top:true,left:true,right:true,down:true}, charge:false};
        balldir[dirs[(startdir+i)%dirs.length]] = false;
        }
    //console.log("fail "+places.length);
    delplace(places, rnd);
    return false;
    }

function viewtree()
    {
    var innhtml = "";
    for (var y = 0; y < array.length; y++)
        {
        for (var x = 0; x < array[y].length; x++)
            {
            if(!array[y][x]) { innhtml+="_"; continue; }
            var symbol = "x";
            if (array[y][x].type === "ball") { symbol="@"; }
            if (array[y][x].type === "wire")
                {
                var dir = array[y][x].dir.left?1:0; dir*=2;
                dir+=array[y][x].dir.top?1:0; dir*=2;
                dir+=array[y][x].dir.right?1:0; dir*=2;
                dir+=array[y][x].dir.down?1:0;
                switch(dir)
                    {
                    case 0b1111:{ symbol="&#9580;"; break; }
                    
                    case 0b0111:{ symbol="&#9568;"; break; }
                    case 0b1011:{ symbol="&#9574;"; break; }
                    case 0b1101:{ symbol="&#9571;"; break; }
                    case 0b1110:{ symbol="&#9577;"; break; }
                    
                    case 0b1010:{ symbol="&#9552;"; break; }
                    case 0b0101:{ symbol="&#9553;"; break; }
                            
                    case 0b1100:{ symbol="&#9565;"; break; }
                    case 0b0110:{ symbol="&#9562;"; break; }
                    case 0b0011:{ symbol="&#9556;"; break; }
                    case 0b1001:{ symbol="&#9559;"; break; }
                    default: { symbol="X"; console.log(array[y][x]); break; }
                    };
                }
            if (array[y][x].type === "star") { symbol="*"; }
            if (array[y][x].charge) { innhtml+="<span id='charge'>"+symbol+"</span>"; }
            else { innhtml+=symbol; }
            }
        innhtml+="<br/>";
        }
    treevis.innerHTML=innhtml;
    }

erasetree();
var charge_counter = 0;
var charge_balls_counter = 0;
function tocharge(y,x)
    {
    charge_counter++;
    if(array[y][x].type === "ball" || array[y][x].type === "star") { charge_balls_counter++; }
    array[y][x].charge=true;
    var curr_dir = array[y][x].dir;
    if (curr_dir.down && array[y+1] && array[y+1][x] && array[y+1][x].dir.top && !array[y+1][x].charge) { tocharge(y+1,x); }
    if (curr_dir.top && array[y-1] && array[y-1][x] && array[y-1][x].dir.down && !array[y-1][x].charge) { tocharge(y-1,x); }
    if (curr_dir.right && array[y][x+1] && array[y][x+1].dir.left && !array[y][x+1].charge) { tocharge(y,x+1); }
    if (curr_dir.left && array[y][x-1] && array[y][x-1].dir.right && !array[y][x-1].charge) { tocharge(y,x-1); }
    }
function testtree(allballs)
    {
    for (var y = 0; y < array.length; y++)
    for (var x = 0; x < array[y].length; x++)
        {
        if(!array[y][x]) { continue; }
        array[y][x].charge=false;
        }
    array[14][7].charge = true;
    charge_counter=0;
    charge_balls_counter = 0;
    tocharge(14,7);
    if (charge_balls_counter === allballs+1) { return true; } // sum+1+1 - sum + star + wire to star
    return false;
    }

function findplaces()
    {
    var places = [];
    for (var y = 0; y < array.length-1; y++)
    for (var x = 0; x < array[y].length; x++)
        {
        if(!array[y][x] || array[y][x].type !== "wire") { continue; }
        places.push({"y":y, "x":x});
        }
    return places;
    }
    
function createtree()
    {
    erasetree();
    balls = parseInt(document.getElementById("balls").value) || 30;
    var places = findplaces();
    for (var i = 0; i < balls; )
        {
        if(putrandomball(places, i)) { i++; }
        if(places.length === 0) { balls = i; break; }
        }
    for (var y = 0; y < array.length-1; y++) // except root wire
    for (var x = 0; x < array[y].length; x++)
        {
        if(!array[y][x] || array[y][x].type != "wire") { continue; }
        wires.push({"y":y, "x":x});
        }
    simplify();
    viewtree();
    }
    

function delwire(a)
    {
    for(var i = a+1; i < wires.length; i++)
        {
        wires[i-1]=wires[i];
        }
    wires.pop();
    }
function simplifystep()
    {
    var rndwire = Math.floor(Math.random()*wires.length);
    if (wires.length === 0) { return false; }
    var wire = wires[rndwire];
    var wireobj = array[wire.y][wire.x];
    var dirs = [];
    for(var i in wireobj.dir) { if(wireobj.dir[i]) { dirs.push(i); } }
    if(dirs.length <= 1) { array[wire.y][wire.x]=undefined; delwire(rndwire); return true; }
    var rnddir = Math.floor(Math.random()*dirs.length);
    for (var i = 0; i < dirs.length; i++)
        {
        var curr_dir = (rnddir+i)%dirs.length;
        wireobj.dir[dirs[curr_dir]] = false;
        if (testtree(balls)) { return true; }
        wireobj.dir[dirs[curr_dir]] = true;
        }
    //array[wire.y][wire.x]=undefined;
    delwire(rndwire);
    return true;
    }
function simplify()
    {
    for (var i = 0; i < 1000; i++)
        {
        if(!simplifystep()) { console.log("simplify end"); break; }
        }
    console.log("wires: "+wires.length+"; treetest: "+testtree(balls));
    viewtree();
    }
erasetree();
viewtree();
