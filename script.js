let budget = 0;
let expenses = [];

const budgetInput = document.getElementById("budgetInput");
const addBudgetBtn = document.getElementById("addBudgetBtn");

const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const totalBudget = document.getElementById("totalBudget");
const totalExpenses = document.getElementById("totalExpenses");
const budgetLeft = document.getElementById("budgetLeft");

const expenseList = document.getElementById("expenseList");

const resetBtn = document.getElementById("resetBtn");

addBudgetBtn.addEventListener("click", function () {

    const budgetValue = Number(budgetInput.value);

    if (budgetValue <= 0 || budgetInput.value === "") {
        alert("Please enter a valid budget.");
        return;
    }

    budget = budgetValue;

    updateSummary();

    budgetInput.value = "";
});

addExpenseBtn.addEventListener("click", function () {

    const title = expenseTitle.value.trim();
    const amount = Number(expenseAmount.value);

    if (title === "") {
        alert("Please enter expense title.");
        return;
    }

    if (amount <= 0 || expenseAmount.value === "") {
        alert("Please enter a valid expense amount.");
        return;
    }

    const expense = {
        title: title,
        amount: amount
    };

    expenses.push(expense);

    displayExpenses();
    updateSummary();

    expenseTitle.value = "";
    expenseAmount.value = "";
});

function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (expense, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>₹${expense.amount}</td>
            <td>
                <button 
                    class="remove-btn"
                    onclick="removeExpense(${index})">
                    Remove
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    });
}

function removeExpense(index) {
    expenses.splice(index, 1);

    displayExpenses();
    updateSummary();
}

function updateSummary() {

    let expenseTotal = 0;

    expenses.forEach(function (expense) {
        expenseTotal += expense.amount;
    });

    const remaining = budget - expenseTotal;

    totalBudget.textContent = `₹${budget}`;
    totalExpenses.textContent = `₹${expenseTotal}`;
    budgetLeft.textContent = `₹${remaining}`;
}

resetBtn.addEventListener("click", function () {

    budget = 0;
    expenses = [];

    budgetInput.value = "";
    expenseTitle.value = "";
    expenseAmount.value = "";
    expenseList.innerHTML = "";

    updateSummary();
});