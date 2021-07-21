
function put_candies(r , c){
    let tbl = document.querySelector('table')

    while(c--)
        if(tbl.rows[r].cells[c].innerText == '') // put candies if place is empty
        {
            let candy = rand(candyCount)
            tbl.rows[r].cells[c].innerText = candy 
            tbl.rows[r].cells[c].setAttribute('candy' , candy)
        }
}

export default put_candies;