const HeroSelectionOverlayEl = document.querySelector('#HeroSelectionOverlay');

// Callback handle to log the selected hero and start the main game
function OnHeroSelected() {
  HeroSelectionOverlayEl.style.display = "none";

	const playerHeroCard = this.card;

	SetData(STOREKEY.PLAYER_HERO, playerHeroCard);

  PlayerSetHero(playerHeroCard);

  const npcHeroCard = GetRandomCard();

	npcHeroCard.image = CONSTANT.ELEMENT_HERO_IMAGE[npcHeroCard.element]

	SetData(STOREKEY.NPC_HERO, npcHeroCard);

  NPCSetHero(npcHeroCard);

  StartGame();
}

// Spawn all of the hero selection cards
function SpawnHeroSelectionCards() {
  const HeroCardContainerEl = CreateElementWithId('div', 'HeroCardContainer');
  HeroSelectionOverlayEl.appendChild(HeroCardContainerEl);

  CONSTANT.ELEMENTS.map((element) => {
    const background = CONSTANT.ELEMENT_COLOR[element];

    const card = new Card({ element, image : CONSTANT.ELEMENT_HERO_IMAGE[element] },
			{ info: [
				`Higher chance of drawing ${element} card`,
				`Beats ${CONSTANT.ELEMENT_HIERARCHY[element].join(' and ')}`
			] });

    const elmCardEl = CreateCardEl(card, OnHeroSelected);

    HeroCardContainerEl.appendChild(elmCardEl);
  })
}
