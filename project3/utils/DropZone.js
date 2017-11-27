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

		const fileBlob = e.dataTransfer.files[0];

        const {x, y} = e;

		// If not image ignore
		if(!fileBlob.type.match('image.*')) {
			return;
		}

		callback(fileBlob, {x, y})
	}, false)
}
