import { useEffect, useState } from "react";

function SumInput({ monthName }) {
  const [inputValue, setInputValue] = useState("");
  const [sum, setSum] = useState(0);

  //LOCALSTORAGE
  useEffect(() => {
    const storedSum = localStorage.getItem(`sum-${monthName}`);
    if (storedSum) {
      setSum(parseFloat(storedSum));
    }
  }, [monthName]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //CALCULATION OF VALUE INSIDE EL OF EXPENSE
  const handleAddValue = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const newSum = sum + numericValue;
      setSum(newSum);
      localStorage.setItem(`sum-${monthName}`, newSum);
      setInputValue("");
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
      <button onClick={handleAddValue}>Add</button>
      <p>Sum: {sum}</p>
    </div>
  );
}

export default SumInput;
