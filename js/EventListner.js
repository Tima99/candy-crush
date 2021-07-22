import { is_candies_match } from "./MatchQuery.js";
import crush_candy from "./CrushCandy.js";

let targetCandies = [];
let isMouseDown = false;

const crushDelay = 50;
const reverseCandyDelay = 280;

let swipe = null;

function add_listeners(table) {
  table.addEventListener("mouseover", function (e) {
    on_move(e);
  });

  table.addEventListener("mousedown", function (e) {
    on_down(e);
  });

  table.addEventListener("mouseup", function(){on_remove(this)});

  /** Listener for Touch Devices */
  let touchX, touchY;
  table.addEventListener("touchstart", function (e) {
    // on_down(e);
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    targetCandies.length = 0;
    on_down(e);
    window.addEventListener("scroll" , no_scroll)
    e.preventDefault()
  });

  table.addEventListener("touchend", function (e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    if (Math.abs(touchX - endX) > 20) {
      if (touchX - endX < 0) swipe = "R";
      else swipe = "L";
    } else {
      if (touchY - endY < 0) swipe = "D";
      else swipe = "U";
    }
    // console.log(targetCandies);
    let cell = swipe_with_candy(swipe , this);

    if (cell) 
      targetCandies.push(cell);

    on_remove(this)
    window.addEventListener("scroll" , no_scroll)
    e.preventDefault()
  });
}

function swipe_candies(targetCandies) {
  let temp = targetCandies[0].innerText;
  targetCandies[0].innerText = targetCandies[1].innerText;
  targetCandies[0].setAttribute("candy", targetCandies[1].innerText);
  targetCandies[1].innerText = temp;
  targetCandies[1].setAttribute("candy", temp);
}

// *disable scrolling when event occur on table
function no_scroll(){
  window.scroll(0, 0)
}

// *touch devices
function swipe_with_candy(dirSwipe , table) { // return cell of touch end if found else return null
  let [candyTouchX, candyTouchY] = [
    Math.floor(targetCandies[0].getAttribute("data-row")),
    Math.floor(targetCandies[0].getAttribute("data-col")),
  ];
  if (dirSwipe == "R")      candyTouchY++;
  else if (dirSwipe == "L") candyTouchY--;
  else if (dirSwipe == "U") candyTouchX--;
  else if (dirSwipe == "D") candyTouchX++;
  else return null;

  if(candyTouchX < table.rows.length &&
    candyTouchY  <  table.rows[0].cells.length &&
    candyTouchY > -1 &&
    candyTouchX > -1)
    return table.rows[candyTouchX].cells[candyTouchY]
  
  return null
}


// *FUNCTION CALLS ON LISTENER mouse events

function on_move(e) {
  let cell = e.target;

  if (targetCandies.length > 1) return;
  // when mouse down push more than 1 but less than 3 means 2 ele , if greater than 1 returns

  if (!targetCandies.includes(e.target)) {
    if (!isMouseDown) targetCandies.length = 0; // if not mouse down length 0 so whenever pushing only single current td
    targetCandies.push(cell);
  }
}

function on_down(e) {
  isMouseDown = true;
  if (targetCandies.length == 0) targetCandies.push(e.target); // after mouse up push target candy, if mousedown again, without mouse over
}

function on_remove(_table) {
  isMouseDown = false;
  if (targetCandies.length < 2) return; // if user select less than 2 candies return without swipe

  // swipe candies
  swipe_candies(targetCandies);

  // console.log(_table);
  // we now checked is swipe candies match
  let crushCandies = is_candies_match(targetCandies[0], _table);
  let crushCandies2 = is_candies_match(targetCandies[1] , _table);
  if (crushCandies.length || crushCandies2.length) {
    let table = _table;
    setTimeout(function () {
      crush_candy(crushCandies, table);
    }, crushDelay);
  }
  else {
    let swipeCancel = [...targetCandies];
    setTimeout(function () {
      swipe_candies(swipeCancel);
    }, reverseCandyDelay);
  }

  targetCandies.length = 0;
}
export default add_listeners;
