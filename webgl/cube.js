(function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();
var gl;
function initGL(canvas)
    {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        }
    catch (e) {;}
    if (!gl)
        {
        alert("Could not initialise WebGL, sorry :-(");
        }
    }


function getShader(gl, id)
    {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) { return null; }

    var str = "";
    var k = shaderScript.firstChild;
    while (k)
        {
        if (k.nodeType == 3) { str += k.textContent; }
        k = k.nextSibling;
        }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment")
        {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
    else if (shaderScript.type == "x-shader/x-vertex")
        {
        shader = gl.createShader(gl.VERTEX_SHADER);
        }
    else { return null; }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
        alert(gl.getShaderInfoLog(shader));
        return null;
        }

    return shader;
    }


    var shaderProgram;

function initShaders()
    {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    //shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    //gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    }

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var mvMatrixStack = [];
    
function mvPushMatrix()
    {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
    }

function mvPopMatrix()
    {
    if (mvMatrixStack.length == 0) { throw "Invalid popMatrix!"; }
    mvMatrix = mvMatrixStack.pop();
    }

function setMatrixUniforms()
    {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }
var cubeVertexPositionBuffer;
var cubeVertexColorBuffer;
var cubeVertexIndexBuffer;
var cubeVertexTextureCoordBuffer;
function initBuffers()
    {
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = Math.floor(vertices.length/3);
        
    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
      // Front face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,

      // Back face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Top face
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,

      // Bottom face
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
      1.0, 0.0,

      // Right face
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,

      // Left face
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = Math.floor(textureCoords.length/2);

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
    }
var wallTexture;
function initTexture()
    {
    wallTexture=gl.createTexture();
    wallTexture.image = new Image();
    wallTexture.image.onload = function() { handleLoadedTexture(wallTexture); }
    wallTexture.image.src="texture.png";
    }
function handleLoadedTexture(tex)
    {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tex.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    }
var angle = 0;
var rotx = 0;
var roty = 0;
var rotz = 0;

var xpos = 0;
var ypos = 0;
var zpos = 0;

var xsp = 0;
var ysp = 0;
var zsp = 0;

var keys = { W:false, S:false, A:false, D:false };
    
var jump = false;

var labyrinths=[[
    "###############",
    "B #     #   # #",
    "# # ### ### # #",
    "# # #       # #",
    "# #   ### # # #",
    "# # # #   # # F",
    "#   # # # # # #",
    "##### # # # # #",
    "#     # # #   #",
    "###############"],
               [
    "###############",
    "#   #   # #   #",
    "# #   #   # # #",
    "# ######### # F",
    "B         # ###",
    "# ######  #   #",
    "# #       ### #",
    "# #########   #",
    "#             #",
    "###############"]];
var curr_lab = 0;    
var lab2=labyrinths[curr_lab];
function toabscoords(ax, ay)
    {
    return {x:2*ax, y:2*ay};
    }
function torelcoords(ax, ay)
    {
    return {x:Math.round(ax/2), y:Math.round(ay/2)};
    }
function gotostart()
    {
    for (var s in lab2)
    for (var i = 0; i < lab2[s].length; i++)
            {
            if(lab2[s][i] == "B")
                {
                var pos = toabscoords(i,s);
                xpos = pos.x;
                ypos = pos.y;
                }
            }
    }
gotostart();
function newlab()
    {
    curr_lab++;
    lab2=labyrinths[curr_lab];
    if (lab2 === undefined) { curr_lab = 0; lab2=labyrinths[curr_lab]; }
    gotostart();
    }
var lab = [" |  ",
           "____",
           " |  ",
           "____"];
function drawLabirynth()
    {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, wallTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
    for (var s in lab2)
    for (var i = 0; i < lab2[s].length; i++)
        {
        if(lab2[s][i] == "#")
            {
            mvPushMatrix();
            mat4.translate(mvMatrix, [i*2, s*2, 0.0]);
            //mat4.rotate(mvMatrix, Math.PI/2, [0, 1, 0]);
                
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
            setMatrixUniforms();
            gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

            mvPopMatrix();
            }
        }
    }

    
function drawScene()
    {
    if (jump) { zpos+=zsp; zsp-=0.01; }
    if(zpos < 0) { zpos = 0; jump = false; zsp = 0; }
    xsp=0; ysp=0;
    if (keys.W)
        {
        xsp=-0.1*Math.sin(rotz);
        ysp=-0.1*Math.cos(rotz);
        }
    if (keys.S)
        {
        xsp=0.1*Math.sin(rotz);
        ysp=0.1*Math.cos(rotz);
        }
    if (keys.A)
        {
        xsp-=0.1*Math.sin(rotz+Math.PI/2);
        ysp-=0.1*Math.cos(rotz+Math.PI/2);
        }
    if (keys.D)
        {
        xsp+=0.1*Math.sin(rotz+Math.PI/2);
        ysp+=0.1*Math.cos(rotz+Math.PI/2);
        }        
    var deltax = 0.2;
    var deltay = 0.2;
    if(xsp < 0) { deltax=-0.2; }
    if(ysp < 0) { deltay=-0.2; }
    var pos2 = torelcoords(xpos+xsp+deltax, ypos);
    if(lab2[pos2.y] && lab2[pos2.y][pos2.x] && lab2[pos2.y][pos2.x] != "#")
        xpos += xsp;
    pos2 = torelcoords(xpos, ypos+ysp+deltay);
    if(lab2[pos2.y] && lab2[pos2.y][pos2.x] && lab2[pos2.y][pos2.x] != "#")
        ypos += ysp;
    pos2 = torelcoords(xpos, ypos);
    if(lab2[pos2.y] && lab2[pos2.y][pos2.x] && lab2[pos2.y][pos2.x] == "F") { newlab(); }
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    angle+=0.02;
    mat4.translate(mvMatrix, [0.0, 0.0, -0.0]);
    
    mat4.rotate(mvMatrix, Math.PI/2, [1, 0, 0]);
        
    mat4.rotate(mvMatrix, rotx, [1, 0, 0]);
    mat4.rotate(mvMatrix, roty, [0, 1, 0]);
    mat4.rotate(mvMatrix, rotz, [0, 0, 1]);
    mat4.translate(mvMatrix, [-xpos, -ypos, zpos]);
    //mat4.rotate(mvMatrix, Math.PI/2, [0, 1, 0]);
    //mat4.rotate(mvMatrix, angle/2, [0.2, 0.5, 1]);
    //mat4.translate(mvMatrix, [-lab2.length, -lab2.length, 0.0]);
    

    drawLabirynth();
        
    requestAnimationFrame(drawScene);
    }

function webGLStart()
    {
    var canvas = document.getElementById("lesson01-canvas");
    canvas.requestPointerLock = canvas.requestPointerLock ||
                                canvas.mozRequestPointerLock ||
                                canvas.webkitRequestPointerLock;
    document.exitPointerLock =   document.exitPointerLock ||
                                      document.mozExitPointerLock ||
                                      document.webkitExitPointerLock;
    canvas.requestPointerLock();
    var isLocked = function()
        {
        return  canvas === document.pointerLockElement ||
                canvas === document.mozPointerLockElement ||
                canvas === document.webkitPointerLockElement;
        }

    canvas.addEventListener('click', function()
        {
        if(!isLocked()) { canvas.requestPointerLock(); }
        else            { document.exitPointerLock();  }
        }, false);
    canvas.onmousemove=function(e)
        {
        rotz-=e.movementX/400;
        if(rotx+e.movementY/400 < Math.PI/4 && rotx+e.movementY/400 > -Math.PI/4)
            rotx+=e.movementY/400;
        
        }
    window.onkeydown=function(e)
        {
        var sym = e.keyCode;
        if(sym === 87) { keys.W = true; }
        if(sym === 83) { keys.S = true; }
        if(sym === 65) { keys.A = true; }
        if(sym === 68) { keys.D = true; }
        if(sym === 32) // SPACE
            {
            if(!jump) { jump = true; zsp = 0.2; }
            }
        }
    window.onkeyup=function(e)
        {
        var sym = e.keyCode;
        if(sym === 87) { keys.W = false; }
        if(sym === 83) { keys.S = false; }
        if(sym === 65) { keys.A = false; }
        if(sym === 68) { keys.D = false; }
        }
    initGL(canvas);
    initShaders();
    initBuffers();
    initTexture();
        
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    drawScene();
    }
