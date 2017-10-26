const HeroSelectionOverlayEl = document.querySelector('#HeroSelectionOverlay');

// Callback handle to log the selected hero and start the main game
function OnHeroSelected(playerHeroCard) {
  HeroSelectionOverlayEl.style.display = "none";

	SetData(STOREKEY.PLAYER_HERO, playerHeroCard);

  PlayerSetHero(playerHeroCard);

  const npcHeroCard = GetRandomCard();

	npcHeroCard.image = CONSTANT.ELEMENT_HERO_IMAGE[npcHeroCard.element]

	SetData(STOREKEY.NPC_HERO, npcHeroCard);

  NPCSetHero(npcHeroCard);
}

// Spawn all of the hero selection cards
function SpawnHeroSelectionCards() {
	const HeroCardContainerEl = CreateElementWithId('div', 'HeroCardContainer');
  HeroSelectionOverlayEl.appendChild(HeroCardContainerEl);

	return new Promise(function(resolve, reject) {

		CONSTANT.ELEMENTS.map((element) => {
			const background = CONSTANT.ELEMENT_COLOR[element];

			const card = new Card({ element, image : CONSTANT.ELEMENT_HERO_IMAGE[element] },
				{ info: [
					`Higher chance of drawing ${element} card`,
					`Beats ${CONSTANT.ELEMENT_HIERARCHY[element].join(' and ')}`
				] });

			const elmCardEl = CreateCardEl(card, () => {
				OnHeroSelected(card);
				resolve();
			});

			HeroCardContainerEl.appendChild(elmCardEl);
		})

	});
}
