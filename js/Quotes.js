
const quotes = [
    'Tasty',
    'Yummy Crush',
    'Delicious',
    'Wonderful',
    'Unbelievable Crush',
    'Eye Catching',
    'Bete Moj Kr Di',
    'Tasty Delicious'
]

const quoteFlyTime = 1000;

let quoteContainer = document.querySelector('.quotes-container')
function create_quote(quote){
            
    let quoteDiv = document.createElement('div')
    quoteDiv.style.animationDuration = quoteFlyTime;
    quoteDiv.classList.add('quote', 'fly')
    quoteDiv.innerHTML = quote
    quoteContainer.appendChild(quoteDiv)

    setTimeout(function(){
        quoteContainer.removeChild(quoteContainer.lastElementChild)
    }, quoteFlyTime)
}

function show_quotes(pts){
    // console.log(pts);
    if(pts > quotes.length - 1)
        create_quote(quotes[quotes.length - 1])
    else if (pts > 3)
        create_quote(quotes[pts - 4])
}

export default show_quotes;