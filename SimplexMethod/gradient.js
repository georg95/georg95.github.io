var gradient = (function () {
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
function getGradient(func, x, delta)
  {
  var f0 = func(x);
  return x.map(function(coord, i)
    {
    x[i] += delta;
    var gradCoord = (func(x)-f0)/delta;
    x[i] -= delta;
    return gradCoord;
    });
  }
function getNextX(x, grad, lambda)
  {
  return x.map((coord, i) => coord-lambda*grad[i]);
  }
function sqr(x) { return x*x; }
function getDelta(x1,x2)
  {
  return Math.sqrt(x1.reduce((sum,v,i) => sqr(x1[i]-x2[i])+sum, 0))
  }
function getLength(vector)
  {
  var len = Math.sqrt(vector.reduce((sum,coord) => sum+sqr(coord),0));
  //console.log("len = ",len);
  return len;
  }
function findMinimum(func, x0, eps)
  {
  var x_cur = x0;
  var deltaX = 1;
  var lambda = 0.01;
  for(var i = 0; i < 1000; i++)
    {
    //console.log(JSON.stringify(x_cur));
    var grad = getGradient(func, x_cur, Math.min(deltaX,0.001));
    var x_next = getNextX(x_cur, grad, lambda);
    var deltaX = getDelta(x_cur, x_next);
    if (func(x_next) > func(x_cur)) { lambda/=2; }
    if (getLength(grad) < eps) {return x_next;}
    x_cur = x_next;
    }
  return null;
  }

//console.log(JSON.stringify(getDelta([0,0], [3,4])));
return {
  rosenbrock: rosenbrock,
  himmelblau: himmelblau,
  findMinimum: findMinimum,
  };
})();
function printResult(pt,func)
  {
  if(!pt) { console.log("solution not found"); return }
  console.log(JSON.stringify(pt));
  console.log(JSON.stringify(func(pt)));
  }
var pt1 = gradient.findMinimum(gradient.rosenbrock, [0,0], 0.01);
var pt2 = gradient.findMinimum(gradient.himmelblau, [4,4], 0.01);
printResult(pt1, gradient.rosenbrock);
printResult(pt2, gradient.himmelblau);
