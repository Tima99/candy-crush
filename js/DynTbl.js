
function generate_table(rows = 2, cols = null) {
  // if one args than make table square {cols == rows}
  cols = cols == null ? rows : cols;

  // get the reference for the gameScreen
  let gameScreen = document.getElementById("game-screen");

  // creates a <table> element and a <tbody> element
  let table = document.createElement("table");
  let tableBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < rows; i++) {
    // creates a table row
    let row = document.createElement("tr");
    row.classList.add("rows");

    for (let j = 0; j < cols; j++) {
      // Create a <td> element ,
      //  put the <td> at the end of the table row
      let cell = document.createElement("td");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      cell.setAttribute("candy" , -1)
      row.appendChild(cell);

    }

    // add the row to the end of the table gameScreen
    tableBody.appendChild(row);
    tableBody.setAttribute('id' , 'tbody')
  }

  // put the <tbody> in the <table>
  table.appendChild(tableBody);
  // appends <table> into <gameScreen>
  gameScreen.appendChild(table);
  // sets the border attribute of table to 2;
  table.setAttribute("border", "1");

  // add listener to table

  // styling to table done
  // using css table tag
  return table;
}

export default generate_table;
