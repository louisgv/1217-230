async function Tutorial() {
	return new Promise(function(resolve, reject) {
		// If player is first timer
		if (GetData(STOREKEY.TUTORIAL_DONE)) {
			return resolve();
		}

		Info("TUTORIAL");

		

		setTimeout(function () {
			resolve();
		}, 2000);

		// SetData(STOREKEY.TUTORIAL_DONE, true);


	});
}
