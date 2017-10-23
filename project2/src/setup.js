// Re-fetch all the necessary giphy stamp for each element
// and cache them
async function RenewGiphyTable() {
	// Fetch all the giphy related to each element
	const results = await Promise.all(CONSTANT.ELEMENTS.map((element) => {
		const query = CONSTANT.ELEMENT_KEYWORD[element];

		const url = GetGiphyURL(query, CONSTANT.POINT_LIMIT)
		return fetch(url);
	}))

	// Grab its json
	const resultsJSON = await Promise.all(results.map(r => r.json()));

	// Assign the json element into the giphy table
	resultsJSON.map(({data}, i) => {

		const element = CONSTANT.ELEMENTS[i];

		GIPHY_TABLE[element] = data.map(d => d.images.fixed_width_small.url)
	})

	SetData(STOREKEY.GIPHY_TABLE, GIPHY_TABLE);
	SetData(STOREKEY.GIPHY_TIMESTAMP, new Date());
}

// Pre-populate the giphy table for ease of access later
async function WarmUpGiphyTable() {
	const giphyTimeString = GetData(STOREKEY.GIPHY_TIMESTAMP);

	const giphyTimestamp = giphyTimeString
		? new Date(giphyTimeString).getTime()
		: 0;

	// If giphy cached data seems outdated
	if (Date.now() - giphyTimestamp > CONSTANT.GIPHY.TIMEOUT)
		// Return after fetching a new giphy table
		return await RenewGiphyTable();

	// else revive the cached table
	const giphyTable = GetData(STOREKEY.GIPHY_TABLE);

	CONSTANT.ELEMENTS.map((element) => {
		GIPHY_TABLE[element] = giphyTable[element]
	})
}

// Setup the game and restore the state of previous game if exist
async function Setup() {
	await WarmUpGiphyTable();

	// TODO: Might need to rethink this:
	SetData(STOREKEY.ROUND, 0);

	SpawnHeroSelectionCards();
}

window.addEventListener('load', Setup);
