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

const winnerModal= document.getElementById('winnerModal');
const modalReplay= document.querySelector('.replay');
const modalExit= document.querySelector('.exit');
const modalH3= document.getElementById('modal-saying');
const modalP= document.getElementById('modal-stats');
const modalP2= document.getElementById('modal-moves');
const modalP3= document.getElementById('modal-score');

function makeDeck(array){
	shuffle(array);
	
	let list= document.querySelector('.deck');

	for(let i=0; i< array.length; i++){
		
		let item= document.createElement('li');
		let icon= document.createElement('i');
		
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
    let currentIndex = array.length, temporaryValue, randomIndex;

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

function cardClick(){
	let userClick= event.target;
	if(userClick.classList.contains('card')){
		openCardChecker();
	}
}

theDeck.addEventListener('click', cardClick);

function displayCardSymbol(){
	$( event.target ).toggleClass("open").toggleClass("show");
}

function openCardChecker(){
	let userClick= event.target;

	if(!userClick.classList.contains('open') && !userClick.classList.contains('show')){
		openCards.unshift(userClick);
		displayCardSymbol();
		if(openCards.length==2){
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
let superToggle = function(element, class0, class1) {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
}
//how to call example= superToggle(card,"open", "show");

function displayMoves(){
	moves+=1; 
	moveCounter.innerHTML =moves;
	if(moves >= 16){
		fallingStars();
	}
}

function isWinner(){
	if(matchedCards.length==16){	
		stopTimer();
		setTimeout(announceWinner,600);
	}
}

function fallingStars(){
		if(moves ==16){
			modalH3.innerHTML="Wowzers! You're a Super Star!";
			modalP3.innerHTML="You earned 5 of 5 stars!";
			starErase(0);
		} else if(moves >16 && moves <=20){
			modalH3.innerHTML="Hot Stuff! That was Dynamite!";
			modalP3.innerHTML="You earned 4 of 5 stars!";
			starErase(1);
		} else if(moves >20 && moves <=24){
			modalH3.innerHTML="Yippy Skippy! Bang Up Job!";
			modalP3.innerHTML="You earned 3 of 5 stars!";
			starErase(2);
		} else if(moves >24 && moves <=28){
			modalH3.innerHTML="Ooh Yeah! Well Done!";
			modalP3.innerHTML="You earned 2 of 5 stars!";
			starErase(3);
		} else if(moves >28 && moves <=32){
			modalH3.innerHTML="That's the Way! You are A-Okay!";
			modalP3.innerHTML="You earned 1 of 5 stars!";
			starErase(4);
		} else if( moves >32){
			modalH3.innerHTML="Zoinks! You'll get it next time!";
			modalP3.innerHTML="You earned 0 of 5 stars!";
			starErase(5);
		}
}

function starErase(amt){
	for(let x=0; x <amt ; x++){
		$("ul.stars li i").eq(x).removeClass("fa-star");
		$("ul.stars li i").eq(x).addClass("fa-star-o");
	}
}

function starReFill(amt){
	for(let x=0; x <amt ; x++){
		$("ul.stars li i").eq(x).removeClass("fa-star-o");
		$("ul.stars li i").eq(x).addClass("fa-star");
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
	if(minutes===1){
		modalP.innerHTML= "You found all the matches in "+minutes+" minute and "+leftover+" seconds!";
	}else{
		modalP.innerHTML= "You found all the matches in "+minutes+" minutes and "+leftover+" seconds!";
	}
	
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
	starReFill(5);
	moves=0;
	moveCounter.innerHTML= 0;
	$( '.deck').empty();
	openCards= [];
	matchedCards= [];
	makeDeck(symbols);
}

function announceWinner(){
	modalP2.innerHTML= "With a grand total of "+moves+" moves!";
	winnerModal.style.display = "block";
}

modalReplay.onclick= function(){
	resetGame();
	winnerModal.style.display= "none";
}

modalExit.onclick= function(){
	winnerModal.style.display= "none";
}
