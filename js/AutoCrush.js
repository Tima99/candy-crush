import { is_candies_match, crush_right, crush_down } from "./MatchQuery.js";
import crush_candy from "./CrushCandy.js";
import show_quotes from "./Quotes.js";

let autoCrushCandies = [];

function auto_crush() {
  autoCrushCandies.length = 0;
  const table = document.querySelector("table");
  const [rows, cols] = [table.rows.length, table.rows[0].cells.length];

  for (let r = 0; r < rows; r++)
    // for (let c = 0; c < cols; c++)
    for (let candy = 0; candy < candyCount; candy++) {
      let crushedCandies = crush_right(cols, r, candy);
      // cols is length of total columns
      // r is in which row we want to auto crush candy check
      // c is candy type or index i.e, 0 , 1 , 2 , 3 .. candyCount variable
      //   console.log(crushedCandies);
      if (crushedCandies || crushedCandies.length) {
        // console.log(crushedCandies + ' Crushred');
        let count = crushedCandies.length;
        while (count--) autoCrushCandies.push(crushedCandies[count]);
      }
    }

  for (let c = 0; c < cols; c++)
    for (let candy = 0; candy < candyCount; candy++) {
      let crushedCandies = crush_down(rows, c, candy); // c is candyIndx

      let count = crushedCandies.length;
      while (count--)
        if (!autoCrushCandies.includes(crushedCandies[count]))
          autoCrushCandies.push(crushedCandies[count]);
    }
  //   console.log("Auto Crush Module");
  //   debugger;
  if (autoCrushCandies.length) {
    // console.log("running auto crush length " + autoCrushCandies.length);
    crush_candy(autoCrushCandies, document.querySelector("table"));
  } 
  else {
    show_quotes(totalpoints);
    totalpoints =0;
  }
}

export default auto_crush;
