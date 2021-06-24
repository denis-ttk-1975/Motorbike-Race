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
	speed: 3,
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame() {
	start.classList.add('hide');
	setting.start = true;
	
	gameArea.appendChild(car);
	setting.x = car.offsetLeft;
	setting.y = car.offsetTop;
	requestAnimationFrame(playGame);
};

function playGame() {
	console.log('Play game!!!!');
	if (setting.start) {
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
		if (keys.ArrowUp && setting.y > 3) {
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

