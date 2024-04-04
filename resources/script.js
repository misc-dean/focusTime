//* global variables and default starting ✅
const time = {
	work: {
		min: 25,
		_sound: './resources/sounds/Work_Pen-Click.mp3',
		element: document.querySelector(`#work`),
		display: document.querySelector(`#work-time`),
		select: document.querySelector(`#work-select`),
		switchTo: 'rest',
		message: 'Time to Focus on your work!',
	},
	rest: {
		min: 5,
		_sound: './resources//sounds/Rest_Rolling-Office-Chair.mp3',
		element: document.querySelector(`#rest`),
		display: document.querySelector(`#rest-time`),
		select: document.querySelector(`#rest-select`),
		switchTo: 'work',
		message: 'Time for a break.',
	},
};
const timeModule = document.querySelector(`#timeModule`);

//* object access by dot notation ✅
const reset = () => {
	time.work.display.innerHTML = time.work.min;
	time.rest.display.innerHTML = time.rest.min;
};
reset();
////
//* change the timers values if a selection change is made. ✅
const handleTimeChange = (type) => {
	//* object access by bracket
	time[type]['min'] = time[type]['select'].value;
	time[type]['display'].innerHTML = time[type]['select'].value;
};
////
// * Stop/Start Button (ssBtn) funtion selection control ??? ???
const handleButton = () => {
	const ssBtn = document.querySelector(`#ssBtn`);
	if (ssBtn.innerHTML === 'start') {
		sound(time.work._sound, 0);
		//RUN TIMER FUNCTION
		timer('work', time.work.min);
		ssBtn.innerHTML = 'stop';
	} else {
		//STOP TIMER FUNCTION
		clearInterval(timer_interval);
		ssBtn.innerHTML = 'start';
		reset();
		timeModule.classList.remove('rest', 'work');
	}
};
////
// timer variable global scope
let timer_interval;
//* count down timer ✅
const timer = (type, min) => {
	const notification = new Notification(time[type]['message']);
	timeModule.classList.add(type);
	sound(time[type]['_sound']);
	// get the time right now and add the min to get calc target
	const target = new Date().getTime() + min * 1000 * 60;
	//
	timer_interval = setInterval(() => {
		const now = new Date().getTime();
		const distance = target - now;
		//
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
			.toString()
			.padStart(2, '0');
		let seconds = Math.floor((distance % (1000 * 60)) / 1000)
			.toString()
			.padStart(2, '0');
		// less then 1000 milliseconds is less than a secoond reder will be 0 at this point
		if (distance < 0) {
			time[type].display.innerHTML = min;
			timeModule.classList.remove(type);
			// delay switching timers
			setTimeout(() => {
				clearInterval(timer_interval);
				// new timer
				timer(time[type]['switchTo'], time[time[type]['switchTo']]['min']);
			}, 500);
		} else {
			time[type].display.innerHTML = minutes + ':' + seconds;
		}
	}, 200);
};
////
let mute = false;
let volume = 0.8;
//* the mute or volume function ✅
const handleMute = () => {
	if (mute) {
		document.querySelector(`.sound`).classList.remove('mute');
		mute = false;
		volume = 0.8;
	} else {
		document.querySelector(`.sound`).classList.add('mute');
		mute = true;
		volume = 0;
	}
};
//* play the sound ✅
const sound = (path, vol = volume) => {
	const audio = document.querySelector('#sound');
	audio.src = path;
	audio.volume = vol;
	audio.play();
};
////
//! END!

// ask user to notify them when timer finishes
function notifyAsk() {
	if (!('Notification' in window)) {
		// Check if the browser supports notifications
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		// Check whether notification permissions have already been granted;
		// if so, create a notification
		// const notification = new Notification("Hi there!");
	} else if (Notification.permission !== 'denied') {
		// We need to ask the user for permission
		Notification.requestPermission().then((permission) => {
			// If the user accepts, let's create a notification
			if (permission === 'granted') {
				// const notification = new Notification("Hi there!");
			}
		});
	}

	// At last, if the user has denied notifications, and you
	// want to be respectful there is no need to bother them anymore.
}
notifyAsk();
