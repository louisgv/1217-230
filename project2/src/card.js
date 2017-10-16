class Card {
	constructor({name, image}) {
		this.name = name;
		this.image = image;
	}
}

function GetRandomCard(heroElement) {
	const prob = Math.random();

	const cardType = prob < CONSTANT.RANDOM_THRESHOLD
		? heroElement
		: GetRandomInArray(CONSTANT.ELEMENTS)

	// const name =

	return new Card({cardType});
}

function CreateCard(clickCallback, background) {
	const cardEl = CreateElementWithClass('div', 'Card');

	const cardFaceEl = CreateElementWithClass('div', 'CardFace')

	cardFaceEl.style.background = background;

	cardEl.addEventListener('click', clickCallback);

	cardFaceEl.addEventListener('click', clickCallback);

	cardEl.appendChild(cardFaceEl);

	return cardEl;
}
