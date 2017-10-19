
window.onload = function() {
  $('#game-start').on('click', gameStartFunc);
  $('#reset').on('click', gameStartFunc);
  $('#options').on('click', 'button', rightOrWrongFunc);
  $('#continue').on('click', 'button', continueFunc);
};

// global var declare and intilize
var question = '';
var questionNumber = '';
var options = '';

var actualAnswer = '';
var timer = 30;
var timerFunc;
var decrement;
var right = 0;
var wrong = 0;
var unanswered = 0;
var rightOrWrongTimeout;
// gameCounter will be 1 since gameStartFunc already starts at 0
var gameCounter;
var $this;

// arr of questions and answers, used double quotes so single quotes could be used in string
var triviaArr = [
	{
		question: "In Goku's 2nd outing at the World's Martial Art Tournament, who did he fight and did he win?",
		answer: ["Tien Shinhan, lost to him", "By a matter of milliseconds, Tien Shinhan won by hitting the outside of the stage last. Goku should have won but was struck by a car as he battled Tien in midair. Its kinda hard to describe"],
		options: ["Jackie Chun, lost to him", "King Piccolo, defeated him", "Yajirobe, defeated him", "Tien Shinhan, lost to him", "Korin, it was a tie"]
	},
	{
		question: "Where do the pig people such as Oolong come from?",
		answer: ["Octagon Village", "Yes, because pigs like octagons apparently"],
		options: ["Hexagon Village", "Octagon Village", "Pig Town", "Blueberry Country", "Mars"],
	},
	{
		question: "In the early part of Dragon Ball, what would Goku do once he first met someone?",
		answer: ["Touch their genitals", "Yep, Goku was so clueless, he would check to see if they were a boy or girl. I don't think this show would pass today's standards"], 
		options: ["Shake their hand", "Challenge them to fight", "Touch their genitals", "Ask what's their name", "Not say anything"]
	},
	{
		question: "Who is the last major villian in Dragon Ball?",
		answer: ["Piccolo Jr.", "While King Piccolo was near the end, he actually made Piccolo Jr. from an egg. Right before he died, he regurgitated an egg and sent it to the mountains. That egg became Piccolo Jr., the last villian"],
		options: ["King Piccolo", "Frieza", "Kami", "Chiaotzu", "Piccolo Jr."]
	},
	{
		question: "Fortuneteller Baba is related to ________",
		answer: ["Master Roshi", "Yep, they are siblings actually"],
		options: ["Master Roshi", "Mr. Popo", "Krillin", "Commander Red", "Mercenary Tao"]
	},
	{
		question: "All of the following are real moves that Goku has used EXCEPT",
		answer: ["Power Pole Defend","No joke, Goku did turn into a tornado"],
		options: ["Power Pole Defend","Turning into a tornado", "Kamehameha", "Feet Kamehameha", "Solar Flare"]
	}
]
// function runs when gamestart or reset is pressed
var gameStartFunc = function() {

	// gameCounter set back to 1
	gameCounter = 0;

	// reset variables to 0
	right = 0;
	wrong = 0;
	unanswered = 0;
	timer = 30;


	// hides game-start button, gameover message, right counter, wrong counter, unanswered counter, and reset. This is done because while the 1st time this game runs, unanswered counter for example doesn't need to be hidden but if game is reset, it should be. COULD USE addClass (display: none);
	$('#game-start, #gameover-message, #right-counter, #wrong-counter, #unanswered-counter, #reset').hide();
	

	// display first question
	$('#question').html('<h2>' + triviaArr[gameCounter].question + '</h2>');
	
	// display options as buttons in id options
	for (var i = 0; i < triviaArr[gameCounter].options.length; i++) {
		$('#options').append("<button type='button' class='btn btn-lg btn-success btn-block'><h2>" + triviaArr[gameCounter].options[i] + "</h2></button>");
	}

	// set a timeout for 30 seconds. At 30 sec, run rightOrWrongFunc
	rightOrWrongTimeout = setTimeout(rightOrWrongFunc, 30000);
	// start a visable timer that decreases every second
	timerFunc = setInterval(decrement, 1000)
}
// decrement function
var decrement = function() {
	$('#timer').text(timer);

	timer--;

	
	if (timer == 0) {
		clearInterval(timerFunc);
	}

}

var rightOrWrongFunc = function() {
	
	// to clear interval 
	clearTimeout(rightOrWrongTimeout);
	clearInterval(timerFunc);
	// selects the text of the option that was chosen 
	var $this = $(this).children('h2').text()
	console.log($this); 

	// clear timer, question, and options so continueFunc can append to these
	$('#timer, #question, #options').empty();
	
	// if the user guess was correct
	if ($this == triviaArr[gameCounter].answer[0]) {
		
		// enter html of the ids selected below
		$('#right-or-wrong').html('<h2 id="right">Right!</h2>');
		$('#right-or-wrong-pic').html('<img src="assets/images/Goku_right.gif" alt="This will display an animated GIF"/>');
		$('#actual-answer').html('<h2>Answer: ' + $this + '<br>' + triviaArr[gameCounter].answer[1] + '</h2>');
		$('#continue').html('<button type="button" class="btn">Continue?</button>');

		// increase right counter and gameCounter by one
		right++;
		gameCounter++;

	}
	// if user guess was incorrect
	else {
		
		// enter html of ids selected below
		$('#right-or-wrong').html('<h2 id="wrong">Wrong</h2>');
		$('#right-or-wrong-pic').html('<img src="assets/images/Goku_wrong.gif" alt="This will display an animated GIF"/>');
		$('#actual-answer').html('<h2>Answer: ' + triviaArr[gameCounter].answer[0]  + '<br>' + triviaArr[gameCounter].answer[1] + '</h2>');
		$('#continue').html('<button type="button" class="btn">Continue?</button>');

		// increase wrong counter and gameCounter by one
		wrong++;
		gameCounter++;
		
		// if you haven't answered the question
		if ($this == '') {
			
			unanswered++;
		}
	}

	// show right or wrong, actual answer, and continue
	$('#right-or-wrong, #right-or-wrong-pic, #actual-answer, #continue').show();
	
}
// continue button, also does a gameover screen when 5th question has been done
var continueFunc = function() {
	timer = 30;
	// hide right or wrong, right or wrong pic, actual answer, and continue
	$('#right-or-wrong, #right-or-wrong-pic, #actual-answer, #continue').hide();
	// if gamecounter is 5 or more which should happen after the 5th question is answered, run gameover
	if (gameCounter >= 5) {
		
		// shows previously hidden IDs from gameStartFunc
		$('#gameover-message, #right-counter, #wrong-counter, #unanswered-counter, #reset').show();
		$('#gameover-message').html('<h2>Game Over, click reset to start over</h2>');
		$('#right-counter').html('<h3>#Right: ' + right + '</h3>');
		$('#wrong-counter').html('<h3>#Wrong: ' + wrong + '</h3>');
		$('#unanswered-counter').html('<h3>#Unanswered: ' + unanswered + '</h3>');
		$('#reset').html('<button type="button" class="btn">Reset the game</button>');;
	}
	// if gamecounter is less than 5 and >=0, then run this
	else {
		
		
		// display next question through id question, next answer and options as buttons in id answer, and timer with timer decrementing on id timer
		$("#question").html("<h2>" + triviaArr[gameCounter].question + "</h2>");

		// display question through id question, answer and options as buttons in id answer, and timer with timer decrementing on id timer
		for (var i = 0; i < triviaArr[gameCounter].options.length; i++) {
			$("#options").append("<button type='button' class='btn btn-success btn-block btn-lg'><h2>" + triviaArr[gameCounter].options[i] + "</h2></button>");
		}

		// set a timeout for 30 seconds. At 30 sec, run rightOrWrongFunc
		rightOrWrongTimeout = setTimeout(rightOrWrongFunc, 30000);
		timerFunc = setInterval(decrement, 1000);

	}
	
}

 

