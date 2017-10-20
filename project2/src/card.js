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
		this.background = CONSTANT.ELEMENT_COLOR[element];
	}
}

// Get a random card
function GetRandomCard(
	heroElement = GetRandomInArray(CONSTANT.ELEMENTS),
	threshold = CONSTANT.DEFAULT_THRESHOLD
) {
	const prob = Math.random();

	const element = prob < threshold
		? heroElement
		: GetRandomInArray(CONSTANT.ELEMENTS)

	const point = 1;

	return new Card({element, point});
}

function CreateCardEl(card = new Card(), clickCallback=()=>{}) {
	const cardEl = CreateElementWithClass('div', 'Card');

	const cardFaceEl = CreateElementWithClass('div', 'CardFace');

	cardFaceEl.style.background = card.background;

	cardEl.card = card;

	// Bind the event to the chosen card, ignore the element itself
	cardEl.addEventListener('click', clickCallback);

	cardEl.appendChild(cardFaceEl);

	return cardEl;
}
