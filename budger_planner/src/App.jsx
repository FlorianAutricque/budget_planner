import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SliderMonths from "./components/SliderMonths";
import PageMonth from "./pages/PageMonth";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";

import Months from "./utils/Months";

function App() {
  const months = Months();

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
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navbar month={month} />
      </BrowserRouter>
    </>
  );
}

export default App;
