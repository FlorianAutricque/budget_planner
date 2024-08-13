import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../utils/LocalStorage";

import PieChart from "../components/PieChart";
import DragAndDrop from "../components/DragAndDrop";
import SumInputEachExpense from "../components/SumInputEachExpense";
import DeleteExpense from "../components/DeleteExpense";

import { IoIosAddCircle } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

function PageMonth() {
  const { monthId } = useParams();

  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useLocalStorage("displayValue", {});
  const [showModalAddExpense, setShowModalAddExpense] = useState(false);
  const [valueNameExpense, setValueNameExpense] = useState("");
  const [expensesName, setExpensesName] = useState([]);
  const [overallSum, setOverallSum] = useState(0);

  const pie = document.getElementById("pie");
  const salary = document.getElementById("salary");
  const sum = document.getElementById("sum");
  const expenses = document.getElementById("expenses");
  const inputSalary = document.getElementById("inputSalary");

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
    setValue(displayValue[monthName] || "");

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
    toggleInputSalary();
  }

  //SHOW MODAL TO ADD AN EXPENSE
  function handleShowModalAddExpense() {
    setShowModalAddExpense(!showModalAddExpense);

    pie.classList.toggle("blur");
    salary.classList.toggle("blur");
    sum.classList.toggle("blur");
    expenses.classList.toggle("blur");
  }

  //HANDLE CLICK OUTSIDE MODAL
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModalAddExpense(false);
        if (pie) pie.classList.remove("blur");
        if (salary) salary.classList.remove("blur");
        if (sum) sum.classList.remove("blur");
        if (expenses) expenses.classList.remove("blur");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pie, salary, sum, expenses]);

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

    if (pie) pie.classList.remove("blur");
    if (salary) salary.classList.remove("blur");
    if (sum) sum.classList.remove("blur");
    if (expenses) expenses.classList.remove("blur");
  }

  //CALCUL SUM CHANGES
  function handleSumChange(expenseSum) {
    setOverallSum((prevOverallSum) => prevOverallSum + expenseSum);
  }

  //TOGGLE INPUT SALARY
  const toggleInputSalary = () => {
    inputSalary.classList.toggle("inputSalary");
  };

  return (
    <div className="px-[1rem]">
      <div id="pie">
        <PieChart monthName={monthName} expensesName={expensesName} />
      </div>

      <div>
        <div
          id="salary"
          className="flex flex-col items-center gap-8 rounded-3xl bg-white shadow-md mb-8 p-4"
        >
          <div id="inputSalary" className="flex gap-8">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              placeholder="Input your salary"
              className="bg-[var(--background-color)] border rounded-lg pl-2"
            />

            <button onClick={handleClick} className="btn">
              Add
            </button>
          </div>
          <span className="flex items-center justify-center gap-2">
            <p>Salary: {displayValue[monthName] || 0}</p>
            <p onClick={toggleInputSalary} className="cursor-pointer">
              <FaRegEdit />
            </p>
          </span>
        </div>

        <button
          onClick={handleShowModalAddExpense}
          className="z-50 fixed bottom-[70px] right-[10px]"
        >
          <IoIosAddCircle color="blue" size={50} />
        </button>
        {showModalAddExpense && (
          <div ref={modalRef} className="modal">
            <span
              onClick={handleShowModalAddExpense}
              className="fixed right-2 top-2 cursor-pointer"
            >
              <IoMdCloseCircleOutline size={20} />
            </span>
            <h3>Add a new expense:</h3>
            <input
              value={valueNameExpense}
              type="text"
              placeholder="Fuel, Grocery ..."
              onChange={addNameOfExpense}
              className="border rounded-md bg-[var(--background-color)]"
            />
            <button onClick={addNewExpense} className="btn">
              Add
            </button>
          </div>
        )}

        <div id="expenses">
          {expensesName.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col items-center gap-2 mb-10 rounded-3xl bg-white shadow-md p-4"
            >
              <p className="text-xl text-center">{expense.name}</p>
              <SumInputEachExpense
                monthName={monthName}
                expenseId={expense.id}
                onSumChange={handleSumChange}
              />
              <DeleteExpense
                monthName={monthName}
                expensesName={expensesName}
                setExpensesName={setExpensesName}
                expense={expense}
                setOverallSum={setOverallSum}
              />
            </div>
          ))}
        </div>

        {/* <div>
          <DragAndDrop
            expensesName={expensesName}
            setExpensesName={setExpensesName}
            monthName={monthName}
            handleSumChange={handleSumChange}
            setOverallSum={setOverallSum}
          />
        </div> */}
        <p id="sum" className="mb-[5rem]">
          Overall Sum: {overallSum}
        </p>
      </div>
    </div>
  );
}

export default PageMonth;
