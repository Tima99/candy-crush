
const quotes = [
    'Tasty',
    'Yummy',
    'Delicious',
    'Wonderful',
    'Hotter',
    'Dramatic',
    'Impressive',
    'Flavorful',
    'Viral',
    'Striking',
    'Heat Up',
    'Over-Crush',

]

const quoteFlyTime = 1000;

 let quoteContainer = document.querySelector('.quotes-container')

function create_quote(quote){
//    let quoteContainer = document.querySelector('.quotes-container')
            
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
    // console.log(pts , quotes.length);
    if(pts > quotes.length - 1)
        create_quote(quotes[quotes.length - rand(6 , 1)])
    else if (pts > 3)
        create_quote(quotes[pts - 4])
    totalpoints =0;
}

export default show_quotes;
