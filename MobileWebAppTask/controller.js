"use strict";
var white_roller = document.getElementById("white_roller");
var red_roller = document.getElementById("red_roller");
var pill = document.getElementById("pill");
var man = document.getElementById("man");
var last_red_number = 0;


function setMove(object, callback)
  {
  object.onmousemove = object.ontouchmove = callback;
  }
function setRelease(object, callback)
  {
  object.onmouseup = object.ontouchend = callback;
  }
function setPick(object, callback)
  {
  object.onmousedown = object.ontouchstart = callback;
  }




function setRedRollPosition(number, numbers_size)
  {
  if(last_red_number === number) { return; }
  last_red_number = number;
  red_roller.style.left = (number*numbers_size/(21-1))+"px";
  }

function setRollerPosition(new_position, max_shift, numbers_size)
  {
  new_position = Math.max(new_position, 0);
  new_position = Math.min(new_position, max_shift);

  var red_roll_pos_abs = new_position*(numbers_size/max_shift);
  var red_roll_num = Math.round(red_roll_pos_abs/numbers_size*(21-1));
  //console.log("num = "+red_roll_num);
  setRedRollPosition(red_roll_num, numbers_size);
  white_roller.style.left = new_position+"px";
  }

function releaseMoveAndUp()
  {
  var object = document.body;
  setRelease(object, null);
  setMove(object, null);
  return false;
  }

function rollerTake(e)
  {
  var finger_pos = getEventCoords(e);
  var touch_start = finger_pos[0];

  var current_position = Number(white_roller.style.left.slice(0,-2));
  var max_shift = document.getElementById("select_period").clientWidth -
                                              white_roller.clientWidth;
  var numbers_size = document.getElementById("numbers").clientWidth*0.98; // centering last[21] number

  var rollerMove = function (e)
    {
    finger_pos = getEventCoords(e);
    var touch_current = finger_pos[0];

    var new_position = current_position+(touch_current-touch_start);
    setRollerPosition(new_position, max_shift, numbers_size);
    };

  setMove(document.body, rollerMove);
  setRelease(document.body, releaseMoveAndUp);
  return false; // prevent default
  }





function pillPutInteract(x, y)
  {
  if(x > man.offsetLeft &&
      x < man.offsetLeft+man.clientWidth &&
      y > man.offsetTop &&
      y < man.offsetTop+man.clientHeight)
    {
    pill.style.display = "none";
    man.style.backgroundImage="url(Source/happy.png)";
    }
  pill.style.width="10%";
  }

function pillTake(e)
  {
  e = e || window.event;
  pill.style.width="15%";

  setMove(document.body, pillMove);
  setRelease(document.body, pillPut);

  return false; // prevent default
  }
function getEventCoords(e)
  {
  e = e || window.event;
  var x = e.pageX || e.clientX;
  var y = e.pageY || e.clientY;
  if(e.touches && e.touches[0])
    {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
    }
  return [x, y];
  }

var finger_x, finger_y; // cuz touchend dont give x,y coords

function pillMove(e)
  {
  var finger_pos = getEventCoords(e);
  finger_x = finger_pos[0];
  finger_y = finger_pos[1];

  pill.style.left = finger_x+"px";
  pill.style.top = finger_y+"px";
  return false;
  };
function pillPut(e)
  {
  pillPutInteract(finger_x, finger_y);
  releaseMoveAndUp();
  return false;
  };



setPick(pill, pillTake);
setPick(white_roller, rollerTake);



var images_to_preload = ["day-button.png", "day-pushed-button.png",
               "week-button.png", "week-pushed-button.png",
               "month-button.png", "month-pushed-button.png",
               "happy.png"];
function preloadImages(images)
  {
  var loaded = [];
  for(var image of images)
    {
    var curr_img = new Image();
    curr_img.src = "Source/"+image;
    loaded.push(curr_img);
    }
  return loaded;
  }
var preloaded = preloadImages(images_to_preload);
