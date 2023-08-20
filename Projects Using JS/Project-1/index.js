const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");

//const-->unchangable | let-->changable
let isDOBOpen = false;
const toggleDOBSelector = () => {
	if(isDOBOpen) {
		settingContentEl.classList.add("hide");
	}
	else {
		settingContentEl.classList.remove("hide");
	}
	isDOBOpen = !isDOBOpen;

	// console.log("Toggle",isDOBOpen);
};

settingCogEl.addEventListener("click", toggleDOBSelector);

let DOB;
const intialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl =document.getElementById("dobInput");

//Date of Birth Updating code
const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigit = (number) => {
	return number > 9 ? number : `0${number}`;
};

const updateAge = () => {
	const currentDate = new Date();
	// console.log({ currentDate }); //-->gives current date
	const dateDiff = currentDate - DOB;
	// console.log("dateDiff", dateDiff);//-->gives difference in miliseconds
	const year = Math.floor(dateDiff/(1000*60*60*24*365));
	const month = Math.floor((dateDiff/(1000*60*60*24*365))%12);
	const day = Math.floor((dateDiff/(1000*60*60*24))%30);
	const hour = Math.floor((dateDiff/(1000*60*60))%24);
	const minute = Math.floor((dateDiff/(1000*60))%60);
	const second = Math.floor((dateDiff/(1000))%60);
	//console.log({year, month, day,hour,minute,second});
	yearEl.innerHTML = makeTwoDigit(year);
	monthEl.innerHTML = makeTwoDigit(month);
	dayEl.innerHTML = makeTwoDigit(day);
	hourEl.innerHTML = makeTwoDigit(hour);
	minuteEl.innerHTML = makeTwoDigit(minute);
	secondEl.innerHTML = makeTwoDigit(second);

};

const localStorageGetter = () => {
	//Adding stuffs to avoid restart by refreshing
	const year = localStorage.getItem("year");
	const month = localStorage.getItem("month");
	const date = localStorage.getItem("date");
	const hour = localStorage.getItem("hour");
	const minute = localStorage.getItem("minute");
	const second = localStorage.getItem("second");
	if(year && month && date && hour && minute && second)
	{
		DOB = new Date(year, month, date, hour, minute, second);
	}
	setInterval(() => updateAge(),1000);
};
const contentToggler = () => {
	if (DOB) {
		intialTextEl.classList.add("hide");
		afterDOBBtnTxtEl.classList.remove("hide");
	}
	else {
		afterDOBBtnTxtEl.classList.add("hide");
		intialTextEl.classList.remove("hide");
	}
};

const setDOBHandler = () => {
	//DOB = dobInputEl.value;//-->getting value in this direct way give NaN-error/issue
	const datestring = dobInputEl.value;
	

	// DOB = new Date(datestring);//--> doing so as to make currentDate comparable to it.
	//above is creating issue that it is taking random variable even when no value is assign.

	DOB = datestring ? new Date(datestring) : null;

	


	if (DOB) {
		localStorage.setItem("year", DOB.getFullYear());
		localStorage.setItem("month", DOB.getMonth());
		localStorage.setItem("date", DOB.getDate());
		localStorage.setItem("hour", DOB.getHours());
		localStorage.setItem("minute", DOB.getMinutes());
		localStorage.setItem("second", DOB.getSeconds());
		//updateAge();
	}
	setInterval(() => updateAge(),1000);//-->basically calls above funtion in interval of each second

	// console.log("DOB:",DOB);
};

localStorageGetter();
contentToggler();

dobButtonEl.addEventListener("click", setDOBHandler);


