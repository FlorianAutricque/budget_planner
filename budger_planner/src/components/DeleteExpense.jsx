import React, { useState } from "react";

function DeleteExpense({
  monthName,
  expensesName,
  setExpensesName,
  expense,
  setOverallSum,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteExpense = (expenseId) => {
    if (isDeleting) return; // Prevent multiple clicks
    setIsDeleting(true);

    console.log("Deleting expense with ID:", expenseId);

    const deletedExpenseSum =
      parseFloat(localStorage.getItem(`sum-${monthName}-${expenseId}`)) || 0;
    console.log("Sum for deleted expense:", deletedExpenseSum);

    const updatedExpenses = expensesName.filter((exp) => exp.id !== expenseId);
    console.log("Updated expenses:", updatedExpenses);

    // Update state and local storage
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

    setIsDeleting(false); // Allow further clicks after processing
  };

  return (
    <button
      onClick={() => handleDeleteExpense(expense.id)}
      disabled={isDeleting}
      className="btn"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteExpense;
