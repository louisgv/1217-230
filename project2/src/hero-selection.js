const heroSelectionOverlayEl = document.querySelector('#HeroSelectionOverlay');

// Callback handle to log the selected hero and start the main game
function onHeroSelected(playerHeroCard) {
  heroSelectionOverlayEl.style.display = "none";

	setData(STOREKEY.PLAYER_HERO, playerHeroCard);

  playerSetHero(playerHeroCard);

	// document.body.style.background = CONSTANT.ELEMENT_COLOR[playerHeroCard.element]

  const npcHeroCard = getRandomCard();

	npcHeroCard.image = CONSTANT.ELEMENT_HERO_IMAGE[npcHeroCard.element]

	setData(STOREKEY.NPC_HERO, npcHeroCard);

  npcSetHero(npcHeroCard);
}

// Spawn all of the hero selection cards
function spawnHeroSelectionCards() {
	const heroCardContainerEl = createElementWithId('div', 'HeroCardContainer');
  heroSelectionOverlayEl.appendChild(heroCardContainerEl);

	return new Promise(function(resolve, reject) {

		CONSTANT.ELEMENTS.map((element) => {
			const background = CONSTANT.ELEMENT_COLOR[element];

			const card = new Card({ element, image : CONSTANT.ELEMENT_HERO_IMAGE[element] },
				{ info: [
					`Higher chance of drawing ${element} card`,
					`Beats ${CONSTANT.ELEMENT_HIERARCHY[element].join(' and ')}`
				] });

			const elmCardEl = createCardEl(card, () => {
				onHeroSelected(card);
				resolve();
			});

			heroCardContainerEl.appendChild(elmCardEl);
		})

	});
}
