let nextPosX = -50;
let nextPosY = -50;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const widthResolution = [1280, 1280, 1366, 1440, 1536, 1680, 1600, 1792, 1920, 2560];
const heighResolution = [720, 800, 768, 900, 864, 900, 1050, 1120, 1080, 1440];

const windowXSimetry =
	(Math.round(windowWidth / 100) * 2) % 2 === 1
		? Math.round(windowWidth / 100) * 2
		: Math.round(windowWidth / 100) * 2 + 1;

function createBackground() {
	const effectiveBackground = document.createElement('div');
	effectiveBackground.id = 'effectB';
	effectiveBackground.classList.add('effBack');
	document.body.insertAdjacentElement('afterbegin', effectiveBackground);
	for (let i = 0; i < Math.round(windowHeight / 100) * 2 + 1; i++) {
		for (let j = 0; j < windowXSimetry; j++) {
			const hexagon = document.createElement('div');
			hexagon.id = 'hexagon';
			hexagon.style.top = `${nextPosY}px`;
			hexagon.style.left = `${nextPosX}px`;
			effectiveBackground.append(hexagon);

			if (j % 2 == 0) {
				nextPosX += 76.5;
				nextPosY += 45.8;
			} else {
				nextPosX += 76.5;
				nextPosY -= 45.8;
			}
		}
		nextPosY += 46;
		nextPosX = -50;
	}
}
createBackground();
const colorColumnConstant = windowWidth / 5;
let colorPoint = 255 / colorColumnConstant;
window.addEventListener('mousemove', (e) => {
	let c1 = 0;
	let c2 = 0;
	let c3 = 50;

	let c4 = 0;
	let c5 = 0;
	let c6 = 50;

	if (e.clientX < colorColumnConstant) {
		c1 = e.clientX * (255 / colorColumnConstant);
		c2 = (colorColumnConstant - e.clientX) * colorPoint;
		c3 = (colorColumnConstant - e.clientX) * colorPoint;
	} else if (e.clientX > colorColumnConstant && e.clientX < colorColumnConstant * 2) {
		c1 = (colorColumnConstant * 2 - e.clientX) * colorPoint;
		c2 = (e.clientX - colorColumnConstant) * colorPoint;
	} else if (e.clientX > colorColumnConstant * 2 && e.clientX < colorColumnConstant * 3) {
		c2 = (colorColumnConstant * 3 - e.clientX) * colorPoint;
		c3 = (e.clientX - colorColumnConstant * 2) * colorPoint;
	} else if (e.clientX > colorColumnConstant * 3 && e.clientX < colorColumnConstant * 4) {
		c3 = (colorColumnConstant * 4 - e.clientX) * colorPoint;
		c4 = (e.clientX - colorColumnConstant * 3) * colorPoint;
		c2 = (e.clientX - colorColumnConstant * 3) * colorPoint;
	} else if (e.clientX > colorColumnConstant * 4) {
		c4 = (colorColumnConstant * 5 - e.clientX) * colorPoint;
		c2 = (colorColumnConstant * 5 - e.clientX) * colorPoint;
		c5 = (e.clientX - colorColumnConstant * 4) * colorPoint;
		c6 = (e.clientX - colorColumnConstant * 4) * colorPoint;
	}

	document.body.style.backgroundImage = `linear-gradient(to right,
    rgb(${c1},${c2}, ${c3}),
    rgb(${c4}, ${c5}, ${c6}))`;
});

let currentElement = '';
window.addEventListener('mousedown', (e) => {
	if (e.target.id === 'hexagon') {
		currentElement = e.target;
		const randSound = Math.trunc(Math.random() * (5 - 1) + 1);
		const randColor = (min = 0, max = 256) => {
			return Math.trunc(Math.random() * (max - min) + min);
		};
		currentElement.style.backgroundColor = `rgb(${randColor(200, 255)}, ${randColor(70, 165)}, 0)`;
		const audio = document.createElement('audio');
		audio.volume = 0.37;
		audio.src = `./sounds/spec/${randSound}.wav`;
		audio.load();
		audio.play();
		const tX = parseFloat(window.getComputedStyle(e.target).getPropertyValue('left'));
		const tY = parseFloat(window.getComputedStyle(e.target).getPropertyValue('top'));
		Dots(tX + 48, tY + 48);
	}
});

window.addEventListener('mouseup', () => {
	if (currentElement.id === 'hexagon') {
		currentElement.style.removeProperty('background-color');
	}
});

window.addEventListener('contextmenu', (e) => e.preventDefault());

const hoverAudio = document.createElement('audio');
hoverAudio.src = `./sounds/keypress.wav`;
hoverAudio.load();
window.addEventListener('mouseover', (e) => {
	if (e.target.tagName === 'A') {
		hoverAudio.play();
	}
});

function Dots(x, y) {
	for (let i = 0; i < 10; i++) {
		const dot = document.createElement('div');
		dot.classList.add('dot');
		dot.id = 'dt' + Math.trunc(Math.random() * 10000);
		document.body.insertAdjacentElement('afterbegin', dot);
		dot.style.left = x + 'px';
		dot.style.top = y + 'px';
		animateDot(dot, x, y);
	}
	function animateDot(dotElem, locX, locY) {
		let o = 1;
		const spdX = Math.trunc(Math.random() * (10 - 4) + 4);
		const spdY = Math.trunc(Math.random() * (10 - 4) + 4);
		const posX = Math.random() < 0.5 ? -1 * spdX : 1 * spdX;
		const posY = Math.random() < 0.5 ? -1 * spdY : 1 * spdY;

		const anim = setInterval(() => {
			locX += posX;
			locY += posY;
			o -= 0.02;
			dotElem.style.top = `${locY}px`;
			dotElem.style.left = `${locX}px`;
			dotElem.style.opacity = o;
			if (o <= 0) {
				dotElem.remove();
				clearInterval(anim);
			}
		}, 10);
	}
}

function fadeIn(elem, limit, iter, doElse) {
	let c = 0;
	const animBut = setInterval(() => {
		c += iter;
		elem.style.opacity = c;
		if (c >= limit) {
			clearInterval(animBut);
			doElse !== undefined ? doElse() : '';
		}
	}, 1000 / 25);
}

function fadeOut(elem, limit, iter, doElse) {
	let c = 1;
	const animBut = setInterval(() => {
		c -= iter;
		elem.style.opacity = c;
		if (c <= limit) {
			clearInterval(animBut);
			doElse !== undefined ? doElse() : '';
		}
	}, 1000 / 25);
}

const planet = document.getElementById('pl');
const buttonMenu = document.getElementById('bt-menu');
planet.onclick = () => {
	planet.classList.add('hide-planet');
	setTimeout(() => {
		planet.remove();
		buttonMenu.classList.add('d-flex');
		fadeIn(buttonMenu, 1, 0.1);
	}, 1500);
};

const backAudio = document.querySelector('.back-audio');
let clickOne = true;
let gVid;
buttonMenu.onclick = (e) => {
	if (clickOne) {
		clickOne = false;
		//Define elements
		const video = document.createElement('video');
		const vidSrc = document.createElement('source');
		vidSrc.src = './stock/BackVideoUniverse.mp4';
		video.classList.add('backvid');
		video.id = 'backvid';
		// video.currentTime = 175;
		video.volume = 0;
		video.append(vidSrc);
		buttonMenu.insertAdjacentElement('afterend', video);

		//Hide Menu Button
		fadeOut(buttonMenu, 0, 0.1, () => buttonMenu.remove());

		//Animate Video FadeIn
		let o = 0;
		const animVid = setInterval(() => {
			o += 0.01;
			video.style.opacity = o;
			if (o >= 0.97) {
				video.style.opacity = 1;
				clearInterval(animVid);
				document.getElementById('effectB').remove();
			}
		}, 1000 / 25);

		video.play();

		//Video Sound
		let vv = 0;
		const vidSound = setInterval(() => {
			vv += 0.01;
			video.volume = vv;
			if (video.volume >= 0.9) {
				video.volume = 1;
				clearInterval(vidSound);
			}
		}, 1000 / 25);

		backAudio.style.opacity = 0;
		backAudio.classList.add('b-loud');
		fadeIn(backAudio, 0.2, 0.01, () => backAudio.style.removeProperty('opacity'));

		//Add Screen
		const scr = document.createElement('img');
		scr.src = './screen.svg';
		scr.classList.add('screen');
		video.insertAdjacentElement('afterend', scr);
		setTimeout(() => {
			scr.classList.add('d-block');
			fadeIn(scr, 0.5, 0.01);
		}, 29500);
		const remScr = setInterval(() => {
			if (video.currentTime > video.duration - 10) {
				fadeOut(scr, 0, 0.02, () => scr.remove());
				clearInterval(remScr);
			}
		}, 1000 / 25);
		gVid = video;
		console.log(backAudio.className);
	}
};

function backAudioControl() {
	backAudio.onclick = () => {
		if (gVid.muted === false) {
			backAudio.classList.remove('b-loud');
			backAudio.classList.add('b-mute');
			gVid.muted = true;
		} else {
			backAudio.classList.remove('b-mute');
			backAudio.classList.add('b-loud');
			gVid.muted = false;
		}
	};
}
backAudioControl();

let resized = false;
const restricted = document.createElement('div');
const message = document.createElement('h1');

document.body.onresize = () => {
	if (!resized && (window.innerWidth < windowWidth || window.innerHeight < windowHeight)) {
		resized = true;
		restricted.classList.add('restrictedWindow');
		message.innerHTML = 'RESOLUTION CHANGED!';
		restricted.append(message);
		document.body.append(restricted);
		gVid !== undefined ? (gVid.muted = true) : '';
		if (backAudio.className.includes('b-loud')) {
			backAudio.classList.remove('b-loud');
			backAudio.classList.add('b-mute');
		}
	}
	if (resized) {
		let hasRest = false;
		const checkRest = setInterval(() => {
			for (let i = 0; i < document.body.children.length; i++) {
				if (document.body.children[i].className === 'restrictedWindow') {
					hasRest = true;
					return true;
				} else if (i === document.body.children.length - 1 && document.body.children[i] !== 'restrictedWindow') {
					hasRest = false;
				}
			}
			if (!hasRest) {
				restricted.classList.add('restrictedWindow');
				message.innerHTML = 'WHAT ARE YOU TRYING FOR? 😂';
				restricted.append(message);
				document.body.append(restricted);
			}
			if (!resized) {
				clearInterval(checkRest);
				restricted.remove();
			}
		}, 1000 / 25);
	}
	if (window.innerWidth === windowWidth || window.innerHeight === windowHeight) {
		resized = false;
		restricted.remove();
	}
};

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	restricted.classList.add('restrictedMobile');
	message.innerHTML = 'PLEASE VISIT WITH PC';
	restricted.append(message);
	document.body.append(restricted);
} else {
	let isRegisteredDevice = false;
	for (let i = 0; i < widthResolution.length; i++) {
		if (window.innerWidth === widthResolution[i] && window.screen.height === heighResolution[i]) {
			isRegisteredDevice = true;
		}
	}
	// if (!isRegisteredDevice) {
	// 	restricted.classList.add('restrictedWindow');
	// 	message.innerHTML = 'UNREGISERED DEVICE';
	// 	restricted.append(message);
	// 	document.body.append(restricted);
	// 	for (let j = 0; j < document.body.children.length - 1; j++) {
	// 		document.body.children[j].remove();
	// 	}
	// 	document.querySelector('.header').remove();
	// }
}
