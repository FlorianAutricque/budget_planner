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
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";

function PageMonth() {
  const { monthId } = useParams();

  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useLocalStorage("displayValue", {});
  const [showModalAddExpense, setShowModalAddExpense] = useState(false);
  const [valueNameExpense, setValueNameExpense] = useState("");
  const [expensesName, setExpensesName] = useState([]);
  const [overallSum, setOverallSum] = useState(0);
  const [salary, setSalary] = useState(0);
  const [moneySavedOrLoss, setMoneySavedOrLoss] = useState(0);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const pie = useRef(null);
  const salaryRef = useRef(null);
  const salaryRefInput = useRef(null);
  const sum = useRef(null);
  const expenses = useRef(null);
  const money = useRef(null);

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

  // LOCALSTORAGE
  useEffect(() => {
    setValue(displayValue[monthName] || "");
    setSalary(displayValue[monthName] || 0);

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

  //CALCUL SAVED OR LOSS
  useEffect(() => {
    setMoneySavedOrLoss(salary - overallSum);
  }, [overallSum, salary]);

  //HANDLE DISPLAY VALUE
  function handleClick() {
    setDisplayValue((prev) => ({
      ...prev,
      [monthName]: value,
    }));
    toggleInputSalary();
  }

  //SHOW MODAL
  function handleShowModalAddExpense() {
    setShowModalAddExpense(!showModalAddExpense);

    if (pie.current) pie.current.classList.toggle("blur");
    if (salaryRef.current) salaryRef.current.classList.toggle("blur");
    if (sum.current) sum.current.classList.toggle("blur");
    if (expenses.current) expenses.current.classList.toggle("blur");
    if (money.current) money.current.classList.toggle("blur");
  }

  const modalRef = useRef(null);

  //CLOSE MODAL CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModalAddExpense(false);
        if (pie.current) pie.current.classList.remove("blur");
        if (salaryRef.current) salaryRef.current.classList.remove("blur");
        if (sum.current) sum.current.classList.remove("blur");
        if (expenses.current) expenses.current.classList.remove("blur");
        if (money.current) money.current.classList.remove("blur");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //CAPITALIZE FIRST LETTER
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function addNameOfExpense(e) {
    setValueNameExpense(e.target.value);
  }

  //ADDING NEW EXPENSE
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

    if (pie.current) pie.current.classList.remove("blur");
    if (salaryRef.current) salaryRef.current.classList.remove("blur");
    if (sum.current) sum.current.classList.remove("blur");
    if (expenses.current) expenses.current.classList.remove("blur");
    if (money.current) money.current.classList.remove("blur");
  }

  function handleSumChange(expenseSum) {
    setOverallSum((prevOverallSum) => prevOverallSum + expenseSum);
  }

  useEffect(() => {
    const storedVisibility = localStorage.getItem("inputSalaryVisible");
    setIsInputVisible(storedVisibility === "true");
  }, []);

  const toggleInputSalary = () => {
    setIsInputVisible((prevVisibility) => {
      const newVisibility = !prevVisibility;
      localStorage.setItem("inputSalaryVisible", newVisibility.toString());
      return newVisibility;
    });
  };

  useEffect(() => {
    const savings = salary - overallSum;
    setMoneySavedOrLoss(savings);

    localStorage.setItem(`savings-${monthName}`, savings);
  }, [overallSum, salary]);

  ////

  return (
    <div className="px-[1rem]">
      <div ref={pie}>
        <PieChart monthName={monthName} expensesName={expensesName} />
      </div>

      <div>
        <div
          ref={salaryRef}
          className="flex items-center gap-4 rounded-3xl bg-white shadow-md mb-8 p-4"
        >
          <div>
            <GiTakeMyMoney size={50} color="#27B7EE" />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div
              ref={salaryRefInput}
              className={`flex justify-between gap-4 ${
                isInputVisible ? "block" : "hidden"
              }`}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="number"
                placeholder="Your salary"
                className="bg-[var(--background-color)] border rounded-lg pl-2 w-full"
              />

              <button onClick={handleClick} className="btn">
                Add
              </button>
            </div>

            <div className="flex gap-2 justify-between">
              <p className="flex items-center">Salary:</p>

              <p>
                <strong>
                  €
                  {Number(displayValue[monthName] || 0).toLocaleString("de-DE")}
                </strong>
              </p>
              <button
                onClick={toggleInputSalary}
                className="cursor-pointer p-0 m-0 border-none bg-transparent flex justify-end"
              >
                <FaRegEdit size={20} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={sum}
          className="flex justify-between text-center rounded-3xl bg-white shadow-md mb-8 p-4 gap-4"
        >
          <div>
            {moneySavedOrLoss < 0 ? (
              <GiPayMoney size={50} color="#F55D76" />
            ) : (
              <GiReceiveMoney size={50} color="#27B7EE" />
            )}
          </div>
          <div className="flex w-full justify-between">
            <div className="text-left">
              <p>Total expenses: </p>
              <p>{moneySavedOrLoss < 0 ? "Loss: " : "Saved: "}</p>
            </div>
            <div className="flex flex-col">
              <strong>€{overallSum.toLocaleString("de-DE")}</strong>
              <strong>€{moneySavedOrLoss.toLocaleString("de-DE")}</strong>
            </div>
          </div>
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

        <div ref={expenses} className="mb-[5rem]">
          {expensesName.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col items-center gap-4 mb-10 rounded-3xl bg-white shadow-md p-4"
            >
              <div className="flex justify-between w-full">
                <strong className="text-xl">
                  {capitalizeFirstLetter(expense.name)}
                </strong>
                <div>
                  <DeleteExpense
                    monthName={monthName}
                    expensesName={expensesName}
                    setExpensesName={setExpensesName}
                    expense={expense}
                    setOverallSum={setOverallSum}
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <div>
                  <GiMoneyStack size={50} color="green" />
                </div>

                <div className="flex flex-col gap-2">
                  <SumInputEachExpense
                    monthName={monthName}
                    expenseId={expense.id}
                    onSumChange={handleSumChange}
                  />
                </div>
              </div>
            </div>
          ))}
          {/* <div>
          <DragAndDrop
            expensesName={expensesName}
            setExpensesName={setExpensesName}
            monthName={monthName}
            handleSumChange={handleSumChange}
            setOverallSum={setOverallSum}
          />
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default PageMonth;
