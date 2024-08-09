function DeleteExpense({
  monthName,
  expensesName,
  setExpensesName,
  expense,
  setOverallSum,
}) {
  function handleDeleteExpense(expenseId) {
    const deletedExpenseSum =
      parseFloat(localStorage.getItem(`sum-${monthName}-${expenseId}`)) || 0;
    const updatedExpenses = expensesName.filter(
      (expense) => expense.id !== expenseId
    );
    setExpensesName(updatedExpenses);

    setOverallSum((prevOverallSum) => prevOverallSum - deletedExpenseSum);

    if (updatedExpenses.length === 0) {
      window.localStorage.setItem(`sum-${monthName}`, 0);
    }

    window.localStorage.setItem(
      `expenses-${monthName}`,
      JSON.stringify(updatedExpenses)
    );

    localStorage.removeItem(`sum-${monthName}-${expenseId}`);
  }
  return (
    <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
  );
}

export default DeleteExpense;
