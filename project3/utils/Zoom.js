// Apply zoom event to an app 
function applyZoom(app) {
	app.view.addEventListener('mousewheel', ({
		wheelDeltaY
	}) => {
		const {
			MAX,
			MIN,
			SCALE
		} = ZOOM;
		const {
			x,
			y
		} = app.stage.scale;

		const unitDelta = (wheelDeltaY > 0 ? 1 : -1) * SCALE

		const newX = x + unitDelta;
		const newY = y + unitDelta;

		if(newX + newY > MAX * 2 || newX + newY < MIN * 2) {
			return false
		}

		app.stage.scale.x = newX
		app.stage.scale.y = newY

		return false
	})
}
