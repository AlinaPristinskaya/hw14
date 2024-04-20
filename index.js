const refs = {
  tableBodyIncomes: document.querySelector(".js-incomes-table > tbody"),
  tableBodyExpenses: document.querySelector(".js-expenses-table > tbody"),
  registerFormAddIncom: document.querySelector(".form-addIncom"),
  registerFormAddExpens: document.querySelector(".form-addExpens"),
  totalIncome: document.querySelector(".total-income"),
  remaining: document.querySelector(".remaining"),
  savings: document.querySelector(".savind"),
  inputSaving: document.querySelector(".inputSavings"),
};

refs.registerFormAddIncom.addEventListener("submit", handleSubmit);
refs.registerFormAddExpens.addEventListener("submit", handleSubmit);

// Function to load or initialize data in session storage
function loadData() {
  // Checking if the data is already in the session store, if not, initializing it.
  if (!sessionStorage.getItem("income")) {
    const incomes = [
      { name: "Salary", amount: 4000, recurring: true },
      { name: "Freelance", amount: 1200, recurring: false },
      { name: "Rent", amount: 500, recurring: true },
      { name: "Dividends", amount: 300, recurring: true },
      { name: "Gift", amount: 150, recurring: false },
    ];
    const expenses = [
      { name: "Rent", amount: 1200, recurring: true },
      { name: "Groceries", amount: 350, recurring: true },
      { name: "Utilities", amount: 200, recurring: true },
      { name: "Transport", amount: 150, recurring: true },
      { name: "Gym", amount: 50, recurring: true },
    ];

    sessionStorage.setItem("income", JSON.stringify(incomes));
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
  }
  displayResults();
  updateResultsTable();
}
//function for calculating the resulting data
function displayResults(inputSaving) {
  let incomes = JSON.parse(sessionStorage.getItem("income"));
  let expenses = JSON.parse(sessionStorage.getItem("expenses"));

  let totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  let totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  let disposableIncome = totalIncome - totalExpenses;
  refs.totalIncome.innerHTML = `Total Disposable Income: $${disposableIncome}`;
  let savings = 0;
  let remaining = disposableIncome - savings;
  //inputSaving does not require conversion to a number
  // because savings was initialized like type number
  if (inputSaving) {
    savings = inputSaving;
    remaining = disposableIncome - inputSaving;
  }
  refs.inputSaving.value = "";
  refs.savings.innerHTML = `Savings: $${savings}`;
  refs.remaining.innerHTML = `Total Disposable Income left after savings: $${remaining}`;
}
//function of displaying data in a table
function updateResultsTable() {
  let incomes = JSON.parse(sessionStorage.getItem("income"));
  let expenses = JSON.parse(sessionStorage.getItem("expenses"));
  let newIncomes = incomes.map(
    (incom) =>
      `<tr><td>${incom.name}</td><td>${incom.amount}</td><td>${incom.recurring}</td></tr>`
  );
  let newExrpenses = expenses.map(
    (expens) =>
      `<tr><td>${expens.name}</td><td>${expens.amount}</td><td>${expens.recurring}</td></tr>`
  );
  refs.tableBodyIncomes.insertAdjacentHTML("beforeend", newIncomes);
  refs.tableBodyExpenses.insertAdjacentHTML("beforeend", newExrpenses);
}
//function of adding data by clicking on buttons
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.elements.name.value;
  const amount = form.elements.amount.value;
  const recurring = form.elements.recurring.value;
  if (name === "" || amount === "" || recurring === "recurring") {
    return alert("Please fill in all the fields!");
  }
  let newNote = { name: name, amount: parseInt(amount), recurring: recurring };
  if (form.id === "addIncom") {
    let incomes = JSON.parse(sessionStorage.getItem("income"));
    incomes.push(newNote);
    sessionStorage.setItem("income", JSON.stringify(incomes));
  } else {
    let expenses = JSON.parse(sessionStorage.getItem("expenses"));
    expenses.push(newNote);
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
  }
  form.reset();
  location.reload();
}


window.onload = function () {
  loadData();
};
// Sorry my English is not very good
// I'm not sure I fully understood the task
// It seemed to me that the use of promts and alert would not
//  be able to clearly display the data and changes 
//  that the user can make; I used markup in HTML
//  Also, the task statement does not say whether
//  it is necessary to save SAVING in session storage,
//  so this data is lost with every update