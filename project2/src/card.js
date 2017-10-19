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

function GetRandomCard(heroElement) {
	const prob = Math.random();

	const cardType = prob < CONSTANT.RANDOM_THRESHOLD
		? heroElement
		: GetRandomInArray(CONSTANT.ELEMENTS)

	return new Card({cardType});
}

function CreateCard(clickCallback, card = new Card()) {
	const cardEl = CreateElementWithClass('div', 'Card');

	const cardFaceEl = CreateElementWithClass('div', 'CardFace');

	cardFaceEl.style.background = card.background;

	cardEl.addEventListener('click', clickCallback);

	cardEl.appendChild(cardFaceEl);

	return cardEl;
}
