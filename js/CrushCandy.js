import { drop_effect, move_candies } from "./DropEffect.js";

let maxRow; // ends from which points candies have to drop
let minRow;
function crush_candy(crushCandies, table) {
  minRow = maxRow = null;
  // debugger
  let len = crushCandies.length;

  const cc = crushCandies;
  
  while (len--) {
    let cell = get_cell(cc[len][0], cc[len][1]);
    if (maxRow == null || maxRow < cc[len][0]) maxRow = cc[len][0];
    if (minRow == null || minRow > cc[len][0]) minRow = cc[len][0];

    cell.innerText = ""; // crush candy - disappear
    totalpoints ++; // every crush inc points by 1
    points++; // used for tag lines show 
    cell.setAttribute("candy", -1);
  }

  const [rows, cols] = [table.rows.length, table.rows[0].cells.length];

  minRow = minRow ? minRow - 1 : minRow;

  // console.log("Crush Candy Module");

  // clearInterval(moveCandies)
  drop_effect(maxRow + 1, cols, minRow); // rows provides ending and cols provides ele in a rows for swap
}

export default crush_candy;
