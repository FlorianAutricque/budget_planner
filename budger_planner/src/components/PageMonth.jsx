import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useLocalStorage from "../utils/LocalStorage";

function PageMonth() {
  const { monthId } = useParams();
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useLocalStorage("displayValue", {});
  const [elements, setElements] = useState([]);
  const btnAddExpenseRef = useRef(null);

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

  useEffect(() => {
    setValue(displayValue[monthName] || 0);

    // Retrieve elements from local storage for the current month
    const storedElements =
      JSON.parse(window.localStorage.getItem(`elements-${monthName}`)) || [];
    setElements(storedElements);
  }, [monthName, displayValue]);

  function handleClick() {
    setDisplayValue((prev) => ({
      ...prev,
      [monthName]: value,
    }));
  }

  function addElement() {
    const newElement = `Element added in ${monthName} at ${new Date().toLocaleString()}`;

    // Update elements state
    const updatedElements = [...elements, newElement];
    setElements(updatedElements);

    // Save updated elements in local storage
    window.localStorage.setItem(
      `elements-${monthName}`,
      JSON.stringify(updatedElements)
    );
  }

  useEffect(() => {
    const btnAddExpense = btnAddExpenseRef.current;
    if (btnAddExpense) {
      btnAddExpense.addEventListener("click", addElement);
    }

    return () => {
      if (btnAddExpense) {
        btnAddExpense.removeEventListener("click", addElement);
      }
    };
  }, [elements, monthName]);

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

        <button id="btnAddExpense" ref={btnAddExpenseRef}>
          ++++++
        </button>

        <div>
          {elements.map((element, index) => (
            <div key={index} className="Container__newElement">
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageMonth;
