// Showing the tutorial sequence
async function introTutorial() {
	// If player is first timer
	if(getData(STOREKEY.INTRODUCTION_TUTORIAL)) {
		return;
	}

	info("INTRO");

	await dialog(`
		Seems like you are new here.
		<br/>
		Welcome to L'eau.web
		`)

	await dialog(`
		This is a turn-based push your luck card game.
		<br/>
		Winner of 2 rounds win the game.
		`)

	await dialog(`
			First, let us choose our hero card!
		`, "LET'S DO THIS!")

	setData(STOREKEY.INTRODUCTION_TUTORIAL, true)
}


// Tutorial for the hero choosing
async function heroTutorial() {
	if(getData(STOREKEY.HERO_TUTORIAL)) {
		return;
	}

	await dialog(`
		The cards you and I choose will be compared
		<br/>
	 	to determine the first to make a move.
		`)

	setData(STOREKEY.HERO_TUTORIAL, true)
}

// Tutorial fo the element
async function elementTutorial() {
	if(getData(STOREKEY.ELEMENT_TUTORIAL)) {
		return;
	}

	await dialog(`
		There are 5 types of card:
		<br/>
		WATER, FIRE, AERO, EARTH
		<br/>
		and ETHER
	`)

	setData(STOREKEY.ELEMENT_TUTORIAL, true)
}

// Tutorial on each phases of the game
async function phaseTutorial() {
	if(getData(STOREKEY.PHASE_TUTORIAL)) {
		return;
	}

	await dialog(`
		Each round in the game has two phases: <br/>
		PREPARE and COMBAT
	`)

	await dialog(`
		In the PREPARE phase, we will take turn to either
		<br/>
		<b>Draw a card</b> from the central deck
		<br/>
			or
		<br/>
		<b>Equip a card</b> from our hand.
		`)

	await dialog(`
		There are ${CONSTANT.EQUIP_LIMIT} equipment slots.
		<br/>
		The first player to fill up their slots
		<br/>
		will initiate the COMBAT phase.
		`)

	await dialog(`
		The goal of this phase is to accumulate <br/>
		as many point as possible before COMBAT.
		`)

	await dialog(`
		In the COMBAT phase, our final score will be calculated using
		<br/>
	 	a 3 stages "nullification" process, which
		<br/>
		you can read more in the rule book.
		`)

	await dialog(`
		Whoever has the higher score during the combat phase
		<br/>
		wins the round.
		`)
	setData(STOREKEY.PHASE_TUTORIAL, true)
}

// Interface tutorial
async function interfaceTutorial(){
	if(getData(STOREKEY.INTERFACE_TUTORIAL)) {
		return;
	}

	info('LIKE THIS')

	await dialog(`
		There will be notification popping up
		<br/>
		letting you know who turn or
		<br/>
		what phase we are in.
		`)

	showInterface()
	await dialog(`
		The detailed rule can be read in
		<br/>
		the rule book located on
		<br/>
		the left side bar.
		`)
	setData(STOREKEY.INTERFACE_TUTORIAL, true)
}


// License notice tutorial
async function licenseTutorial(){
	if(getData(STOREKEY.LICENSE_TUTORIAL)) {
		return;
	}
	await dialog(`
		You will not see the tutorial again until you clean up your localstorage.
		<br/>
		Please agree to the GPLv3 license before copying this work.
		`, 'I ACCEPT');

	await dialog(`
		Thank you for playing and I hope you enjoy the game.
		`, 'START GAME');

	setData(STOREKEY.LICENSE_TUTORIAL, true)
}
