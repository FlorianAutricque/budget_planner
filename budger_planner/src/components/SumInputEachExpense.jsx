import { useEffect, useState, useRef } from "react";

function SumInputEachExpense({ monthName, expenseId, onSumChange }) {
  const [inputValue, setInputValue] = useState("");
  const [sum, setSum] = useState(0);
  const previousSumRef = useRef(0);

  useEffect(() => {
    const storedSum = localStorage.getItem(`sum-${monthName}-${expenseId}`);
    if (storedSum) {
      const parsedSum = parseFloat(storedSum);
      setSum(parsedSum);
      previousSumRef.current = parsedSum;
    }
  }, [monthName, expenseId]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddValue = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const newSum = sum + numericValue;
      const difference = newSum - previousSumRef.current;
      setSum(newSum);
      localStorage.setItem(`sum-${monthName}-${expenseId}`, newSum);
      setInputValue("");
      onSumChange(difference);
      previousSumRef.current = newSum;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={sum === 0 ? "Enter a value" : "Add a new value"}
          className="bg-[var(--background-color)] border rounded-lg pl-2"
        />
        <button onClick={handleAddValue} className="btn">
          Add
        </button>
      </div>
      <div className="flex justify-between">
        <p>Total: </p>
        <p>
          <strong>€{sum.toLocaleString("de-DE")}</strong>
        </p>
      </div>
    </div>
  );
}

export default SumInputEachExpense;
