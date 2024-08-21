import { NavLink } from "react-router-dom";
import { MdOutlineSavings } from "react-icons/md";
import { useTranslation } from "react-i18next";
import Months from "../utils/Months";

function Homepage({ month, name }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;

  const monthNames = Months();

  const previousMonthId =
    month && month.id === 1 ? 12 : month ? month.id - 1 : 12;

  const previousMonth = monthNames.find((m) => m.id === previousMonthId);

  const previousMonthName = previousMonth
    ? previousMonth.nameMonth
    : "Unknown Month";

  const previousMonthSavings = Number(
    localStorage.getItem(`savings-${previousMonthId}`) || 0
  );

  const displayValue = JSON.parse(localStorage.getItem("displayValue")) || {};
  const previousMonthEarnings = Number(displayValue[previousMonthId] || 0);

  const previousMonthSpending = previousMonthEarnings - previousMonthSavings;

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

      <h2>Previous month:</h2>

      <NavLink to={`/month/${previousMonthId}`} className="w-full">
        <div className="flex flex-col text-center rounded-3xl bg-white shadow-md mb-8 p-4">
          <div>
            <p className="text-left text-[#c6c6c6]">
              {lng === "fr"
                ? `${t(
                    "HOMEPAGE.PREVIOUS_MONTH.SAVINGS"
                  )} ${previousMonthName} :`
                : `${previousMonthName} ${t(
                    "HOMEPAGE.PREVIOUS_MONTH.SAVINGS"
                  )}`}
            </p>

            <span className="flex items-center gap-2">
              <MdOutlineSavings />€
              {previousMonthSavings.toLocaleString("de-DE")}
            </span>
          </div>

          <div className="flex justify-center items-center flex-col gap-4 mt-4">
            <div className="flex justify-between px-10 w-[80%] rounded-xl bg-[#27B7EE]">
              <p className="text-white">
                {t("HOMEPAGE.PREVIOUS_MONTH.EARNED")}
              </p>
              <p>€{previousMonthEarnings.toLocaleString("de-DE")}</p>
            </div>

            <div className="flex justify-between px-10 w-[80%] rounded-xl bg-[#47cd3b]">
              <p className="text-white">
                {previousMonthSavings >= 0
                  ? `${t("HOMEPAGE.PREVIOUS_MONTH.SAVED")}`
                  : `${t("HOMEPAGE.PREVIOUS_MONTH.LOSS")}`}
              </p>
              <p>€{previousMonthSavings.toLocaleString("de-DE")}</p>
            </div>

            <div className="flex justify-between px-10 w-[80%] rounded-xl bg-[#F55D76]">
              <p className="text-white">{t("HOMEPAGE.PREVIOUS_MONTH.SPENT")}</p>
              <p>€{previousMonthSpending.toLocaleString("de-DE")}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Homepage;
