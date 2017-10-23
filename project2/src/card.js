// Base class for a card
class Card {
	constructor({element, image, point} = {
		element: CONSTANT.ELEMENT.ETHER,
		image: null,
		point: 0
	}, data = {}) {
		this.element = element;
		this.image = image;
		this.point = point;
		this.background = CONSTANT.ELEMENT_COLOR[element];
		this.data = data;
	}
}

// Get a random card
function GetRandomCard(
	heroElement = GetRandomInArray(CONSTANT.ELEMENTS),
	point = 0,
	threshold = CONSTANT.DEFAULT_THRESHOLD
) {
	const prob = Math.random();

	const element = prob < threshold
		? heroElement
		: GetRandomInArray(CONSTANT.ELEMENTS)

	const image = point > 0 && point <= CONSTANT.POINT_LIMIT
		?	GIPHY_TABLE[element][point - 1]
		: null;

	return new Card({element, point, image});
}

function CreateCardEl(card = new Card(), clickCallback=()=>{}, classname = '') {
	const cardEl = CreateElementWithClass('div', 'Card ' + classname);

	const cardContainerEl = CreateElementWithClass('div', 'CardContainer');

	const cardFaceEl = CreateElementWithClass('div', 'CardFace');

	const cardBackEl = CreateElementWithClass('div', 'CardBack');

	if (card.point > 0) {
		const cardPointEl = CreateElementWithClass('div', 'CardPoint');

		cardPointEl.innerHTML = card.point;

		cardFaceEl.appendChild(cardPointEl);
	}

	if (card.image) {
		const cardImageEl = CreateElementWithClass('img', 'CardImage');

		cardImageEl.src = card.image;

		cardFaceEl.appendChild(cardImageEl);
	}

	cardFaceEl.style.background = card.background;

	cardContainerEl.appendChild(cardFaceEl);

	cardContainerEl.appendChild(cardBackEl);

	cardEl.appendChild(cardContainerEl);

	// Bind the event to the chosen card, ignore the element itself
	cardEl.addEventListener('click', clickCallback);
	cardEl.card = card;

	return cardEl;
}
