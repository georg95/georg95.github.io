"use strict"
var canvas, area, imgData, zbuf=[];
var bg = new Image();
bg.src="bg.png";

function initWebGL(canvas)
    {
    var gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
    catch(e) {}
    if (!gl)
        {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
        }
    if (gl)
        {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT)
        console.log("ok");
        }
    else { console.warn("gl disabled"); }
    return gl;
    }
function initWebCanvas(canvas)
    {
    return canvas.getContext("2d");
    }
function setPixel(x,y,z,color) // (20, 30, [0,255,0,255])
    {
    if (z > farfield || z < nearfield) { return; }
    var i = (Math.round(y)*canvas.width+Math.round(x));
    if(zbuf[i] < z) { return; }
    if (color[3] === 255) { zbuf[i] = z; }
    i*=4;
    if (imgData.data[i] !== undefined)
        {
        imgData.data[i+0] = imgData.data[i+0]+(color[0]-imgData.data[i+0])*color[3]/255;
        imgData.data[i+1] = imgData.data[i+1]+(color[1]-imgData.data[i+1])*color[3]/255;
        imgData.data[i+2] = imgData.data[i+2]+(color[2]-imgData.data[i+2])*color[3]/255;
        }
    else
        {
        //i=0;
        //i[32]=3;
        imgData.data[i+0] = color[0];
        imgData.data[i+1] = color[1];
        imgData.data[i+2] = color[2];
        imgData.data[i+3] = 255;
        }
    }
function DrawLine(x1,y1,z1,x2,y2,z2,color)
    {
    var crd1 = MulMat([[x1,y1,z1,1]], TrMatrix);
    var crd2 = MulMat([[x2,y2,z2,1]], TrMatrix);
    //console.log("DrawLine");
    //console.log(crd1);
    //console.log(crd1);
    
    var dx = crd2[0][0]-crd1[0][0];
    var dy = crd2[0][1]-crd1[0][1];
    var dz = crd2[0][2]-crd1[0][2];
    var pixels = Math.ceil(Math.abs(dx)+Math.abs(dy));
    dx/=pixels;
    dy/=pixels;
    dz/=pixels;
    var xs = crd1[0][0];
    var ys = crd1[0][1];
    var zs = crd1[0][2];
    for (var t = 0; t < pixels; t++)
        {
        setPixel(xs+dx*t, ys+dy*t, zs+dz*t, color);
        }
    }
var TrMatrix=[[1,0,0,0],
              [0,1,0,0],
              [0,0,1,0],
              [0,0,0,1]];
function LoadIdentity()
    {
    TrMatrix=[[1,0,0,0],
              [0,1,0,0],
              [0,0,1,0],
              [0,0,0,1]];
    }
function MulMat(matA, matB)
    {
    var resMat=[];
    for (var y = 0; y < matA.length; y++)
        {
        resMat[y] = [];
        for (var x = 0; x < matA[y].length; x++)
            {
            var sum = 0;
            for (var i = 0; i < matA[y].length; i++) { sum += matA[y][i]*matB[i][x]; }
            resMat[y][x] = sum;
            }
        }
    return resMat;
    }

var farfield = 1000;
var nearfield = 100;
    
var sx = 0;
var sy = 0;
var cube = [];
cube.push({x1:-1,y1:-1,z1:-1,x2:-1,y2:-1,z2:1});
cube.push({x1:-1,y1:-1,z1:-1,x2:-1,y2:1,z2:-1});
cube.push({x1:-1,y1:-1,z1:-1,x2:1,y2:-1,z2:-1});

cube.push({x1:1,y1:1,z1:1,x2:1,y2:1,z2:-1});
cube.push({x1:1,y1:1,z1:1,x2:1,y2:-1,z2:1});
cube.push({x1:1,y1:1,z1:1,x2:-1,y2:1,z2:1});
    
cube.push({x1:1,y1:-1,z1:1,x2:-1,y2:-1,z2:1});
cube.push({x1:1,y1:-1,z1:1,x2:1,y2:-1,z2:-1});
    
cube.push({x1:-1,y1:1,z1:1,x2:-1,y2:-1,z2:1});
cube.push({x1:-1,y1:1,z1:1,x2:-1,y2:1,z2:-1});
    
cube.push({x1:1,y1:1,z1:-1,x2:-1,y2:1,z2:-1});
cube.push({x1:1,y1:1,z1:-1,x2:1,y2:-1,z2:-1});

function RotateTransformX(alpha)
    {
    var cosa = Math.cos(alpha);
    var sina = Math.sin(alpha);
    TrMatrix=MulMat(TrMatrix, [[1,    0,    0, 0],
                               [0, cosa,  sina, 0],
                               [0, -sina, cosa, 0],
                               [0,    0,    0, 1]]);
    }
function RotateTransformY(alpha)
    {
    var cosa = Math.cos(alpha);
    var sina = Math.sin(alpha);
    TrMatrix=MulMat(TrMatrix, [[cosa,  0, sina, 0],
                               [0,     1,    0, 0],
                               [-sina, 0, cosa, 0],
                               [    0, 0,    0, 1]]);
    }
function TranslateTransform(x,y,z)
    {
    TrMatrix=MulMat(TrMatrix, [[1,0,0,0],
                               [0,1,0,0],
                               [0,0,1,0],
                               [x,y,z,1]]);
    }
function ScaleTransform(a)
    {
    TrMatrix=MulMat(TrMatrix, [[a,0,0,0],
                               [0,a,0,0],
                               [0,0,a,0],
                               [0,0,0,1]]);
    }
TranslateTransform(-100, 150, 100);
console.dir(TrMatrix);
console.dir(MulMat([[0,0,0,1]],TrMatrix));
LoadIdentity();
function DrawPlane(points, color)
    {
    var x1 = points[0].x;
    var y1 = points[0].y;
    var z1 = points[0].z;
        
    var x2 = points[1].x;
    var y2 = points[1].y;
    var z2 = points[1].z;
    
    var x3 = points[2].x;
    var y3 = points[2].y;
    var z3 = points[2].z;
    
    var p1 = MulMat([[x1,y1,z1,1]], TrMatrix);
    var p2 = MulMat([[x2,y2,z2,1]], TrMatrix);
    var p3 = MulMat([[x3,y3,z3,1]], TrMatrix);
    x1 = p1[0][0]; y1 = p1[0][1]; z1 = p1[0][2];
    x2 = p2[0][0]; y2 = p2[0][1]; z2 = p2[0][2];
    x3 = p3[0][0]; y3 = p3[0][1]; z3 = p3[0][2];
        
    var sx = Math.min(Math.min(x1, x2), x3);
    var ex = Math.max(Math.max(x1, x2), x3);
        
    var sy = Math.min(Math.min(y1, y2), y3);
    var ey = Math.max(Math.max(y1, y2), y3);
    var A = y1*(z2 - z3) + y2*(z3 - z1) + y3*(z1 - z2)
    var B = z1*(x2 - x3) + z2*(x3 - x1) + z3*(x1 - x2)
    var C = x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)
    var D = -(x1*(y2*z3 - y3*z2) + x2*(y3*z1 - y1*z3) + x3*(y1*z2 - y2*z1));
    for (var x = sx; x < ex; x++)
    for (var y = sy; y < ey; y++)
        {
        //var s1 = Math.round((x1 - x) * (y2 - y1) - (x2 - x1) * (y1 - y));
        //var s2 = Math.round((x2 - x) * (y3 - y2) - (x3 - x2) * (y2 - y));
        //var s3 = Math.round((x3 - x) * (y1 - y3) - (x1 - x3) * (y3 - y));
        var s = 1 / 2 *Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
        var s1 = 1 / 2 *Math.abs((x2 - x1) * (y - y1) - (x - x1) * (y2 - y1));
        var s2 = 1 / 2 *Math.abs((x - x1) * (y3 - y1) - (x3 - x1) * (y - y1));
        var s3 = 1 / 2 *Math.abs((x2 - x) * (y3 - y) - (x3 - x) * (y2 - y));
        if (Math.abs((s - (s1+s2+s3))/s) < 0.01)
            {
            var z = C!=0 ? -(A*x+B*y+D)/C : z1;
            setPixel(x,y,z,color);
            }
        }
    }
function DrawLines(lines, color)
    {
    for (var i in lines)
        {
        DrawLine (lines[i].x1, lines[i].y1, lines[i].z1,
                  lines[i].x2, lines[i].y2, lines[i].z2, color);
        }
    }
function FillColor(color)
    {
    for (var i = 0; i < imgData.data.length; i+=4)
        {
        imgData.data[i+0] = color[0];
        imgData.data[i+1] = color[1];
        imgData.data[i+2] = color[2];
        imgData.data[i+3] = color[3];
        }
    }
function ProjectionEnable()
    {
    var aspect = canvas.width/canvas.height;
    var angleview = Math.PI/2;
    var f = farfield;
    var n = nearfield;
    var arg2 = 1/Math.tan(angleview/2);
    var arg1 = arg2/aspect;
    var arg3 = (f+n)/(f-n);
    var arg4 = -2*f*n/(f-n);
    TrMatrix=MulMat(TrMatrix, [[arg1,0,0,0],
                               [0,arg2,0,0],
                               [0,0,arg3,1],
                               [0,0,arg4,0]]);
    }
var anglex = 0;
var angley = 0;
var alpha = 80;
function UpdateAll()
    {
    for (var i = 0; i < imgData.data.length/4; i++)
        {
        zbuf[i]=farfield;
        }
    //FillColor([0,0,0,255]);
    LoadIdentity();
    RotateTransformX(anglex);
    RotateTransformY(angley);
    ScaleTransform(100);
    TranslateTransform(canvas.width/2, canvas.height/2, 950);
    anglex+=0.0125;
    angley+=0.005;
    
    //ProjectionEnable();
    DrawPlane([{x:1,y:1,z:1},
               {x:1,y:-1,z:1},
               {x:-1,y:1,z:1}], [100, 100, 255, alpha]);
    DrawPlane([{x:-1,y:-1,z:1},
               {x:1,y:-1,z:1},
               {x:-1,y:1,z:1}], [100, 100, 255, alpha]);

    DrawPlane([{x:1,y:1,z:-1},
               {x:1,y:-1,z:-1},
               {x:-1,y:1,z:-1}], [100, 255, 100, 255]);
    DrawPlane([{x:-1,y:-1,z:-1},
               {x:1,y:-1,z:-1},
               {x:-1,y:1,z:-1}], [100, 255, 100, 255]);
        
    DrawPlane([{x:1,y:1,z:-1},
               {x:-1,y:1,z:1},
               {x:-1,y:1,z:-1}], [255, 255, 100, alpha]);
    DrawPlane([{x:-1,y:1,z:1},
               {x:1,y:1,z:1},
               {x:1,y:1,z:-1}], [255, 255, 100, alpha]);
    
    DrawPlane([{x:1,y:-1,z:-1},
               {x:-1,y:-1,z:1},
               {x:-1,y:-1,z:-1}], [100, 255, 255, alpha]);
    DrawPlane([{x:-1,y:-1,z:1},
               {x:1,y:-1,z:1},
               {x:1,y:-1,z:-1}], [100, 255, 255, alpha]);
        
    //DrawLine(1,-1,1,1,1,-1,[255, 100, 100, 255]);
    DrawPlane([{x:1,y:1,z:1},
               {x:1,y:-1,z:1},
               {x:1,y:1,z:-1}], [255, 100, 100, alpha]);
    DrawPlane([{x:1,y:-1,z:-1},
               {x:1,y:1,z:-1},
               {x:1,y:-1,z:1}], [255, 100, 100, alpha]);
        
    DrawPlane([{x:-1,y:1,z:1},
               {x:-1,y:-1,z:1},
               {x:-1,y:1,z:-1}], [255, 100, 255, alpha]);
    DrawPlane([{x:-1,y:-1,z:-1},
               {x:-1,y:1,z:-1},
               {x:-1,y:-1,z:1}], [255, 100, 255, alpha]);
    
    sx++;
    sy++;
    }
function DrawAll()
    {
    area.putImageData(imgData,0,0);
    }
imgData = area.getImageData(0,0,canvas.width,canvas.height);
function DrawLoop()
    {
    try
        {
        area.drawImage(bg, 0,0);
        imgData = area.getImageData(0,0,canvas.width,canvas.height);
        }
    catch(e) { FillColor([0,0,0,255]); }
    UpdateAll();
    DrawAll();
    window.requestAnimationFrame(DrawLoop);
    }
    
function start()
    {
    canvas = document.getElementById('game');
    area = initWebCanvas(canvas);
    (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();
    imgData = area.getImageData(0,0,canvas.width,canvas.height);
    //console.dir(area);
    window.requestAnimationFrame(DrawLoop);
    }
