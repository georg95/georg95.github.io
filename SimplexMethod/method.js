function zeroArray(n)
  {
  return Array.apply(null, Array(n)).map(Number.prototype.valueOf,0);
  }
function assert(testcase, result, accur)
  {
  if(Math.abs(testcase - result) > accur)
    {
    console.error('assertion failed, expected ',result, ', given ', testcase);
    }
  }
  function sqr(x) { return x*x; }
  function testfunc(vert)
    {
    var x = vert[0],
        y = vert[1];
    return 100*sqr(y-sqr(x))+sqr(1-x);
    }
function caclulate()
  {
  document.getElementById("answer").innerHTML = "";
  var edge = 2;
  var simplex = getInitialSimplex([0,0], 2);
  testSimplex(simplex, 2);

  NMA(/*simplex*/[[10,9],[10,-2],[21,1]], testfunc);
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

function NMA(simplex, func, reflection=1.0, compression=0.5, extension=2.0)
  {
  var points = simplex.map(function(verticle, index)
    {
    return { fvalue: func(verticle), 'verticle':verticle };
    });
  console.log(JSON.stringify(points));
  for(var i = 0; i < 50; i++)
    {
    replacePointAndShrink(points, func, reflection, compression, extension);
    console.log(JSON.stringify(points));
    }
  }

function replacePointAndShrink(points, func, reflection, compression, extension)
  {
  sortPoints(points);
  var N = points.length-1;
  var xMax1 = points[N],
      xMin  = points[0],
      xCenter = getCenter(points.slice(0,-1));
  console.dir(xCenter);
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

function tryExtend(points, extension, xCenter, reflectPoint, func)
  {
  var N = points.length-1;
  var xMin = points[0];
  var extendedPoint = getReflectPoint(reflectPoint.verticle, xCenter, -extension, func);

  points[N] = (extendedPoint.fvalue < xMin.fvalue) ? extendedPoint : reflectPoint;
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
    [points[N], reflectPoint] = [reflectPoint, points[N]];
    }
  return false;
  }

function simplexCompress(points, compression, xCenter, func)
  {
  var N = points.length-1;
  var xMax1 = points[N],
      xMax2 = points[N-1];
  var comressedPoint = getReflectPoint(xCenter, xMax1.verticle, compression, func);
  if(comressedPoint.fvalue < xMax1.fvalue)
    {
    [points[N], comressedPoint] = [comressedPoint, points[N]];
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
