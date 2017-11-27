// Read a file from the blob provided from input
function readFile(fileBlob, progressCallback) {
	const reader = new FileReader();

	return new Promise(function(resolve, reject) {
		reader.onloadend = ({ target }) => {
			resolve(target);
		};

		reader.onprogress = progressCallback;

		reader.onerror = error => {
			reject(error);
		};

		reader.readAsDataURL(fileBlob);
	});
}
