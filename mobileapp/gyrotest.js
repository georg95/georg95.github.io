    var initialX = null;
    var initialY = null;
    var alpha=0, gamma=0;
    var x=0,y=0,z=0;
    var ua = navigator.userAgent.toLowerCase();
    var issafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS');
    var gyrocoords = document.getElementById('gyrocoords');
    var accelcoords = document.getElementById('accelcoords');
    var appinfo = document.getElementById('appinfo');
    function handleOrientationEvent(event)
    	{
        var x = event.beta ? event.beta : event.y * 90;
        var y = event.gamma ? event.gamma : event.x * 90;
        alpha = x;
        gamma = y;
        if (!initialX && !initialY)
        	{
            initialX = x;
            initialY = y;
        	}
        else
        	{
            //gyrocoords.innerHTML  = 'Gyroscope: x='+x.toFixed(1)+'; ';
            //gyrocoords.innerHTML += 'y='+y.toFixed(1);
        	}
    	}

    function handleMotionEvent(event)
    	{
    	var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
    	}
    function isEventFired()
    	{
        if (!initialX && !initialY)
        	{
            var warningElement = document.getElementById('warning');
            //warningElement.innerHTML = 'Warning: Cannot receive device orientation events, this browser is not supported.';
        	}
    	}

    //window.addEventListener("MozOrientation",    handleOrientationEvent, true);
    //window.addEventListener("deviceorientation", handleOrientationEvent, true);
    window.addEventListener("devicemotion", handleMotionEvent, true);

    setTimeout(isEventFired, 1000);
function enterFullscreen(e) {

	if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
		RunPrefixMethod(document, "CancelFullScreen");
	}
	else {
		RunPrefixMethod(document.documentElement, "RequestFullScreen");
	}

}

var pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method) {
	
	var p = 0, m, t;
	while (p < pfx.length && !obj[m]) {
		m = method;
		if (pfx[p] == "") {
			m = m.substr(0,1).toLowerCase() + m.substr(1);
		}
		m = pfx[p] + m;
		t = typeof obj[m];
		if (t != "undefined") {
			pfx = [pfx[p]];
			return (t == "function" ? obj[m]() : obj[m]);
		}
		p++;
	}

}
function LockFullscreen(e)
	{
	document.body.ontouchstart="";
		try {
		document.getElementById("fullscreenadvice").innerHTML="";
		enterFullscreen();
		screen.orientation.lock("portrait-primary");
	  	}
	  catch(e) { alert("Cannot lock"); }
	}
if (typeof document.body.ontouchstart === "undefined") { alert("Touch not supported"); }
document.body.ontouchstart=LockFullscreen;
var sphere = document.getElementById("sphere");
var sx = 150;
var sy = 150;
var r = 35;
var vx = 3;
var vy = -2;
var vcoef = 0.8;
var gcoef = 0.2;
var yaxis = 1;
var xaxis = -1;
var switchaxis = false;
var surfacecoef = 0.95;
if (issafari) { ReverseY(); }

function switchax()
	{
	switchaxis = !switchaxis;
	}

function ReverseX()
	{
	xaxis = -xaxis;
	}

function ReverseY()
	{
	yaxis = -yaxis;
	}

function UpdateCoords()
	{
	sphere.style.left = sx+"px";
	sphere.style.top = sy+"px";
	if (switchaxis)
		{
		vx+=y*gcoef*xaxis;
		vy+=x*gcoef*yaxis;
		}
	else
		{
		vx+=x*gcoef*xaxis;
		vy+=y*gcoef*yaxis;
		}
	vx*=surfacecoef;
	vy*=surfacecoef;
	sx+=vx;
	sy+=vy;
	if(sx > document.body.clientWidth-2*r) { vx=-vx*vcoef; sx=document.body.clientWidth-2*r; }
	if(sy > document.body.clientHeight-2*r) { vy=-vy*vcoef; sy=document.body.clientHeight-2*r; }
	if(sx < 0) { vx=-vx*vcoef; sx = 0; }
	if(sy < 0) { vy=-vy*vcoef; sy = 0; }
	}

function ViewCoords()
	{
	accelcoords.innerHTML  = 'Motion: x='+x.toFixed(1)+'; ';
    accelcoords.innerHTML += 'y='+y.toFixed(1)+'; ';
    accelcoords.innerHTML += 'z='+z.toFixed(1);
	appinfo.innerHTML="Width: "+document.body.clientWidth+"; ";
	appinfo.innerHTML+="Height: "+document.body.clientHeight+"; ";
	appinfo.innerHTML+="<br>position: ("+sx.toFixed(1)+", "+sy.toFixed(1)+")";
	appinfo.innerHTML+="<br>velocity: ("+vx.toFixed(1)+", "+vy.toFixed(1)+")";
	appinfo.innerHTML+="<br>switchedAxis: "+switchaxis+"; ReverseX: "+xaxis+"; ReverseY: "+yaxis;
	}

setInterval(UpdateCoords, 20);
setInterval(ViewCoords, 200);
/*
document.getElementById("button").addEventListener("click", function() {
		try {
		enterFullscreen();
		screen.orientation.lock("portrait-primary");
	  	}
	  catch(e) { alert("Cannot lock"); }
 }, false);*/
