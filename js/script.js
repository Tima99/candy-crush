
import generate_table from "./DynTbl.js";
import {drop_effect}   from "./DropEffect.js"
import add_listeners from "./EventListner.js";

let rows = 6, cols = 6;

// *Input Handler

const slider = document.querySelectorAll('input')

slider.forEach((slide)=>{
    slide.previousElementSibling.firstElementChild.innerHTML = slide.value;
})

slider.forEach( ( slide )=>{
    slide.addEventListener('change' , function(){
        this.previousElementSibling.firstElementChild.innerHTML = slide.value;

        if(slide.id == 'rows')
            rows = Math.floor(slide.value)
        else if(slide.id == 'cols')
            cols = Math.floor(slide.value)
        else
            candyCount = Math.floor(slide.value)
    })
})

const btn = document.getElementById('start')

btn.addEventListener('click' , function(){
    startGame(this)
})

function startGame(btn){
    document.body.removeChild(btn.parentElement.parentElement)

    let table = generate_table(rows , cols)

    drop_effect(rows , cols) // rows provides ending and cols provides ele in a rows for swap 


    add_listeners(table)

}

