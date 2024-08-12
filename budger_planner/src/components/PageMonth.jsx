import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../utils/LocalStorage";

import PieChart from "./PieChart";
import DragAndDrop from "./DragAndDrop";

function PageMonth() {
  const { monthId } = useParams();

  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useLocalStorage("displayValue", {});
  const [showModalAddExpense, setShowModalAddExpense] = useState(false);
  const [valueNameExpense, setValueNameExpense] = useState("");
  const [expensesName, setExpensesName] = useState([]);
  const [overallSum, setOverallSum] = useState(0);

  const monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const monthName = monthNames[monthId] || "Unknown Month";

  //LOCALSTORAGE
  useEffect(() => {
    setValue(displayValue[monthName] || 0);

    const storedExpenses =
      JSON.parse(window.localStorage.getItem(`expenses-${monthName}`)) || [];
    setExpensesName(storedExpenses);

    let initialOverallSum = 0;
    storedExpenses.forEach((expense) => {
      const storedSum =
        parseFloat(localStorage.getItem(`sum-${monthName}-${expense.id}`)) || 0;
      initialOverallSum += storedSum;
    });
    setOverallSum(initialOverallSum);
  }, [monthName, displayValue]);

  function handleClick() {
    setDisplayValue((prev) => ({
      ...prev,
      [monthName]: value,
    }));
  }

  //SHOW MODAL TO ADD AN EXPENSE
  function handleShowModalAddExpense() {
    setShowModalAddExpense(!showModalAddExpense);
  }

  //ADD A NAME TO THAT EXPENSE
  function addNameOfExpense(e) {
    setValueNameExpense(e.target.value);
  }

  //ADD THAT NEW EXPENSE
  function addNewExpense() {
    if (valueNameExpense.trim() !== "") {
      const newExpense = { id: Date.now(), name: valueNameExpense };
      const updatedExpenses = [...expensesName, newExpense];
      setExpensesName(updatedExpenses);
      setValueNameExpense("");

      window.localStorage.setItem(
        `expenses-${monthName}`,
        JSON.stringify(updatedExpenses)
      );
    }
    setShowModalAddExpense(!showModalAddExpense);
  }

  function handleSumChange(expenseSum) {
    setOverallSum((prevOverallSum) => prevOverallSum + expenseSum);
  }

  return (
    <div className="px-[1rem]">
      <h1>{monthName}</h1>
      <PieChart monthName={monthName} expensesName={expensesName} />

      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border"
          type="number"
          placeholder="Input your salary"
        />
        <button onClick={handleClick}>Add</button>
        <p>Salary: {displayValue[monthName] || 0}</p>

        <button onClick={handleShowModalAddExpense}>CLICK HERE</button>
        {showModalAddExpense && (
          <div>
            <h3>Add name of expense here:</h3>
            <input
              value={valueNameExpense}
              type="text"
              placeholder="Fuel, Grocery ..."
              onChange={addNameOfExpense}
            />
            <button onClick={addNewExpense}>ADD New Expense</button>
          </div>
        )}

        <div>
          <DragAndDrop
            expensesName={expensesName}
            setExpensesName={setExpensesName}
            monthName={monthName}
            handleSumChange={handleSumChange}
            setOverallSum={setOverallSum}
          />
        </div>
        <p>Overall Sum: {overallSum}</p>
      </div>
    </div>
  );
}

export default PageMonth;
