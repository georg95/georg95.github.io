function zeroArray(n)
  {
  return Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
  }
function assert(testcase, result, accur)
  {
  if(!accur)
    {
    testcase = JSON.stringify(testcase);
    result = JSON.stringify(result);
    }
  if((accur && Math.abs(testcase - result) > accur) || (!accur && testcase !== result))
    {
    console.error('assertion failed, expected ',result, ', given ', testcase);
    }

  }
  function sqr(x) { return x*x; }
  function rosenbrock(vert)
    {
    var x = vert[0],
        y = vert[1];
    return 100*sqr(y-sqr(x))+sqr(1-x);
    }
  function himmelblau(vert)
    {
    var x = vert[0],
        y = vert[1];
    return sqr(sqr(x)+y-11)+sqr(x+sqr(y)-7);
    }
function caclulate()
  {
  document.getElementById("answer").innerHTML = "";
  var edge = 4;
  var simplex = getInitialSimplex([0,0], edge);
  testSimplex(simplex, edge);
  var resultPoint1 = NMA(simplex, rosenbrock, 0.001);
  var resultPoint2 = NMA([[-2,-0.5],[-4,2.5],[-5,4.5]], himmelblau, 0.001);
  console.log("point1:",JSON.stringify(resultPoint1));
  console.log("point2:",JSON.stringify(resultPoint2));
  }
function getDistance(vert1, vert2)
  {
  var diff = vert1.map(function(v, coordinate)
    { return vert1[coordinate]-vert2[coordinate]; });
  return Math.sqrt(diff.reduce(function(sum, ndiff) { return sum + ndiff*ndiff; }, 0));
  }
function testSimplex(simplex, edge)
  {
  for (var verticle1 of simplex)
    {
    for (var verticle2 of simplex)
      {
      if (verticle1 === verticle2) { continue; }
      assert(getDistance(verticle1, verticle2), edge, 0.0001)
      }
    }
  }

function drawLine(ctx,x1,y1,x2,y2)
  {
  var scale = 100;
  var diffx = 400;
  var diffy = -100;
  ctx.moveTo(x1*scale+diffx,y1*scale+diffy);
  ctx.lineTo(x2*scale+diffx,y2*scale+diffy);
  }

function drawPoints(points, ctx)
  {
  ctx.strokeStyle="#FFFFFF";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for(point1 of points)
    {
    for(point2 of points)
      {
      if(point1 === point2) { continue; }
      var p1 = point1.verticle, p2 = point2.verticle;
      drawLine(ctx, p1[0], p1[1], p2[0], p2[1]);
      }
    }
  ctx.stroke();
  }

function drawCanvas()
  {
  var canvas = document.getElementById("canv");
  var ctx    = canvas.getContext('2d');
  ctx.fillStyle="#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle="#FFFFFF";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 200);
	ctx.lineTo(400, 200);
	ctx.moveTo(200, 0);
  ctx.lineTo(200, 400);
	ctx.stroke();
  return ctx;
  }

function getInitialSimplex(x0, edge)
  {
  var n = x0.length;
  var verticles = n+1;
  var d1 = edge*(Math.sqrt(n+1) - 1    ) / (n*Math.sqrt(2)),
      d2 = edge*(Math.sqrt(n+1) - 1 + n) / (n*Math.sqrt(2));
  var simplex = [];
  function getSimplexVertice(verticle)
    {
    return zeroArray(n).map(function(v, coordinate)
      {
      return x0[coordinate] + (verticle !== coordinate ? d1 : d2);
      });
    }
  for(var verticle = 0; verticle < verticles; verticle++)
    {
    simplex[verticle] = getSimplexVertice(verticle);
    }
  simplex[verticles-1] = x0.slice();
  return simplex;
  }

function sortPoints(points)
  {
  points.sort(function(pt1,pt2) { return pt1.fvalue-pt2.fvalue; });
  }

function addCoordinates(sum, verticle)
  {
  for (var i = 0; i < sum.length; i++)
    {
    sum[i] += verticle[i];
    }
  }

function getCenter(points)
  {
  var xCenter = zeroArray(points[0].verticle.length);
  for(point of points)
    {
    addCoordinates(xCenter, point.verticle);
    }
  return xCenter.map(function(coord) { return coord / points.length });
  }

function getAccuracy(points)
  {
  var center = getCenter(points);
  var totalDist = 0;
  for(point of points)
    {
    totalDist += getDistance(point.verticle, center);
    }
  //console.log("totalDist:",totalDist);
  return totalDist/points.length;
  }

function NMA(simplex, func, eps, reflection=1.0, compression=0.5, extension=2.0)
  {
  var ctx = drawCanvas();
  var points = simplex.map(function(verticle, index)
    {
    return { fvalue: func(verticle), 'verticle':verticle };
    });
  //console.log(JSON.stringify(points));
  while(getAccuracy(points) > eps)
    {
    replacePointAndShrink(points, func, reflection, compression, extension);
    drawPoints(points, ctx);
    }
  return points[0];
  }

function replacePointAndShrink(points, func, reflection, compression, extension)
  {
  sortPoints(points);
  //console.log(JSON.stringify(points));
  var N = points.length-1;
  var xMax1 = points[N],
      xMin  = points[0],
      xCenter = getCenter(points.slice(0,-1));
  //console.dir(xCenter);
  var reflectPoint = getReflectPoint(xMax1.verticle, xCenter, reflection, func);
  if(reflectPoint.fvalue < xMin.fvalue)
    {
    tryExtend(points, extension, xCenter, reflectPoint, func);
    }
  else
    {
    var optimal = replacePointsOptimal(points, reflectPoint);
    if (!optimal) { simplexCompress(points, compression, xCenter, func); }
    }
  }

function getReflectPoint(xOldPoint, xCenter, reflectCoef, func)
  {
  var newPoint = { verticle: [] };
  for(var i = 0; i < xCenter.length; i++)
    {
    newPoint.verticle[i] = xCenter[i]*(1+reflectCoef)-
                         xOldPoint[i]*reflectCoef;
    }
  newPoint.fvalue = func(newPoint.verticle);
  return newPoint;
  }

function replacePointsOptimal(points, reflectPoint)
  {
  var N = points.length-1;
  var xMax1 = points[N],
      xMax2 = points[N-1];
  if(reflectPoint.fvalue < xMax2.fvalue)
    {
    points[N] = reflectPoint;
    return true;
    }
  if(reflectPoint.fvalue < xMax1.fvalue)
    {
    swapPoints(xMax1, reflectPoint);
    }
  return false;
  }


function tryExtend(points, extension, xCenter, reflectPoint, func)
  {
  var N = points.length-1;
  var xMin = points[0];
  var extendedPoint = getReflectPoint(reflectPoint.verticle, xCenter, -extension, func);

  points[N] = (extendedPoint.fvalue < xMin.fvalue) ? extendedPoint : reflectPoint;
  }

function swapPoints(pointA, pointB)
  {
  [pointA.verticle, pointB.verticle] = [pointB.verticle, pointA.verticle];
  [pointA.fvalue, pointB.fvalue]     = [pointB.fvalue, pointA.fvalue];
  }



function simplexCompress(points, compression, xCenter, func)
  {
  var N = points.length-1;
  var xMax1 = points[N],
      xMax2 = points[N-1];
  var comressedPoint = getReflectPoint(xCenter, xMax1.verticle, -compression, func);
  if(comressedPoint.fvalue < xMax1.fvalue)
    {
    swapPoints(xMax1, comressedPoint);
    }
  else
    {
    globalCompress(points, compression);
    }
  }

function globalCompress(points, compression)
  {
  var xMin = points[0],
      xMax = points[points.length-1];
  for (var point of points)
    {
    shrinkPointTo(point, xMin, compression);
    }
  }
function shrinkPointTo(point, toPoint, compression)
  {
  for(var i = 0; i < point.verticle.length; i++)
    {
    point.verticle[i] = toPoint.verticle[i]+
                        (point.verticle[i]-toPoint.verticle[i])*compression;
    }
  }

function fillValues(points, func)
  {
  for(point of points)
    {
    point.fvalue = func(point.verticle);
    }
  }

function tests()
  {
  var ptA = { verticle: [2,-7] };
  var ptB = { verticle: [1,4] };
  var ptC = { verticle: [2,4] };
  var points = [ptA, ptB, ptC];
  fillValues(points, function(vert) { return sqr(vert[0])+sqr(vert[1]); });
  assert(ptA,{verticle: [2,-7], fvalue: 53});
  assert(ptB,{verticle: [1,4], fvalue: 17});
  assert(ptC,{verticle: [2,4], fvalue: 20});

  sortPoints(points);
  assert(points, [ptB, ptC, ptA]);
  assert(getReflectPoint([10,-10], [0,0], 2, function() { return 5; }),
                         {verticle: [-20,20], fvalue: 5})
  assert(getCenter([{verticle: [10, 10]},{verticle: [20, 10]}]), [15,10]);
  var ptX = {verticle: [20,15], fvalue: 5};
  shrinkPointTo(ptX, {verticle: [0,5], fvalue: 5}, 0.5);
  assert(ptX, {verticle: [10,10], fvalue: 5});
  }
tests();
