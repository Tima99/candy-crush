/*  Matching Condition :
        3 or more candies matches in a row horizontally or vertically for crush.
    Below fn returns true if condition met or false otherwise.
*/

let candiesMatchHorizontal = [];
let candiesMatchVertical = [];

export function is_candies_match(swipeCandy, table) {

  let candy1 = swipeCandy; // we obtain two candies from swipe - candy1 is on focus
  let [cols, rows] = [table.rows[0].cells.length, table.rows.length];
  let [c1col, c1row] = [
    Math.floor(candy1.getAttribute("data-col")),
    Math.floor(candy1.getAttribute("data-row")),
  ];

  crush_right(cols, c1row, candy1);

  crush_down(rows, c1col, candy1);

  if (candiesMatchVertical.length < 3) candiesMatchVertical.length = 0;
  if (candiesMatchHorizontal.length < 3) candiesMatchHorizontal.length = 0;

  // return values
  if (candiesMatchVertical.length >= 3 || candiesMatchHorizontal.length >= 3) {
    // merge array with no duplicates
    let crushCandies = candiesMatchVertical.concat(candiesMatchHorizontal);
    return crushCandies;
  }

  return false;
}

export function crush_right(cols, c1row, candy1) {
  candiesMatchHorizontal.length = 0;

  // horizontal --->
  let moveRight = -1;
  while (moveRight < cols - 1) {
    moveRight++;
    let nextCell = get_cell(c1row, moveRight);
    let nextCandy = nextCell.innerText;

    if (nextCandy == candy1.innerText || nextCandy == candy1) {
      // debugger;
      candiesMatchHorizontal.push([c1row, moveRight]);
      //   console.log(candiesMatchHorizontal);
    } else {
      if (candiesMatchHorizontal.length >= 3) break;
      else candiesMatchHorizontal.length = 0;
    }
  }
  if (candiesMatchHorizontal.length < 3) return false;

  return candiesMatchHorizontal;
}

export function crush_down(rows, c1col, candy1) {
  candiesMatchVertical.length = 0;

  // Vertical --->

  let moveDown = -1;
  while (moveDown < rows - 1) {
    moveDown++;
    let nextCell = get_cell(moveDown, c1col);
    let nextCandy = nextCell.innerText;
    if (nextCandy == candy1.innerText || nextCandy == candy1)
      candiesMatchVertical.push([moveDown, c1col]);
    else {
      if (candiesMatchVertical.length >= 3) break;
      else candiesMatchVertical.length = 0;
    }
  }

  if (candiesMatchVertical.length < 3) return false;

  return candiesMatchVertical;
}
