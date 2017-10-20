// Base class for a card
class Card {
	constructor({element, image, point} = {
		element: CONSTANT.ELEMENT.ETHER,
		image: null,
		point: 1
	}) {
		this.element = element;
		this.image = image;
		this.point = point;

		console.log(element);

		console.log(CONSTANT.ELEMENT_COLOR[element]);

		this.background = CONSTANT.ELEMENT_COLOR[element];
	}
}

// Get a random card
function GetRandomCard(heroElement = GetRandomInArray(CONSTANT.ELEMENTS)) {
	const prob = Math.random();

	const element = prob < CONSTANT.RANDOM_THRESHOLD
		? heroElement
		: GetRandomInArray(CONSTANT.ELEMENTS)

	const point = 1;

	return new Card({element, point});
}

function CreateCardEl(card = new Card(), clickCallback=()=>{}) {
	const cardEl = CreateElementWithClass('div', 'Card');

	const cardFaceEl = CreateElementWithClass('div', 'CardFace');

	cardFaceEl.style.background = card.background;

	// Bind the event to the chosen card, ignore the element itself
	cardEl.addEventListener('click', clickCallback.bind(card));

	cardEl.appendChild(cardFaceEl);

	return cardEl;
}
