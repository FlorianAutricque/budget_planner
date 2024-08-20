import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SliderMonths from "./components/SliderMonths";
import PageMonth from "./pages/PageMonth";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const months = [
    { id: 1, nameMonth: t("MONTH_NAVBAR.1") },
    { id: 2, nameMonth: t("MONTH_NAVBAR.2") },
    { id: 3, nameMonth: t("MONTH_NAVBAR.3") },
    { id: 4, nameMonth: t("MONTH_NAVBAR.4") },
    { id: 5, nameMonth: t("MONTH_NAVBAR.5") },
    { id: 6, nameMonth: t("MONTH_NAVBAR.6") },
    { id: 7, nameMonth: t("MONTH_NAVBAR.7") },
    { id: 8, nameMonth: t("MONTH_NAVBAR.8") },
    { id: 9, nameMonth: t("MONTH_NAVBAR.9") },
    { id: 10, nameMonth: t("MONTH_NAVBAR.10") },
    { id: 11, nameMonth: t("MONTH_NAVBAR.11") },
    { id: 12, nameMonth: t("MONTH_NAVBAR.12") },
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
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navbar month={month} />
      </BrowserRouter>
    </>
  );
}

export default App;
