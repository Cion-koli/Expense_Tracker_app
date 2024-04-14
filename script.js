const expenseForm = document.getElementById('expense-form');
const monthlyExpensesTable = document.getElementById('monthly-expenses').getElementsByTagName('tbody')[0];
const dailyExpensesTable = document.getElementById('daily-expenses').getElementsByTagName('tbody')[0];

let expenses = []; // Array to store expenses

expenseForm.addEventListener('submit', function(event) {

  alert("expense added");
  event.preventDefault(); // Prevent default form submission

  const date = document.getElementById('date').value;
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  // Validate input (optional)
  if (!date || !description || !amount || !category) {
    alert('Please fill in all fields.');
    return;
  }

  const expense = {
    date,
    description,
    amount,
    category,
  };

  expenses.push(expense); // Add expense to the array

  // Clear form fields
  expenseForm.reset();

  updateExpenses(); // Update UI with new expenses
});

function updateExpenses() {
  // Clear existing table rows
  monthlyExpensesTable.innerHTML = '';
  dailyExpensesTable.innerHTML = '';

  // Calculate monthly totals
  const monthlyData = {};
  for (const expense of expenses) {
    const month = new Date(expense.date).getMonth(); // Get month (0-indexed)
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    monthlyData[month] += expense.amount;
  }

  // Create rows for monthly expenses
  for (const month in monthlyData) {
    const monthName = new Date(0, month).toLocaleDateString('en-US', { month: 'long' }); // Get month name
    const row = document.createElement('tr');
    const monthCell = document.createElement('td');
    monthCell.textContent = monthName;
    const totalCell = document.createElement('td');
    totalCell.textContent = `$${monthlyData[month].toFixed(2)}`;
    row.appendChild(monthCell);
    row.appendChild(totalCell);
    monthlyExpensesTable.appendChild(row);
  }

  // Create rows for daily expenses
  for (const expense of expenses) {
    const row = document.createElement('tr');
    const dateCell = document.createElement('td');
    dateCell.textContent = expense.date;
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = expense.description;
    const amountCell = document.createElement('td');
    amountCell.textContent = `$${expense.amount.toFixed(2)}`;
    const categoryCell = document.createElement('td');
    categoryCell.textContent = expense.category;
    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      expenses = expenses.filter(item => item !== expense); // Remove expense from array
      updateExpenses(); // Update UI again
    });
    deleteCell.appendChild(deleteBtn);
    row.appendChild(dateCell);
    row.appendChild(descriptionCell);
    row.appendChild(amountCell);
    row.appendChild(categoryCell);
    row.appendChild(deleteCell);
    dailyExpensesTable.appendChild(row);
  }
}
