// Showing the tutorial sequence
async function tutorial() {
	// If player is first timer
	if(getData(STOREKEY.TUTORIAL_DONE)) {
		return;
	}

	info("TUTORIAL");

	await announce("Seems like you are new here.")

	await announce(`
		This is a push your luck card game.
		<br/>
		<br/>
		The card you just chose
		<br/>
		is your hero card.
		`, 2700)

	await announce(`
		Each hero card represents a higher chance of
		<br/>
		drawing cards of the same element
		<br/>
		as the hero card.
		`, 2700)

	await announce(`
		There are five elements in the game:
		<br/>
		WATER  ,  FIRE  ,  AERO  ,  EARTH
		<br/>
		and ETHER
		`, 3600)

	await announce(`
		The game has 3 rounds, each round
		<br/>
		has 2 phases:
		<br/>
		<b>prepare</b> and <b>combat</b>.
		`, 3600)

	await announce(`
		In the prepare phase, we will take turn either
		<br/>
		<b>drawing a card</b> from the central deck
		<br/>
		or
		<br/>
		<b>playing a card</b> from our hand.
		`, 4500)

	await announce(`
		Whoever fill up all of their equipment slots first
		<br/>
		will commence the combat phase.
		`, 4500)

	await announce(`
		In the combat phase, our final score will be calculated
		<br/>
		using a 3 stages nullification process, which
		<br/>
 		you can read more in the rule book.
		`, 4500)

	await announce(`
		Whoever has the higher score during the combat phase
		<br/>
		wins the round.
		`, 3600)

	await announce(`
		The winner or 2 rounds wins the game.
		`, 4500)

	await announce(`
			The playing board are split into 3 sections:
			`, 3600)

	await announce(`
			Hand
			<br/>
			Cards we drew goes here.
			<br/>
			Maximum card	 we can hold is ${CONSTANT.CARD_LIMIT}.
			`, 3600)

	await announce(`
			Equip
			<br/>
			Cards we played goes here.
			<br/>
			Maximum equipment is ${CONSTANT.EQUIP_LIMIT}.
			`, 3600)

	await announce(`
		Status
		<br/>
		Shows our accumulated score and our avatar.
		<br/>
		During the combat phase, it will change to reflect the nullification process.
		`, 4500)

	await announce(`
		On the right hand side, you will find a
		<br/>
		card that says "Draw card".
		`, 3600)

	await announce(`
		Clicking it during prepare phase will
		<br/>
		add a card to your hand.
		`, 3600)

	info('LIKE THIS')

	await announce(`
		There will be notification popping up
		<br/>
		letting you know who turn or
		<br/>
		what phase we are in.
		`, 4500)

	showInterface()
	await announce(`
		The detailed rule can be read in
		<br/>
		the rule book located on
		<br/>
		the left side bar.
		`, 3600)

	await announce(`
		You will not see this tutorial again until you clean up your localstorage.
		<br/>
		Please agree to the GPLv3 license before copying this works.
		<br/>
		Thank you for playing!
		`, 6300)

	setData(STOREKEY.TUTORIAL_DONE, true)
}
