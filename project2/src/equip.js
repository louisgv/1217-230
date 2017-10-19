// Create an equipment element card
function CreateEquip() {
	const equipEl = CreateElementWithClass('div', 'Equip');

	const cardFaceEl = CreateElementWithClass('div', 'CardFace')

	cardEl.addEventListener('click', clickCallback);

	cardFaceEl.addEventListener('click', clickCallback);

	cardEl.appendChild(cardFaceEl);

	return cardEl;
}
