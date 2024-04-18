
const refs = {
    tableBodyIncomes: document.querySelector('.js-incomes-table > tbody'),
    tableBodyExpenses: document.querySelector('.js-expenses-table > tbody'),
    registerFormAddIncom: document.querySelector('.form-addIncom'),
    registerFormAddExpens: document.querySelector('.form-addExpens')
  };

refs.registerFormAddIncom.addEventListener('submit', handleSubmit);
refs.registerFormAddExpens.addEventListener('submit', handleSubmit);

      // Function to load or initialize data in session storage
        function loadData() {
            // Checking if the data is already in the session store, if not, initializing it.
            if (!sessionStorage.getItem('income')) {
                const incomes = [
                    { name: 'Salary', amount: 4000, recurring: true },
                    { name: 'Freelance', amount: 1200, recurring: false },
                    { name: 'Rent', amount: 500, recurring: true },
                    { name: 'Dividends', amount: 300, recurring: true },
                    { name: 'Gift', amount: 150, recurring: false }
                ];
                const expenses = [
                    { name: 'Rent', amount: 1200, recurring: true },
                    { name: 'Groceries', amount: 350, recurring: true },
                    { name: 'Utilities', amount: 200, recurring: true },
                    { name: 'Transport', amount: 150, recurring: true },
                    { name: 'Gym', amount: 50, recurring: true }
                ];

                sessionStorage.setItem('income', JSON.stringify(incomes));
                sessionStorage.setItem('expenses', JSON.stringify(expenses));
            }
            updateResultsTable()
        }
// // Function to calculate and display results
        function displayResults() {
            let incomes = JSON.parse(sessionStorage.getItem('income'));
            let expenses = JSON.parse(sessionStorage.getItem('expenses'));

            let totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
            let totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

            let disposableIncome = totalIncome - totalExpenses;
            alert(`Total Disposable Income: $${disposableIncome}`);

            let savings = parseFloat(prompt("How much of your disposable income would you like to put into savings?"));
            let remaining = disposableIncome - savings;

            alert(`Total Disposable Income left after savings: $${remaining}`);
        }
        function updateResultsTable() {
            let incomes = JSON.parse(sessionStorage.getItem('income'));
            let expenses = JSON.parse(sessionStorage.getItem('expenses'));
            let newIncomes=incomes.map(incom=>
                `<tr><td>${incom.name}</td><td>${incom.amount}</td><td>${incom.recurring}</td></tr>`)
            let newExrpenses=expenses.map(expens=>
                `<tr><td>${expens.name}</td><td>${expens.amount}</td><td>${expens.recurring}</td></tr>`)
            refs.tableBodyIncomes.insertAdjacentHTML('beforeend', newIncomes);        
            refs.tableBodyExpenses.insertAdjacentHTML('beforeend', newExrpenses);
            displayResults();
          }
        

          function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  
  const name = form.elements.name.value;
  const amount = form.elements.amount.value;
  const recurring=form.elements.recurring.value
  if (name === "" || amount === "" || recurring==="recurring") {
    return alert('Please fill in all the fields!');
  } 
  let newNote = { name: name, amount: amount, recurring: recurring };
  if(form.id==="addIncom"){
    let incomes = JSON.parse(sessionStorage.getItem('income'));
  incomes.push(newNote);
  sessionStorage.setItem('income', JSON.stringify(incomes));
  }else{
    
  let expenses = JSON.parse(sessionStorage.getItem('expenses'));
  expenses.push(newNote);
  sessionStorage.setItem('expenses', JSON.stringify(expenses)); 
  }
  
    
  form.reset();
  location.reload();
  

}
  

  
  // // Execute functions on load
        window.onload = function() {
            loadData();
            // addEntry('income');
            // addEntry('expenses');
            
        }
