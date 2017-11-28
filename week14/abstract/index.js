"use strict";
let xmlns = 'http://www.w3.org/2000/svg';
let svg = document.querySelector('svg');

const SIZE = 450;

const COUNT = 3;

const UNIT_SIZE = SIZE / COUNT;

const INIT_OFFSET = UNIT_SIZE / 2;

const RADIUS = 36;

const MASTER_NODE = {
	x: 0,
	y: 2
}

svg.setAttribute('width', SIZE);
svg.setAttribute('height', SIZE);

function lerp(start, end, amt) {
	return start * (1 - amt) + amt * end;
}

function cosineInterpolate(y1, y2, amt) {
	let amt2 = (1 - Math.cos(amt * Math.PI)) / 2;
	return(y1 * (1 - amt2)) + (y2 * amt2);
}

const setPosition = (svgObject, {
	x,
	y
}) => {
	svgObject.setAttribute('cx', x);
	svgObject.setAttribute('cy', y);
}

/**** create array of circleMatrix ****/
let circleMatrix = [];
for(let x = 0; x < COUNT; x++) {
	for(let y = 0; y < COUNT; y++) {
		const circle = document.createElementNS(xmlns, 'circle');

		circle.setAttribute('r', RADIUS);

        // fill="none" stroke="#fff" stroke-width="5" stroke-miterlimit="10"
		setPosition(circle, {
			x: SIZE / 2,
			y: SIZE / 2
		})

		circle.speed = 4.5;

		const posX = INIT_OFFSET + UNIT_SIZE * x;
		const posY = INIT_OFFSET + UNIT_SIZE * y;

		circle.finalPos = {
			x: posX,
			y: posY
		}

		circle.finalRadius = RADIUS * 0.45;

        circle.setAttribute('fill', '#fff');

        if(x === MASTER_NODE.x && y === MASTER_NODE.y) {

			circle.finalRadius = RADIUS * 1.17;
		} else {
            // circle.setAttribute('fill', 'none');
            // circle.setAttribute('stroke', '#fff');
            // circle.setAttribute('stroke-width', '9');
            // circle.setAttribute('stroke-miterlimit', '30');
        }

		if(!circleMatrix[x]) {
			circleMatrix[x] = []
		}

		circleMatrix[x][y] = circle;
		svg.appendChild(circle);
	}
}

let activeAnim = blooming;

function matrixAnimation(animFx) {
	let finished = false;
	circleMatrix.map((circles) => {
		circles.map((circle) => {
			finished = animFx(circle)
		})
	})
	return finished;
}


function blooming() {
	if(matrixAnimation(moveToFinalPos)) {
		activeAnim = bursting

        svg.appendChild(orbitPath({
			x: INIT_OFFSET + UNIT_SIZE * (MASTER_NODE.x + 0.5),
			y: INIT_OFFSET + UNIT_SIZE * (MASTER_NODE.y - 0.5)
		 }))

        const masterNode = circleMatrix[MASTER_NODE.x][MASTER_NODE.y];
        // masterNode.setAttribute('fill', 'none');
        // masterNode.setAttribute('stroke', '#fff');
        // masterNode.setAttribute('stroke-width', '13.5');

        svg.appendChild(outlineRect())
	}
}

function bursting() {
	if(matrixAnimation(expandSize)) {
		activeAnim = null;
	}
}

const animLoop = setInterval(function () {
	if(activeAnim === null) {
		console.log("FINISHED");
		clearInterval(animLoop)
	} else {
		activeAnim()
	}
}, 1000 / 60);


function expandSize(circle) {
    if (circle.expandSize) {
        return true;
    }

	const currentRadius = parseFloat(circle.getAttribute('r'));

	if(Math.round(currentRadius) === Math.round(circle.finalRadius) ) {
        circle.expandSize = true;
        return true;
	}

    const radius = lerp(currentRadius, circle.finalRadius, 0.1);

    circle.setAttribute('r', radius);

	return false;
}

function moveToFinalPos(circle) {
    if (circle.moveToFinalPos) {
        return true;
    }
	const currentX = parseFloat(circle.getAttribute('cx'));
	const currentY = parseFloat(circle.getAttribute('cy'));

	if(Math.round(currentX) === Math.round(circle.finalPos.x) &&
		Math.round(currentY) === Math.round(circle.finalPos.y)) {
        circle.moveToFinalPos = true;
		return true;
	}
    const x = cosineInterpolate(currentX, circle.finalPos.x, 0.1);
	const y = cosineInterpolate(currentY, circle.finalPos.y, 0.1);

	setPosition(circle, {
		x,
		y
	})

	return false;
}

function orbitPath({
	x,
	y
}) {
	const group = document.createElementNS(xmlns, 'g');
    // group.setAttribute("transform", `matrix(1, -1, 0.45, 0.45, ${x}, ${y})`)
	group.setAttribute("transform", `matrix(1, -1, 1, 1, ${x}, ${y})`)
	const path = document.createElementNS(xmlns, 'path');

	path.setAttribute("d",
		"M 0,70 A 65,70 0 0,0 65,0 5,5 0 0,1 75,0 75,70 0 0,1 0,70Z");

	path.setAttribute("fill", "#FFF")

	const animate = document.createElementNS(xmlns, 'animateTransform');

	animate.setAttribute("attributeName", "transform")
	animate.setAttribute("type", "rotate")
	animate.setAttribute("from", "360 0 0")
	animate.setAttribute("to", "0 0 0")
	animate.setAttribute("dur", "1s")
	animate.setAttribute("repeatCount", "indefinite")

	path.appendChild(animate)
	group.appendChild(path)

	return group;
}

function outlineRect() {
    const rect = document.createElementNS(xmlns, 'rect');
    rect.setAttribute("fill", "none");
    rect.setAttribute("height", SIZE - UNIT_SIZE);
    rect.setAttribute("width", SIZE - UNIT_SIZE);

    rect.setAttribute('stroke', '#fff');
    rect.setAttribute('stroke-width', '9');

    rect.setAttribute('x', UNIT_SIZE/2);
    rect.setAttribute('y', UNIT_SIZE/2);

    return rect;
}
