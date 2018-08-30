
const theDeck= document.querySelector('.deck');
const eachCard= document.querySelectorAll('.card');
let symbols= ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb",
			  "fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

let openCards= [];

function makeDeck(array){
	shuffle(array);
	
	var list= document.querySelector('.deck');

	for(var i=0; i< array.length; i++){
		
		var item= document.createElement('li');
		var icon= document.createElement('i');
		
		item.appendChild(icon);
		list.appendChild(item);

		item.setAttribute('class','card');
		item.setAttribute('data-card',(array[i]));
		icon.setAttribute('class',(array[i]));
		icon.classList.add('fa');
	}
	
	return list;
}

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
	displayCardSymbol();
	openCardChecker();
}

theDeck.addEventListener('click', cardClick);

function displayCardSymbol(){
	$( event.target ).toggleClass("open").toggleClass("show");
}

function openCardChecker(){
	//adds cards to the array
	openCards.push(event.target);
	console.log(openCards[0].dataset.card);
}


