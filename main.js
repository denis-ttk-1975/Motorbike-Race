const score = document.querySelector('.score'),
		start = document.querySelector('.start'),
		gameArea = document.querySelector('.gameArea'),
		car = document.createElement('div');

car.classList.add('car');

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

const setting = {
	start: false,
	score: 0,
	speed: 5,
	traffic: 3,
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame() {
	start.classList.add('hide');
	setting.start = true;

	for (let i = 0; i < getQuantityElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.appendChild(line);

	}

	for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
		const enemy = document.createElement('div');
		enemy.classList.add('enemy');
		enemy.y = -100 * setting.traffic * (i + 1);
		enemy.style.top = enemy.y + 'px';
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		enemy.style.backgroundImage = 'url(./image/enemy.png)';
		gameArea.appendChild(enemy);

	}
	
	gameArea.appendChild(car);
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
};

function playGame() {

	if (setting.start) {
		
		moveRoad();
		moveEnemy();

		if (keys.ArrowLeft && setting.x > 3) {
			setting.x -= setting.speed;
		}
		if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - 53)) {
			setting.x += setting.speed;
		}

		car.style.left = setting.x + 'px';

		if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - 105)) {
			setting.y += setting.speed;
		}
		if (keys.ArrowUp && setting.y > 5) {
			setting.y -= setting.speed;
		}

		car.style.top = setting.y + 'px';
		requestAnimationFrame(playGame);
	};
	
};

function startRun(event) {
		event.preventDefault();
		keys[event.key] = true;
};

function stopRun(event) {
		event.preventDefault();
		keys[event.key] = false;
};

function getQuantityElements(heightElement) {
	return Math.ceil(document.documentElement.clientHeight / heightElement + 1);
}

function moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach(function(line) {
		line.y += setting.speed;
		line.style.top = line.y + 'px';
		if (line.y >= document.documentElement.clientHeight) {
			line.y = -100;
		}
	});
}

function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
	enemy.forEach(function(item) {
		item.y += setting.speed / 2;
		item.style.top = item.y + 'px';
		if (item.y >= document.documentElement.clientHeight) {
			item.y = -100 * setting.traffic;
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
			if (Math.random() * 2 < 1) {
				item.style.backgroundImage = 'url(./image/enemy2.png)';
			}
		}

	});
}
