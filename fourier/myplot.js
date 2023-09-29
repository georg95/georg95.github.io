//-------------- fourier coefficients ----------------
function integral(f, a, b, parts)
    {
    var dx = (b-a)/parts;
    var sum = 0;
    for(var i = 0; i < parts; i++)
        {
        sum += f(a+(i+1/2)*dx)*dx;
        }
    return sum;
    }
    
function getAn(fnx, n, l, accuracy)
    {
    return 1/l*integral(
        function(x) {return fnx(x)*Math.cos(Math.PI*n*x/l);}, -l, l, accuracy);
    }
function getBn(fnx, n, l, accuracy)
    {
    return 1/l*integral(
        function(x) {return fnx(x)*Math.sin(Math.PI*n*x/l);}, -l, l, accuracy);
    }
function getA0(fnx, l, accuracy)
    {
    return 1/l*integral(fnx, -l, l, accuracy);
    }
//-------------- fourier coefficients ----------------

function CreateFourierSumN(fnx, n, l, accuracy)
    {
    var a0=getA0(fnx, l, accuracy);
    var a=new Array(n);
    var b=new Array(n);
    for(var i = 0; i < n; i++)
        {
        a[i]=getAn(fnx, i+1, l, accuracy);
        b[i]=getBn(fnx, i+1, l, accuracy);
        }
    return function(x)
        {
        var sum = a0/2;
        for(var i = 0; i < n; i++)
            {
            sum+=a[i]*Math.cos(Math.PI*(i+1)*x/l)+
                 b[i]*Math.sin(Math.PI*(i+1)*x/l);
            }
        return sum;
        }
    }



  function draw()
  {
  var accuracy = Number(document.getElementById('accuracy').value) || 100;
  var interval = Number(document.getElementById('interval').value) || Math.PI;
  var summands = Number(document.getElementById('summands').value) || 7;
    try {
      functionPlot({
        target: '#plot',
        yDomain: [-10, 10],
        xDomain: [-10, 10],
        data: [{
          fn: CreateFourierSumN(math.eval(document.getElementById('eq').value), summands, interval, accuracy)
        }]
      });
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }

  document.getElementById('form').onsubmit = function (event) {
    event.preventDefault();
    draw();
  };

  draw();
