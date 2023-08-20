let passwordLength = 8;

let isUpperCase = false;
let isNumbers = false;
let isSymbols = false;

const passwordRangeInputEl = document.getElementById("passRangeInput");
const passwordRangeValueEl = document.getElementById("passRangeValue");
const genBtnEl = document.getElementById("genBtn");
const passwordEl = document.getElementById("password");

//Generating the password as per the inputs by user...
const generatePassword = (passLength) => {
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = isUpperCase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "";
    const numbers = isNumbers ? "0123456789" : "";
    const symbols = isSymbols ? "!)@(#*$&%^%/-+*." : "";

    //Universal string..
    const passwordChar = lowercaseLetters + uppercaseLetters + numbers + symbols;

    let password = "";

    for(let i=0; i<passLength; i++) {
        const charIndex = Math.floor(Math.random() * passwordChar.length);
        password += passwordChar[charIndex];
    }
    return password;
};

//Show the Password Length when the slider is moved left or right.
passwordRangeInputEl.addEventListener("input", (e) => {
    passwordLength = +e.target.value;
    passwordRangeValueEl.innerText = passwordLength;
});

//Actions on clicking to Generate Password button...
genBtnEl.addEventListener("click", () => {
    const upperCaseCheckEl = document.getElementById("uppercase");
    const numbersCheckEl = document.getElementById("numbers");
    const symbolsCheckEl = document.getElementById("symbols");
    
    isUpperCase = upperCaseCheckEl.checked;
    isNumbers = numbersCheckEl.checked;
    isSymbols = symbolsCheckEl.checked;
    
    const password = generatePassword(passwordLength);
    passwordEl.innerHTML = password
    // console.log("password", password);
});

passwordEl.addEventListener("click", (e) => {
    if(e.target.innerText.length > 0)
    {
        navigator.clipboard.writeText(passwordEl.innerText)
        .then(() => {
            alert("Copied to clipboard");
        })
        .catch((err) => {
            alert("Could not Copy, TRY AGAIN!!");
        });
    }
});