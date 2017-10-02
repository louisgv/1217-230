let phrases = [
      "A closed mind is a good thing to lose.",
      "A closed mouth gathers no feet.",
      "A conscience is what hurts when all your other parts feel so good.",
      "A friend is one who walks in when the rest of the world walks out.",
      "A good exercise for the heart is to bend down and help another up.",
      "A good scare is worth more to a man than good advice.",
      "A groundless rumor often covers a lot of ground.",
      "A guilty conscience needs no accuser.",
      "A magician pulls rabbits out of hats. An experimental psychologist pulls habits out of rats.",
      "A man has no more character than he can command in a time of crisis.",
      "A man is known by the company he avoids.",
      "Always imitate the behavior of the winners when you lose.",
      "Bad habits are like a comfortable bed, easy to get into, but hard to get out of.",
      "Be alert to give service. What counts a great deal in life is what we do for others.",
      "Better to get up late and be wide awake than to get up early and be asleep all day.",
      "Bite off more than you can chew, then chew it. Plan more than you can do, then do it.",
      "By courage I repel adversity. (Adversa Virtute Repello)",
      "Concern should drive us into action and not into depression.",
      "Contentment is not the fulfillment of what you wan…but the realization of how much you already have.",
      "Dare to be wise. (Sapere Aude)"
   ];

let backgroundGradientClasses = [
	"FireWatch",
	"Lust",
	"Mauve",
	"Frost",
	"Royal"
]

function getRandomFrom(items){
	return items[Math.floor(Math.random() * items.length)]
}

let shuffleButton = document.getElementById('ShufflePhraseButton');

let phraseContainer = document.getElementById('RandomPhraseContainer');

let body = document.body;

function displayQuote() {
	phraseContainer.innerHTML = "";

	let backgroundGradientClass = getRandomFrom(backgroundGradientClasses)
	body.className = backgroundGradientClass;

	let phrase = getRandomFrom(phrases)

	let phraseEl = document.createElement('span');

	phraseEl.setAttribute('id', 'RandomPhrase');
	phraseEl.innerText = phrase;

	phraseContainer.appendChild(phraseEl);
}

shuffleButton.addEventListener('click', displayQuote);

displayQuote();
