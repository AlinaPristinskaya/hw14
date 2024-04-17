
        // Function to load or initialize data in session storage
        function loadData() {
            // Check if data is already in session storage, if not, initialize it
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
        }

        // Function to add new entry
        function addEntry(type) {
            let name = prompt(`Enter the name of the ${type}:`);
            let amount = parseFloat(prompt(`Enter the amount of the ${type}:`));
            let recurring = confirm("Is this a recurring " + type + "?");

            let newEntry = { name: name, amount: amount, recurring: recurring };
            let entries = JSON.parse(sessionStorage.getItem(type));
            entries.push(newEntry);
            sessionStorage.setItem(type, JSON.stringify(entries));
        }

        // Function to calculate and display results
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

        // Execute functions on load
        window.onload = function() {
            loadData();
            addEntry('income');
            addEntry('expenses');
            displayResults();
        }
