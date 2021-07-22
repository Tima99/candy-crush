import put_candies from "./PutCandies.js";
import auto_crush from "./AutoCrush.js";

let start = 0; // point where we left of
let row = start; // loop through row from where we left off
let moveCandies = null; // store setinterval
let drop_anim_speed = 150; // candies drop down time in ms

export function drop_effect(end, cells, startFrm = 0) {
  //   console.log("In drop effect fn");
  start = startFrm;

  put_candies(0, cells); // put candies on top of table e.g. at row 0

  // we need to down first row's item in second row
  // than put items on first empty row whose items are moved in second

  // than continues this cycle till our first row's items not reaches at end

  end--; // last row do not needs to move so end is substract by 1

  // console.log('Run Drpeftc');
  moveCandies = setInterval(function () {
    move_candies(end, cells);
  }, drop_anim_speed);
  // }
  // else
  // return ;
}

export function move_candies(end, cells, startRow = null) {
  row = startRow ? startRow : start;

  while (row > -1 && row < end ) {
    // debugger;
    for (let c = 0; c < cells; c++) {
      let firstItem = get_cell(row, c); // start = rows , c = cols
      let nextItem = get_cell(row + 1, c);

      // swap algo. use to move 1row's items to next
      let temp = firstItem.innerText;
      if (nextItem.innerText == "") {
        firstItem.innerText = "";
        nextItem.innerText = temp;
        nextItem.setAttribute("candy", temp);
      }
    }

    row--;
  }
  start++;
  row = start;
  put_candies(0, cells);

  if (start > end - 1) {
    clearInterval(moveCandies);
    // console.log('Clear done');
    auto_crush();
    return;
  }
}
