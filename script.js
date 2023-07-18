// page title
const title = document.querySelector("#page-title");
// Timer element
const timer = document.querySelector("#timer");
// Stop / start button
const btn = document.querySelector("button");
// get work and rest container elements
const work = document.querySelector("#work");
const rest = document.querySelector("#rest");
// get sound element

// declare timers on the outside so they can be reomtly stoped
let work_timer_interval;
let rest_timer_interval;
const blank = "--:--:--";
//*************************************************//
//
function reset() {
  timer.innerHTML = blank;
  work.classList.remove("disabled");
  rest.classList.remove("disabled");
  btn.innerHTML = "start";
  clearInterval(work_timer_interval);
  clearInterval(rest_timer_interval);
}
reset();

// Sound function

//
// what happens when you press the button
function btn_click() {
  sound("/sounds/Rest _Rolling-Office-Chair.mp3", 0);
  console.log("click");
  if (timer.innerHTML === blank) {
    console.log("Go to work timer");
    worktimer();
    btn.innerHTML = "stop";
    notifyAsk();
  } else {
    console.log("sending to STOP");
    reset();
  }
}
//
//
//
function worktimer(type, hr, min) {
  console.log("work timer started");
  // work.innerHTML = "working";
  const notification = new Notification("Work timer started");
  rest.classList.remove("disabled");
  work.classList.add("disabled");

  const whr = document.querySelector("#work-hour").value;
  const wmin = document.querySelector("#work-min").value;

  let target = new Date().getTime();
  target = target + whr * 1000 * 60 * 60;
  target = target + wmin * 1000 * 60;

  work_timer_interval = setInterval(function () {
    var now = new Date().getTime();
    var distance = target - now;

    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    console.log(distance);

    if (distance > 0) {
      timer.innerHTML = hours + ":" + minutes + ":" + seconds;
      title.innerHTML = "working: " + hours + ":" + minutes + ":" + seconds;
    } else {
      clearInterval(work_timer_interval);
      const notification = new Notification("Take a break");
      switch_timer("work");
    }
  }, 1000);
}

function switch_timer(from) {
  console.log("switch");
  if (from === "work") {
    sound("/sounds/Rest _Rolling-Office-Chair.mp3", 1);
    resttimer();
  } else {
    sound("/sounds/Work_Pen-Click.mp3", 1);
    worktimer();
  }
}

function resttimer() {
  console.log("work timer started");
  work.classList.toggle("disabled");
  rest.classList.toggle("disabled");
  const rhr = document.querySelector("#rest-hour").value;
  const rmin = document.querySelector("#rest-min").value;

  let target = new Date().getTime();
  target = target + rhr * 1000 * 60 * 60;
  target = target + rmin * 1000 * 60;

  rest_timer_interval = setInterval(function () {
    var now = new Date().getTime();
    var distance = target - now;

    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    console.log(distance);
    if (distance > 0) {
      timer.innerHTML = hours + ":" + minutes + ":" + seconds;
      title.innerHTML = "resting: " + hours + ":" + minutes + ":" + seconds;
    } else {
      clearInterval(rest_timer_interval);
      const notification = new Notification("Back to work");
      switch_timer("rest");
    }
  }, 1000);
}

function sound(path, vol) {
  let audio = document.querySelector("#sound");
  audio.src = path;
  audio.volume = vol;
  audio.play();
}
//********************************FINISHED*************************** */
// the current time clock
const clock = document.querySelector("#clock");
setInterval(() => {
  const current_time = new Date();
  clock.innerHTML = current_time.toLocaleTimeString();
}, 1000);

function notifyAsk() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    // const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        // const notification = new Notification("Hi there!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
notifyAsk();
