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

async function WarmUpGiphyTable() {
	const giphyTimestamp = new Date(GetData(STOREKEY.GIPHY_TIMESTAMP));

	if (giphyTimestamp && Date.now() - giphyTimestamp.getTime() < CONSTANT.GIPHY.TIMEOUT )
		return await RenewGiphyTable();

	const giphyTable = GetData(STOREKEY.GIPHY_TABLE);

	// Caching it for faster grabbing
	CONSTANT.ELEMENTS.map((element) => {
		GIPHY_TABLE[element] = giphyTable[element]
	})
	console.log(giphyTable);
}

// Setup the game and restore the state of previous game if exist
async function Setup() {
	await WarmUpGiphyTable();
	SpawnHeroSelectionCards();
}

window.addEventListener('load', Setup);
