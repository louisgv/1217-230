// Create a dropzone for user to drag and drop image onto
const applyDropZone = (app, callback) => {

	app.view.addEventListener('dragover', (e) => {
		e.stopPropagation();
		e.preventDefault();
		e.dataTransfer.dropEffect = 'copy';
	}, false);


	app.view.addEventListener('drop', (e) => {
		e.stopPropagation(); // Stops some browsers from redirecting.
		e.preventDefault();

		const {
			x,
			y
		} = e;

		const imageUrl = e.dataTransfer.getData('URL');

		if(imageUrl && imageUrl.match(/\.(jpeg|jpg|png)$/) != null) {
			return callback(imageUrl, {
				x,
				y
			}, true)
		}

		const fileBlob = e.dataTransfer.files[0];

		if(!fileBlob || !fileBlob.type.match('image.*')) {
			return;
		}

		// If not image ignore
		callback(fileBlob, {
			x,
			y
		})
	}, false)
}
