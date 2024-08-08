import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../utils/LocalStorage";
import SumInput from "./SumInputEachExpense";

function PageMonth() {
  const { monthId } = useParams();
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useLocalStorage("displayValue", {});
  const [elements, setElements] = useState([]);
  const btnAddExpenseRef = useRef(null);

  const [showModalAddExpense, setShowModalAddExpense] = useState(false);
  const [valueNameExpense, setValueNameExpense] = useState("");
  const [expenses, setExpenses] = useState([]);

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

    const storedElements =
      JSON.parse(window.localStorage.getItem(`elements-${monthName}`)) || [];
    setElements(storedElements);

    const storedExpenses =
      JSON.parse(window.localStorage.getItem(`expenses-${monthName}`)) || [];
    setExpenses(storedExpenses);
  }, [monthName, displayValue]);

  function handleClick() {
    setDisplayValue((prev) => ({
      ...prev,
      [monthName]: value,
    }));
  }

  //
  // function addElement() {
  //   const newElement = "";
  //   const updatedElements = [...elements, newElement];
  //   setElements(updatedElements);

  //   //LOCALSTORAGE SET EL
  //   window.localStorage.setItem(
  //     `elements-${monthName}`,
  //     JSON.stringify(updatedElements)
  //   );
  // }

  // useEffect(() => {
  //   const btnAddExpense = btnAddExpenseRef.current;
  //   if (btnAddExpense) {
  //     btnAddExpense.addEventListener("click", addElement);
  //   }

  //   return () => {
  //     if (btnAddExpense) {
  //       btnAddExpense.removeEventListener("click", addElement);
  //     }
  //   };
  // }, [elements, monthName]);

  //SHOW MODAL TO ASS AN EXPENSE
  function handleShowModalAddExpense() {
    setShowModalAddExpense(!showModalAddExpense);
  }

  //ADD NAME OF EXPENSE
  function addNameOfExpense(e) {
    setValueNameExpense(e.target.value);
  }

  //ADD NEW ELEMENT
  function addNewExpense() {
    if (valueNameExpense.trim() !== "") {
      const updatedExpenses = [...expenses, valueNameExpense];
      setExpenses(updatedExpenses);
      setValueNameExpense("");

      window.localStorage.setItem(
        `expenses-${monthName}`,
        JSON.stringify(updatedExpenses)
      );
    }
    setShowModalAddExpense(!showModalAddExpense);
  }

  return (
    <div>
      <h1>{monthName}</h1>
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

        <button onClick={handleShowModalAddExpense} className="">
          CLICK HERE
        </button>
        {showModalAddExpense && (
          <div>
            <h3>Add name of expense here:</h3>
            <input
              value={valueNameExpense}
              type="text"
              placeholder="Fuel, Grocery ..."
              onChange={addNameOfExpense}
            />
            <button onClick={addNewExpense} ref={btnAddExpenseRef}>
              ADD New Expense
            </button>
          </div>
        )}

        <div>
          {expenses.map((expense, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 mb-10 border border-red-500"
            >
              <SumInput monthName={monthName} />
              {expense}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageMonth;
