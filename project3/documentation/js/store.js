// Get data from a data source, using localStorage for now.
function getData(key) {
	const namespacedKey = STORENAMESPACE + key;

	return JSON.parse(localStorage.getItem(namespacedKey));
}

// Set the data in a data source, using localStorage for now.
function setData(key, value) {
	const namespacedKey = STORENAMESPACE + key;

	const result = JSON.stringify(value);

	localStorage.setItem(namespacedKey, result);

	return result;
}

/*
LOCALSTORAGE data structure keys:
*/

const STORENAMESPACE = 'TAMAGGOTCHI.';

const STOREKEY = {
	COPYRIGHT_STATE: 'COPYRIGHT_STATE'
}
