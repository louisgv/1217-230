"use strict";
const BLOCKER_SIZE = 30;

let svg, xmlns, enemy, scoreElement, score, player;

const blockers = [];

function spawnBlocker() {
	const blocker = document.createElementNS(xmlns, 'rect');

	blocker.setAttribute("fill", "green");

	blocker.setAttribute("height", BLOCKER_SIZE);

	blocker.setAttribute("width", BLOCKER_SIZE);

	const {
		x,
		y
	} = getRandomPosition(enemy)
	blocker.setAttribute('x', x);
	blocker.setAttribute('y', y);

	blocker.velocity = {
		x: Math.random() * 3,
		y: Math.random() * 3
	};

    if( Math.random() > .5 ) blocker.velocity.x *= -1;
    if( Math.random() > .5 ) blocker.velocity.y *= -1;

	blockers.push(blocker)
	svg.appendChild(blocker)
}

function init() {
	svg = document.querySelector('svg'),
		xmlns = 'http://www.w3.org/2000/svg',
		player = svg.children[0],
		enemy = svg.children[1],
		scoreElement = svg.children[2],
		score = 0;
	window.addEventListener('mousemove', hitTest);

	positionEnemy();
}

function getRandomPosition() {
	return {
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight
	}
}

function positionEnemy() {
	const {
		x,
		y
	} = getRandomPosition()
	enemy.setAttribute('cx', x);
	enemy.setAttribute('cy', y);
}

function destroyEnemy() {
	score += 10;
	updateScore()
	positionEnemy();
}

function updateScore() {
	scoreElement.textContent = 'score: ' + score;
}

function resetGame() {
	score = 0;
	updateScore();
	positionEnemy();
	for(const blocker of blockers) {
		svg.removeChild(blocker)
	}

	while(blockers.length > 0) {
		blockers.pop();
	}
}

function hitTest(e) {
	const playerBBox = player.getBBox();
	if(svg.checkIntersection(enemy, playerBBox)) {
		destroyEnemy();
		spawnBlocker();
	}

	for(const blocker of blockers) {
		if(svg.checkIntersection(blocker, player.getBBox())) {
			resetGame()
			break;
		}
	}

	player.setAttribute('cx', e.clientX + 'px');
	player.setAttribute('cy', e.clientY + 'px');
}

function lerp(start, end, amt) {
	return start * (1 - amt) + amt * end;
}

function animate() {
	for(const blocker of blockers) {
        let x = parseFloat( blocker.getAttribute( 'x' ) );
        let y = parseFloat( blocker.getAttribute( 'y' ) );

        if (x >= window.innerWidth || x <= 0) {
            blocker.velocity.x *= -1;
        }

        if (y>= window.innerHeight || y <= 0) {
            blocker.velocity.y *= -1;
        }

        x += blocker.velocity.x;
        y += blocker.velocity.y
        blocker.setAttribute( 'x', x );
        blocker.setAttribute( 'y', y );


	}
    requestAnimationFrame( animate );
};

requestAnimationFrame(animate);

window.onload = init;
