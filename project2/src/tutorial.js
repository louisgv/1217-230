// Showing the tutorial sequence
async function tutorial() {
	// If player is first timer
	// if(getData(STOREKEY.TUTORIAL_DONE)) {
	// 	return;
	// }

	info("TUTORIAL");

	await dialog("Seems like you are new here.")

	await dialog(`
		This is a push your luck card game.
		<br/>
		<br/>
		The card you just chose
		<br/>
		is your hero card.
		`)

	await dialog(`
		Each hero card represents a higher chance of
		<br/>
		drawing cards of the same element
		<br/>
		as the hero card.
		`)

	await dialog(`
		There are five elements in the game:
		<br/>
		WATER  ,  FIRE  ,  AERO  ,  EARTH
		<br/>
		and ETHER
		`)

	await dialog(`
		The game has 3 rounds, each round
		<br/>
		has 2 phases:
		<br/>
		<b>prepare</b> and <b>combat</b>.
		`)

	await dialog(`
		In the prepare phase, we will take turn either
		<br/>
		<b>drawing a card</b> from the central deck
		<br/>
		or
		<br/>
		<b>playing a card</b> from our hand.
		`)

	await dialog(`
		Whoever fill up all of their equipment slots first
		<br/>
		will commence the combat phase.
		`)

	await dialog(`
		In the combat phase, our final score will be calculated
		<br/>
		using a 3 stages nullification process, which
		<br/>
 		you can read more in the rule book.
		`)

	await dialog(`
		Whoever has the higher score during the combat phase
		<br/>
		wins the round.
		`)

	await dialog(`
		The winner or 2 rounds wins the game.
		`)

	await dialog(`
			The playing board are split into 3 sections:
			`)

	await dialog(`
			Hand
			<br/>
			Cards we drew goes here.
			<br/>
			Maximum card	 we can hold is ${CONSTANT.CARD_LIMIT}.
			`)

	await dialog(`
			Equip
			<br/>
			Cards we played goes here.
			<br/>
			Maximum equipment is ${CONSTANT.EQUIP_LIMIT}.
			`)

	await dialog(`
		Status
		<br/>
		Shows our accumulated score and our avatar.
		<br/>
		During the combat phase, it will change to reflect the nullification process.
		`)

	await dialog(`
		On the right hand side, you will find a
		<br/>
		card that says "Draw card".
		`)

	await dialog(`
		Clicking it during prepare phase will
		<br/>
		add a card to your hand.
		`)

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

	await dialog(`
		You will not see this tutorial again until you clean up your localstorage.
		<br/>
		Please agree to the GPLv3 license before copying this works.
		<br/>
		Thank you for playing!
		`)

	setData(STOREKEY.TUTORIAL_DONE, true)
}
