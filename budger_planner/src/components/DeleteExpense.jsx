import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

function DeleteExpense({
  monthIdParsed,
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
      parseFloat(localStorage.getItem(`sum-${monthIdParsed}-${expenseId}`)) ||
      0;
    console.log("Sum for deleted expense:", deletedExpenseSum);

    const updatedExpenses = expensesName.filter((exp) => exp.id !== expenseId);
    console.log("Updated expenses:", updatedExpenses);

    setExpensesName(updatedExpenses);
    setOverallSum((prevOverallSum) => prevOverallSum - deletedExpenseSum);
    if (updatedExpenses.length === 0) {
      window.localStorage.setItem(`sum-${monthIdParsed}`, 0);
    }
    window.localStorage.setItem(
      `expenses-${monthIdParsed}`,
      JSON.stringify(updatedExpenses)
    );
    localStorage.removeItem(`sum-${monthIdParsed}-${expenseId}`);

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
