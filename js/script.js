import generate_table from "./DynTbl.js";
import { drop_effect } from "./DropEffect.js";
import add_listeners from "./EventListner.js";

var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

let rows = 6,
  cols = 6;

// *Input Handler

const slider = document.querySelectorAll("input");

slider.forEach((slide) => {
  slide.previousElementSibling.firstElementChild.innerHTML = slide.value;
  if (slide.id == "rows") rows = Math.floor(slide.value);
    else if (slide.id == "cols") cols = Math.floor(slide.value);
    else candyCount = Math.floor(slide.value);
});

slider.forEach((slide) => {
  slide.addEventListener("change", function () {
    this.previousElementSibling.firstElementChild.innerHTML = slide.value;

    if (slide.id == "rows") rows = Math.floor(slide.value);
    else if (slide.id == "cols") cols = Math.floor(slide.value);
    else candyCount = Math.floor(slide.value);
  });
});

const btn = document.getElementById("start");

btn.addEventListener("click", function () {
  startGame(this);
});

function startGame(btn) {
  document.body.removeChild(btn.parentElement.parentElement);
    // portrait
    if(width < height){
        let size;
        if(cols >= rows && cols < 8)
            size = 96 / cols - 4 + 'vw';
        else if(cols >= rows && cols < 12)
            size = 96 / cols - 1 + 'vw';
        else if( rows > cols)
            size = 96 / rows + 'vw';
        else
            size = 96 / cols + 'vw'
        td_size_set(size)
    }
    else{
        let size;
        if(cols > 10 || rows > 10)
            if(rows >= cols)
                size = 96 / rows + 'vh'
            else
                size = 96 / cols + 'vh'
        else
            size = '8vh'
        td_size_set_landscape(size)
    }

  let table = generate_table(rows, cols);

  drop_effect(rows, cols); // rows provides ending and cols provides ele in a rows for swap

  add_listeners(table);
}


let r = document.querySelector(":root");
// Create a function for setting a variable value
function td_size_set(value) {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty("--td-size", value);
}

function td_size_set_landscape(value) {
    // Set the value of variable --blue to another value (in this case "lightblue")
    r.style.setProperty("--td-size-win", value);
  }
