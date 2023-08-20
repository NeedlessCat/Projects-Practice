const calculateFormEl = document.getElementById("calculateForm");
const calculateMarks = (event) => {
	const maxmarks = 400;
	event.preventDefault();//--> prevent default actions like refreshing the page by clicking on submit.

	const formData = new FormData(calculateFormEl);
	const data = {};
	formData.forEach((value,key) => {
		data[key] = +value;//-->+ changes the datatype of value from string to number.

	});

	const totalMarks = data.maths + data.english + data.hindi + data.science;
	const precentage = Math.round((totalMarks/maxmarks)*100);
	
	// const resultEl = document.createElement("p");
	// resultEl.className = "result";

	const resultEl = document.getElementById("result");
	
	resultEl.innerText = `You have gor ${totalMarks} marks out of ${maxmarks} and your precentage is ${precentage}%`;
	// calculateFormEl.after(resultEl);
};