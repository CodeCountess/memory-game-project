const resetButton= document.querySelector('.restart');
const theDeck= document.querySelector('.deck');
const theTimer= document.querySelector('.timer');
let tickTock;
let seconds=0;
let once= { once: true };
const moveCounter= document.querySelector('.moves');
let moves= 0;
let symbols= ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt",
			  "fa-cube","fa-leaf","fa-bicycle","fa-bomb",
			  "fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt",
			  "fa-cube","fa-leaf","fa-bicycle","fa-bomb"];

let openCards= [];
let matchedCards= [];

const tester= document.getElementById('testModal');
const winnerModal= document.getElementById('winnerModal');
const modalReplay= document.querySelector('.replay');
const modalExit= document.querySelector('.exit');




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

theDeck.addEventListener('click',startTimer, once);

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
	if(moves >= 16){
		fallingStars();
	}
}

function isWinner(){
	if(matchedCards.length==16){	
		//setTimeout(calculateScore,600);
		stopTimer();
	}
}

function fallingStars(){
		if(moves ==16){
			console.log("Wowzers! You're a Super Star!");
			starErase(0);
		} else if(moves >16 && moves <=20){
			console.log("Hot Stuff! That was Dynamite!");
			starErase(1);
		} else if(moves >20 && moves <=24){
			console.log("Yippy Skippy! Bang Up Job!");
			starErase(2);
		} else if(moves >24 && moves <=28){
			console.log("Ooh Yeah! Well Done!");
			starErase(3);
		} else if(moves >28 && moves <=32){
			console.log("That's the Way! You are A-Okay!");
			starErase(4);
		} else if( moves >32){
			console.log("Zoinks! You'll get it next time!");
			starErase(5);
		}
}

function starErase(amt){
	for(let x=0; x <amt ; x++){
		$("ul.stars li i").eq(x).removeClass("fa-star");
		$("ul.stars li i").eq(x).addClass("fa-star-o");
	}
}

function startTimer(){
	tickTock= setInterval(secondCounter,1000);

}

function secondCounter(){
	seconds +=1; 
	let minutes= Math.floor(seconds/60);
	let leftover= seconds%60;
	if(leftover<10){
		leftover= "0"+leftover;
	}
	theTimer.innerHTML= minutes + ":" + leftover;
}

function stopTimer(){
	clearInterval(tickTock);
}

resetButton.addEventListener('click', resetGame);

function resetGame(){
	stopTimer();
	seconds=0;
	theTimer.innerHTML= "Timer 0:00";
	theDeck.addEventListener('click',startTimer, once);
	moves=0;
	moveCounter.innerHTML= 0;
	$( '.deck').empty();
	openCards= [];
	matchedCards= [];
	makeDeck(symbols);
}

tester.addEventListener('click', announceWinner);

function announceWinner(){
	winnerModal.style.display = "block";
}

modalReplay.onclick= function(){
	resetGame();
	winnerModal.style.display= "none";
}

modalExit.onclick= function(){
	winnerModal.style.display= "none";
}
