const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
let storedAns;
const scoreEl = document.getElementById("score");
let score=0;

const randomNum = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)+1);
};
// console.log("random", randomNum(0,10));

const getQuestion = () => {
	const num1 = randomNum(1,40);
	const num2 = randomNum(1,40);
	const questionType = randomNum(1,4);
	let question;
	let answer;

	switch(questionType) {
	case 1 : question = `Q. What is ${num1} added to ${num2}?`;
			 answer = num1 + num2; 
			 break;
	case 2 : if(num1 > num2) {
					question = `Q. What is ${num2} subtracted form ${num1}?`;
					answer = num1 - num2;
				}
			else {
					question = `Q. What is ${num1} subtracted form ${num2}?`;
					answer = num2 - num1;
				} 
				break;
	case 3 : question = `Q. What is ${num1} multiplied to ${num2}?`;
			 answer = num1 * num2; 
			 break;
	case 4 : if(num1 > num2) {
					question = `Q. What is ${num1} divided by ${num2}?`;
					answer = num1 / num2;
				}
			else {
					question = `Q. What is ${num2} divided by ${num1}?`;
					answer = num2 / num1;
				} 
				break;
	} ;
	console.log("question",question);
	console.log("answer", answer);
	return {question, answer};
}; 
// getQuestion();
const showQues = () => {
	const {question, answer} = getQuestion();
	questionEl.innerText = question;
	storedAns = answer; 
};
showQues();

const checkAns = (event) => {
	event.preventDefault();
	const formData = new FormData(questionFormEl);
	const getans =  parseInt(formData.get("answer")); //-->'+' do same as 'parseInt'.
	console.log("getans",getans);
	console.log("storedAns", storedAns);
	event.target.reset();
	if(storedAns==getans) {
		score+=1;
	}
	else score-=1;
	showQues();
	scoreEl.innerText = score;
};