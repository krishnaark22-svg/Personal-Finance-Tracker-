const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");

const description = document.getElementById("description");
const amount = document.getElementById("amount");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateUI() {

    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {

        const li = document.createElement("li");

        li.classList.add(
            transaction.amount > 0 ? "income" : "expense"
        );

        li.innerHTML = `
            ${transaction.description}
            <span>₹${transaction.amount}</span>
            <button class="delete-btn"
            onclick="deleteTransaction(${transaction.id})">
            X
            </button>
        `;

        list.appendChild(li);

        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense += Math.abs(transaction.amount);
        }
    });

    const totalBalance = totalIncome - totalExpense;

    balance.textContent = `₹${totalBalance.toFixed(2)}`;
    income.textContent = `₹${totalIncome.toFixed(2)}`;
    expense.textContent = `₹${totalExpense.toFixed(2)}`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    saveTransactions();
    updateUI();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        description: description.value,
        amount: Number(amount.value)
    };

    transactions.push(transaction);

    saveTransactions();
    updateUI();

    description.value = "";
    amount.value = "";
});

updateUI();
