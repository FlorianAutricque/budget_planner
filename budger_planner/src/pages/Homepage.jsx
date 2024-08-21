import { NavLink } from "react-router-dom";
import { MdOutlineSavings } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Months from "../utils/Months";

function Homepage({ month, name }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  const monthNames = Months();
  const displayValue = JSON.parse(localStorage.getItem("displayValue")) || {};

  //CURRENT MONTH
  const currentMonthId = month && month.id === 1 ? 12 : month ? month.id : 12;
  const currentMonth = monthNames.find((m) => m.id === currentMonthId);

  const currentMonthName = currentMonth
    ? currentMonth.nameMonth
    : "Unknown Month";

  const currentMonthSavings = Number(
    localStorage.getItem(`savings-${currentMonthId}`) || 0
  );

  const currentMonthEarnings = Number(displayValue[currentMonthId] || 0);
  const currentMonthSpending = currentMonthEarnings - currentMonthSavings;

  //PREVIOUS MONTH
  const previousMonthId =
    month && month.id === 1 ? 12 : month ? month.id - 1 : 12;
  const previousMonth = monthNames.find((m) => m.id === previousMonthId);

  const previousMonthName = previousMonth
    ? previousMonth.nameMonth
    : "Unknown Month";

  //get previosu month with the id from LS
  const previousMonthSavings = Number(
    localStorage.getItem(`savings-${previousMonthId}`) || 0
  );

  const previousMonthEarnings = Number(displayValue[previousMonthId] || 0);

  const previousMonthSpending = previousMonthEarnings - previousMonthSavings;

  const monthData = [
    {
      MonthId: currentMonthId,
      MonthName: currentMonthName,
      MonthSavings: currentMonthSavings,
      MonthEarnings: currentMonthEarnings,
      MonthSpending: currentMonthSpending,
    },
    {
      MonthId: previousMonthId,
      MonthName: previousMonthName,
      MonthSavings: previousMonthSavings,
      MonthEarnings: previousMonthEarnings,
      MonthSpending: previousMonthSpending,
    },
  ];

  return (
    <div className="px-[1rem] flex flex-col items-center gap-8">
      <p className="title mt-10 text-3xl">PLUTUS</p>

      <h1>
        Plan For&nbsp;
        <span className="underlined underline-clip">Success</span>&nbsp; & Track
        Your&nbsp;
        <span className="underlined underline-mask">Expenses</span>
      </h1>

      <p className="text-center">
        {t("HOMEPAGE.MONTH.1")} <strong>{name}</strong>, {t("HOMEPAGE.MONTH.2")}
      </p>

      <NavLink to={`/month/${month.id}`} className="btn text-center">
        {t("HOMEPAGE.BUTTON")}
      </NavLink>

      <div className="mb-[8rem] w-full">
        {monthData.map((data) => (
          <>
            <NavLink to={`/month/${data.MonthId}`} className="w-full">
              <div className="flex flex-col text-center rounded-3xl bg-white shadow-md mb-2 p-4">
                <div>
                  <p className="text-left text-[#c6c6c6]">
                    {lng === "fr"
                      ? `${t("HOMEPAGE.PREVIOUS_MONTH.SAVINGS")} ${
                          data.MonthName
                        } :`
                      : `${data.MonthName} ${t(
                          "HOMEPAGE.PREVIOUS_MONTH.SAVINGS"
                        )}`}
                  </p>

                  <span className="flex items-center gap-2">
                    <MdOutlineSavings />€
                    {data.MonthSavings.toLocaleString("de-DE")}
                  </span>
                </div>

                <div className="flex justify-center items-center flex-col gap-4 mt-4">
                  <div className="flex justify-between px-10 w-[80%] rounded-xl bg-[#27B7EE]">
                    <p className="text-white">
                      {t("HOMEPAGE.PREVIOUS_MONTH.EARNED")}
                    </p>
                    <p>€{data.MonthEarnings.toLocaleString("de-DE")}</p>
                  </div>

                  <div className="flex justify-between px-10 w-[80%] rounded-xl bg-[#47cd3b]">
                    <p className="text-white">
                      {data.MonthSavings >= 0
                        ? `${t("HOMEPAGE.PREVIOUS_MONTH.SAVED")}`
                        : `${t("HOMEPAGE.PREVIOUS_MONTH.LOSS")}`}
                    </p>
                    <p>€{data.MonthSavings.toLocaleString("de-DE")}</p>
                  </div>

                  <div className="flex justify-between px-10 w-[80%] rounded-xl bg-[#F55D76]">
                    <p className="text-white">
                      {t("HOMEPAGE.PREVIOUS_MONTH.SPENT")}
                    </p>
                    <p>€{data.MonthSpending.toLocaleString("de-DE")}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          </>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
