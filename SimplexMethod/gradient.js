var gradient = (function () {
function testfunc(x)
  {
  return x[0]*x[0]+x[1]*x[1];
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
var dt = 0.01;
function getNextX(x, grad, lambda)
  {
  return x.map((coord, i) => coord-lambda*grad[i]);
  }
function sqr(x) { return x*x; }
function getDelta(x1,x2)
  {
  return Math.sqrt(x1.reduce((sum,v,i) => sqr(x1[i]-x2[i])+sum, 0))
  }
function findMinimum(func, x0, eps)
  {
  var x_cur = x0;
  var deltaX = 1;
  var lambda = 0.01;
  var i = 0;
  while(deltaX > eps)
    {
    //console.log(JSON.stringify(x_cur));
    var grad = getGradient(func, x_cur, Math.min(deltaX,0.0001));
    var x_next = getNextX(x_cur, grad, lambda);
    var deltaX = getDelta(x_cur, x_next);
    if (func(x_next) > func(x_cur)) { lambda/=2; }
    x_cur = x_next;
    }

  return x_cur;
  }

//console.log(JSON.stringify(getDelta([0,0], [3,4])));
return {
  method: findMinimum,
  testfunc: testfunc,
  };
})();
