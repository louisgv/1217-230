// Apply drag and drop to the container inside the stage
function applyDragAndDrop(container) {

    container.interactive = true;

	let isDragging = false;
	let prevX;
	let prevY;

	container.on('pointerdown', function ({
		global
	}) {
        console.log("WHYYY");
		prevX = global.x;
		prevY = global.y;
		isDragging = true;
	})

	container.on('pointermove', ({
		global
	}) => {
		if(!isDragging) {
			return
		}

		const dx = global.x - prevX;
		const dy = global.y - prevY;

		container.position.x += dx;
		container.position.y += dy;

		prevX = global.x;
		prevY = global.y;
	})

	container.on('pointerup', () => {
		isDragging = false;
	})
}
