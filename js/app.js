
const theDeck= document.querySelector('.deck');
const eachCard= document.querySelectorAll('.card');
let symbols= ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb",
			  "fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

let openCards= [];
let matchedCards= [];

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
	//displayCardSymbol();
	openCardChecker();
}

theDeck.addEventListener('click', cardClick);

function displayCardSymbol(){
	$( event.target ).toggleClass("open").toggleClass("show");
}

function openCardChecker(){
	let userClick= event.target;

	if(userClick.classList.contains('open') && userClick.classList.contains('show') ){
		console.log("You already clicked it!");

	} else{ //now you can flip the card
			 displayCardSymbol();
			//add it to the array
			openCards.unshift(userClick);
			//now its ready to be compared- next filter
			if(openCards.length==2){
			//once its in there- make sure only 2
			openCards.length=2;
		 		if(openCards[0].dataset.card == openCards[1].dataset.card){
					console.log("Matchmaker Matchmaker make me a match!");
					//lockOpenMatch();
			 		}else{
			 		console.log("better luck next time darlin!");
			 		//then empty the array, for the next pair
			 		openCards= [];
			 		//hideNonMatch();
						}
				} 
					
		 } 
}
	


	


