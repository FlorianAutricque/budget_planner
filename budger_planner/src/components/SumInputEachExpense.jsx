import { useEffect, useState } from "react";

function SumInputEachExpense({ monthName, expenseId, onSumChange }) {
  const [inputValue, setInputValue] = useState("");
  const [sum, setSum] = useState(0);

  // Fetch stored sum from localStorage when monthName or expenseId changes
  useEffect(() => {
    const storedSum = localStorage.getItem(`sum-${monthName}-${expenseId}`);
    if (storedSum) {
      setSum(parseFloat(storedSum));
    }
  }, [monthName, expenseId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddValue = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const newSum = sum + numericValue;
      setSum(newSum);
      localStorage.setItem(`sum-${monthName}-${expenseId}`, newSum);
      setInputValue("");
      onSumChange(newSum);
      console.log(`New sum for ${expenseId}: ${newSum}`);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
      <button onClick={handleAddValue} className="btn">
        Add
      </button>
      <p>Sum: {sum}</p>
    </div>
  );
}

export default SumInputEachExpense;
