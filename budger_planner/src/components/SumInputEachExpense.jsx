import { useEffect, useState } from "react";

function SumInput() {
  const [inputValue, setInputValue] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const storedSum = localStorage.getItem("sum");
    if (storedSum) {
      setSum(parseFloat(storedSum));
    }
  }, []);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddValue = () => {
    const numericValue = parseFloat(inputValue);
    if (!isNaN(numericValue)) {
      const newSum = sum + numericValue;
      setSum(newSum);
      localStorage.setItem("sum", newSum);
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
