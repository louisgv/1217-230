/*
    Show a Notification to the user for
    error handling
*/
class Notification extends PIXI.Container {
    constructor(message, container, {x, y}, color = '#ffffff', duration = 3600) {
        super()

        this.x = x;
		this.y = y;

        const text = new Text(message,color, 0, 0);

        text.anchor.x = 0.5;

        this.addChild(text);

        this.container = container;
        this.duration = duration;

        container.addChild(this);
        this.delayedSelfDestruct()
    }

    // Self destruct after specified duration
    async delayedSelfDestruct() {
        await wait(this.duration);
		this.container.removeChild(this);
        this.destroy()
    }
}
