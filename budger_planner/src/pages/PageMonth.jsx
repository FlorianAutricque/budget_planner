import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../utils/LocalStorage";

import CapitalizeFirstLetter from "../utils/CapitalizeFirstLetter";

import PieChart from "../components/PieChart";
import DragAndDrop from "../dnd-test/DragAndDrop";
import SumInputEachExpense from "../components/SumInputEachExpense";
import DeleteExpense from "../components/DeleteExpense";

import { FaRegEdit } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";

import ModalAddExpense from "../components/ModalAddExpense";
import { useTranslation } from "react-i18next";

import Months from "../utils/Months";

function PageMonth() {
  const { t } = useTranslation();
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

  const monthNames = Months();
  const monthIdParsed = parseInt(monthId, 10);

  const currentMonthID = monthNames.find((m) => m.id === monthIdParsed);
  const monthName = currentMonthID?.nameMonth || "Unknown Month";

  // LOCALSTORAGE
  useEffect(() => {
    if (monthIdParsed) {
      setValue(displayValue[monthIdParsed] || "");
      setSalary(displayValue[monthIdParsed] || 0);

      const storedExpenses =
        JSON.parse(window.localStorage.getItem(`expenses-${monthIdParsed}`)) ||
        [];
      setExpensesName(storedExpenses);

      let initialOverallSum = 0;
      storedExpenses.forEach((expense) => {
        const storedSum =
          parseFloat(
            localStorage.getItem(`sum-${monthIdParsed}-${expense.id}`)
          ) || 0;
        initialOverallSum += storedSum;
      });
      setOverallSum(initialOverallSum);
    }
  }, [monthIdParsed, displayValue]);

  //CALCUL SAVED OR LOSS
  useEffect(() => {
    if (monthIdParsed) {
      const savings = salary - overallSum;
      setMoneySavedOrLoss(savings);
      localStorage.setItem(`savings-${monthIdParsed}`, savings);
    }
  }, [overallSum, salary, monthIdParsed]);

  //HANDLE DISPLAY VALUE
  function handleClick() {
    setDisplayValue((prev) => ({
      ...prev,
      [monthIdParsed]: value,
    }));
    toggleInputSalary();
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
        `expenses-${monthIdParsed}`,
        JSON.stringify(updatedExpenses)
      );
    }
    setShowModalAddExpense(false);

    if (pie.current) pie.current.classList.remove("blur");
    if (salaryRef.current) salaryRef.current.classList.remove("blur");
    if (sum.current) sum.current.classList.remove("blur");
    if (expenses.current) expenses.current.classList.remove("blur");
    if (money.current) money.current.classList.remove("blur");
  }

  function handleSumChange(expenseSum) {
    if (monthIdParsed) {
      setOverallSum((prevOverallSum) => prevOverallSum + expenseSum);
    }
  }

  //CLOSE THE INPUT SECTION WHEN WHEN ADDED SALARY
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

  //CALCUL SAVINGS
  // useEffect(() => {
  //   const savings = salary - overallSum;
  //   setMoneySavedOrLoss(savings);

  //   localStorage.setItem(`savings-${monthIdParsed}`, savings);
  // }, [overallSum, salary]);

  //SET COLOR BILLS DEPENDING OF SUM
  function setColorDependingSum(sum) {
    if (sum === 0) {
      return "var(--color-icon-blue)";
    } else if (sum > 0 && sum < 80) {
      return "#7bb570";
    } else if (sum >= 80 && sum < 150) {
      return "#f6d48f";
    } else if (sum >= 150 && sum < 250) {
      return "#e6a930";
    } else if (sum >= 250 && sum < 350) {
      return "#e15754";
    } else if (sum >= 350 && sum < 450) {
      return "#cf1b18";
    } else {
      return "#6b0201";
    }
  }

  return (
    <div className="px-[1rem] w-full flex flex-col items-center">
      <div ref={pie} className="w-full md:w-[50%]">
        <PieChart
          monthName={monthName}
          expensesName={expensesName}
          monthIdParsed={monthIdParsed}
        />
      </div>

      <div className="w-full md:w-[50%]">
        <div
          ref={salaryRef}
          className="flex items-center gap-4 rounded-3xl bg-white shadow-md mb-8 p-4"
        >
          <div>
            <GiTakeMyMoney size={50} color="var(--color-icon-blue)" />
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
                placeholder={t("PAGE_MONTH.SALARY.PLACEHOLDER")}
                className="bg-[var(--background-color)] border rounded-lg pl-2 w-full"
              />

              <button onClick={handleClick} className="btn">
                {t("PAGE_MONTH.BTN_ADD")}
              </button>
            </div>

            <div className="flex gap-2 justify-between">
              <p className="flex items-center">
                {t("PAGE_MONTH.SALARY.SALARY")}
              </p>

              <p>
                <strong>
                  €
                  {Number(displayValue[monthIdParsed] || 0).toLocaleString(
                    "de-DE"
                  )}
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
              <GiReceiveMoney size={50} color="var(--color-icon-blue)" />
            )}
          </div>
          <div className="flex w-full justify-between">
            <div className="text-left">
              <p>{t("PAGE_MONTH.TOTAL.TOTAL_EXPENSES")} </p>
              <p>
                {moneySavedOrLoss < 0
                  ? `${t("PAGE_MONTH.TOTAL.LOSS")}`
                  : `${t("PAGE_MONTH.TOTAL.SAVED")}`}
              </p>
            </div>
            <div className="flex flex-col">
              <strong>€{overallSum.toLocaleString("de-DE")}</strong>
              <strong>€{moneySavedOrLoss.toLocaleString("de-DE")}</strong>
            </div>
          </div>
        </div>

        <ModalAddExpense
          pie={pie}
          salaryRef={salaryRef}
          sum={sum}
          expenses={expenses}
          money={money}
          valueNameExpense={valueNameExpense}
          addNameOfExpense={addNameOfExpense}
          addNewExpense={addNewExpense}
          showModalAddExpense={showModalAddExpense}
          setShowModalAddExpense={setShowModalAddExpense}
        />

        <div ref={expenses} className="mb-[7rem]">
          {expensesName.map((expense) => (
            <div
              key={expense.id}
              className="flex flex-col items-center gap-4 rounded-3xl mb-8 bg-white shadow-md p-4"
            >
              <div className="flex justify-between w-full">
                <strong className="text-xl">
                  {CapitalizeFirstLetter(expense.name)}
                </strong>
                <div>
                  <DeleteExpense
                    monthIdParsed={monthIdParsed}
                    expensesName={expensesName}
                    setExpensesName={setExpensesName}
                    expense={expense}
                    setOverallSum={setOverallSum}
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <SumInputEachExpense
                    monthIdParsed={monthIdParsed}
                    expenseId={expense.id}
                    onSumChange={handleSumChange}
                    setColorDependingSum={setColorDependingSum}
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
