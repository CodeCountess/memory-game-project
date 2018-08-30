
const theDeck= document.querySelector('.deck');
let symbols= ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb",
			  "fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

let openedCards= [];

function makeDeck(array){
	shuffle(array);
	//create reference to the UL
	var list= document.querySelector('.deck');

	for(var i=0; i< array.length; i++){
		//create list and icon elements
		var item= document.createElement('li');
		var icon= document.createElement('i');
		//nesting icons inside cards
		item.appendChild(icon);
		//add it to the list
		list.appendChild(item);
		//add in the classes
		item.setAttribute('class','card');
		item.setAttribute('data-card',(array[i]));
		icon.setAttribute('class',(array[i]));
		icon.classList.add('fa');
	}
	//finally, return the constructed list
	return list;
}
//call it using the symbols array!
makeDeck(symbols);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function cardClick(evt){
	$( event.target ).toggleClass("open").toggleClass("show");
	openedCards.push($( event.target ));
	console.log(openedCards);
}

theDeck.addEventListener('click', cardClick);


