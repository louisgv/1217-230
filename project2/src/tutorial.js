async function tutorial() {
	return new Promise(function(resolve, reject) {
		// If player is first timer
		if (getData(STOREKEY.TUTORIAL_DONE)) {
			return resolve();
		}

		info("TUTORIAL");



		setTimeout(function () {
			resolve();
		}, 2000);

		// setData(STOREKEY.TUTORIAL_DONE, true);


	});
}
