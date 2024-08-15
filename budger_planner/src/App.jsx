import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SliderMonths from "./components/SliderMonths";
import PageMonth from "./pages/PageMonth";
import Navbar from "./components/Navbar";

function App() {
  const months = [
    { id: 1, nameMonth: "January" },
    { id: 2, nameMonth: "February" },
    { id: 3, nameMonth: "March" },
    { id: 4, nameMonth: "April" },
    { id: 5, nameMonth: "May" },
    { id: 6, nameMonth: "June" },
    { id: 7, nameMonth: "July" },
    { id: 8, nameMonth: "August" },
    { id: 9, nameMonth: "September" },
    { id: 10, nameMonth: "October" },
    { id: 11, nameMonth: "November" },
    { id: 12, nameMonth: "December" },
  ];

  const day = new Date();
  const currentMonthIndex = day.getMonth();
  const month = months[currentMonthIndex];

  const previousMonth =
    currentMonthIndex === 0 ? months[11] : months[currentMonthIndex - 1];
  const previousMonthName = previousMonth.nameMonth;

  const name = month ? month.nameMonth : "Unknown Month";

  return (
    <>
      <BrowserRouter>
        <SliderMonths />
        <Routes>
          <Route
            index
            element={
              <Homepage
                name={name}
                month={month}
                previousMonth={previousMonth}
                previousMonthName={previousMonthName}
              />
            }
          />
          <Route path="month/:monthId" element={<PageMonth />} />
        </Routes>
        <Navbar month={month} />
      </BrowserRouter>
    </>
  );
}

export default App;
