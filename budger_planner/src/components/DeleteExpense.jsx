import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

function DeleteExpense({
  monthName,
  expensesName,
  setExpensesName,
  expense,
  setOverallSum,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteExpense = (expenseId) => {
    if (isDeleting) return;
    setIsDeleting(true);

    console.log("Deleting expense with ID:", expenseId);

    const deletedExpenseSum =
      parseFloat(localStorage.getItem(`sum-${monthName}-${expenseId}`)) || 0;
    console.log("Sum for deleted expense:", deletedExpenseSum);

    const updatedExpenses = expensesName.filter((exp) => exp.id !== expenseId);
    console.log("Updated expenses:", updatedExpenses);

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

    setIsDeleting(false);
  };

  return (
    <button
      onClick={() => handleDeleteExpense(expense.id)}
      disabled={isDeleting}
    >
      <TiDeleteOutline color="red" size={30} />
    </button>
  );
}

export default DeleteExpense;
