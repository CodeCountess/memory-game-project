
const theDeck= document.querySelector('.deck');
const eachCard= document.querySelectorAll('.card');
const moveCounter= document.querySelector('.moves');
let moves= 0;
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
		userClick.classList.add("warning");
			function userWarning(){
				userClick.classList.remove("warning");
			}
			setTimeout(userWarning,200);

	} else{ //now you can flip the card
			 displayCardSymbol();
			//add it to the array
			openCards.unshift(userClick);
			//now its ready to be compared- next filter
			if(openCards.length==2){
			//once its in there- make sure only 2
			openCards.length=2;
		 		if(openCards[0].dataset.card == openCards[1].dataset.card){
					lockOpenMatch();
			 		}else{
			 		hideNonMatch();
						}
				} 
					
		 } 
}
	
function lockOpenMatch(){
	displayMoves();
	let card1= openCards.splice(1,1).pop();
	let card2= openCards.splice(0,1).pop();
	matchedCards.splice(0,0,card1);
	matchedCards.splice(0,0,card2);
	card1.classList.add("match");
	card2.classList.add("match");
	// console.log("Matchmaker Matchmaker make me a match!");
	//console.log(matchedCards);
	isWinner();
}

function hideNonMatch(){
	displayMoves();
	function clearClasses(){
		let card1= openCards.splice(1,1).pop();
		let card2= openCards.splice(0,1).pop();
		superToggle(card1,"open","show");
		superToggle(card2,"open","show");
	}
	setTimeout(clearClasses,600);

}

// superToggle function by GibboK from https://stackoverflow.com/questions/36544762/vanilla-javascript-is-there-a-way-to-toggle-multiple-css-classes-in-one-stateme
var superToggle = function(element, class0, class1) {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
}
//superToggle(card,"open", "show");

function displayMoves(){
	moves+=1; 
	moveCounter.innerHTML =moves;
}

function isWinner(){
	if(matchedCards.length==16){
		//console.log("its full! you win!");
		setTimeout(calculateScore,600);
	}
}

function calculateScore(){
	// alert("Idk the score yet, I'll get back to you on that! but you did it in "+moves+" moves");
		if(moves ==16){
			console.log("Perfect score! 5 stars");
		} else if(moves ==17 && moves <20){
			console.log("Not perfect, but close! 4 stars");
		} else if(moves ==20 && moves <24){
			console.log("Getting closer, you almost had it! 3 stars");
		} else if(moves ==24 && moves <28){
			console.log("Come ooon! Focus! 2 stars");
		} else if(moves ==28 && moves <32){
			console.log("Really? Are you even trying? 1 star");
		} else if( moves >32){
			console.log("You seriously worry me. 0 stars!");
		}
}


