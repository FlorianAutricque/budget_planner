import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../utils/LocalStorage";

import { GiTakeMyMoney } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import Months from "../utils/Months";

function PageMonth() {
  const { t } = useTranslation();
  const { monthId } = useParams();

  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useLocalStorage("displayValue", {});

  const [expensesName, setExpensesName] = useState([]);
  const [overallSum, setOverallSum] = useState(0);
  const [salary, setSalary] = useState(0);

  const salaryRef = useRef(null);
  const salaryRefInput = useRef(null);

  const monthNames = Months();
  const monthIdParsed = parseInt(monthId, 10);
  //////////////////////
  const currentMonthID = monthNames.find((m) => m.id === monthIdParsed);
  const monthName = currentMonthID?.nameMonth || "Unknown Month";

  // LOCALSTORAGE
  useEffect(() => {
    ///////////
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

  // HANDLE DISPLAY VALUE
  function handleClick() {
    setDisplayValue((prev) => ({
      ...prev,
      [monthIdParsed]: value,
    }));
    toggleInputSalary();
  }

  // CLOSE THE INPUT SECTION WHEN ADDED SALARY

  return (
    <div className="px-[1rem]">
      <div>
        <div
          ref={salaryRef}
          className="flex items-center gap-4 rounded-3xl bg-white shadow-md mb-8 p-4"
        >
          <div>
            <GiTakeMyMoney size={50} color="var(--color-icon-blue)" />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div ref={salaryRefInput}>
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

              <p>
                <strong>
                  €
                  {Number(displayValue[monthIdParsed] || 0).toLocaleString(
                    "de-DE"
                  )}
                </strong>
              </p>
              {monthName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageMonth;
