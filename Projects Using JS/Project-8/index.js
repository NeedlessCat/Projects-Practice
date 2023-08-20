const state = {
    earnings: 0,
    expense: 0,
    net: 0,
    transactions: [
        // {
        //     id: 23,
        //     text: "Demo",
        //     amount: 500,
        //     type: "credit"
        // },
        // {
        //     id: 5,
        //     text: "Demo Debit",
        //     amount: 400,
        //     type: "debit"
        // },
    ],
};

let isUpdate = false;
let tid;

const transactionFormEl = document.getElementById("transactionForm");

//showing the list to the page in transactions section
const renderTransactions = () => {
    const transactionContainerEl = document.querySelector(".transactions");/*Seach about querySelector to learn*/
    const netAmountEl = document.getElementById("netAmount");
    const earningEl = document.getElementById("earning");
    const expenseEl = document.getElementById("expense");

    const transactions = state.transactions;

    let earning =0;
    let expense = 0;
    let net =0;
    transactionContainerEl.innerHTML = "";
    transactions.forEach((transaction) => {
        const {id, amount, text, type} = transaction;
        const isCredit = type == "credit" ? true : false;
        const sign = isCredit ? "+" : "-";

        const transactionEl = 
        `<div class="transaction" id="${id}">
            <div class="content" onclick="showEdit(${id})">
                <div class="left">
                    <p>${text}</p>
                    <p>${sign} Rs. ${amount}</p>
                </div>
                <div class="status ${isCredit ? "credit" : "debit"}">${isCredit ? "C" : "D"}</div>  
            </div>
            <div class="lower">
                <div class="icon" onclick="handleDelete(${id})">
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div class="icon" onclick="handleUpdate(${id})">
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
        </div>`;

        earning += isCredit? amount : 0;
        expense += isCredit ? 0 : amount;
        net = earning - expense;
        // transactionContainerEl += transactionEl /*Adds the element in bottom */
        transactionContainerEl.insertAdjacentHTML("afterbegin", transactionEl);
    });
    netAmountEl.innerHTML = `${net}`;
    earningEl.innerHTML = `${earning}`;
    expenseEl.innerHTML = `${expense}`;
};

//Handling the credits and debits as entered by used..
const addTransaction = (e) => {
    e.preventDefault();
    const formData = new FormData(transactionFormEl);
    const tdata = {};
    
    console.log(e);//--> gives a submitter options.(useful)
    
    const isEarn = e.submitter.id == "earnBtn" ? true : false;

    formData.forEach((value, key) => {
        tdata[key] = value;
    });

    const {text, amount} = tdata;
    const transaction = {
        id: isUpdate ? tid : Math.floor(Math.random() * 1000),/*generate id of 4-digits*/
        text: text,
        amount: +amount,
        type: isEarn ? "credit" : "debit",
    };

    if(isUpdate) {
        const tIndex = state.transactions.findIndex((t) => t.id == tid);

        state.transactions[tIndex] = transaction;
        isUpdate = false;
        tid = null;
    }
    else {
        state.transactions.push(transaction);
    }

    //state.transactions.push(transaction);
    renderTransactions();
    
    transactionFormEl.reset();
    console.log({state});
    console.log({tdata});
};

const showEdit = (id) => {
    // console.log("id",id);
    const selectTransaction = document.getElementById(id);
    const lowerEl = selectTransaction.querySelector(".lower");

    lowerEl.classList.toggle("showTransaction");
};

const handleDelete = (id) => {
    /*Copying all element in list except of that id. */
    const filterTransaction = state.transactions.filter((t) => !(t.id == id));
    state.transactions = filterTransaction;
    renderTransactions();
};

const handleUpdate = (id) => {
    const transaction = state.transactions.find((t) => t.id == id);
    
    const {text, amount} = transaction;
    const textInput = document.getElementById("text");
    const amountInput = document.getElementById("amount");
    textInput.value = text;
    amountInput.value = amount;

    //Handling the creation of new line by updating
    tid=id;
    isUpdate = true;
};
renderTransactions();
transactionFormEl.addEventListener("submit", addTransaction)