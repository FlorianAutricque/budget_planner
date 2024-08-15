import { NavLink } from "react-router-dom";
import { MdOutlineSavings } from "react-icons/md";
import { useTranslation } from "react-i18next";

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

function Homepage({ month, name }) {
  const { t } = useTranslation();

  const previousMonthId = month.id === 1 ? 12 : month.id - 1;
  const previousMonthName = monthNames[previousMonthId];

  const previousMonthSavings = Number(
    localStorage.getItem(`savings-${previousMonthName}`) || 0
  );

  const previousMonthEarnings = localStorage.getItem(`displayValue`)
    ? Number(
        JSON.parse(localStorage.getItem(`displayValue`))[previousMonthName]
      ) || 0
    : 0;

  const previousMonthSpending = previousMonthEarnings - previousMonthSavings;

  return (
    <div className="px-[1rem] flex flex-col items-center gap-8">
      <p className="title mt-10 text-3xl">PLUTUS</p>

      <h1>
        Plan For&nbsp;
        <span className="underlined underline-clip">Sucess</span>&nbsp;& Track
        Your&nbsp;
        <span className="underlined underline-mask">Expenses</span>
      </h1>

      <p>
        We are in <strong>{name}</strong>, let&apos;s track our budget
      </p>

      <NavLink to={`/month/${month.id}`} className="btn text-center">
        Start now
      </NavLink>

      <h2>Previous month:</h2>

      <NavLink to={`/month/${previousMonthId}`} className="w-full">
        <div className="flex flex-col text-center rounded-3xl bg-white shadow-md mb-8 p-4">
          <div>
            <p className="text-left text-[#c6c6c6]">
              {previousMonthName} savings:&nbsp;
            </p>
            <span className="flex items-center gap-2">
              <MdOutlineSavings />€
              {previousMonthSavings.toLocaleString("de-DE")}
            </span>
          </div>

          <div className="flex justify-center items-center flex-col gap-4 mt-4">
            <div className="flex justify-around w-[80%] rounded-xl bg-[#27B7EE]">
              <p className="text-white">Earned</p>
              <p>€{previousMonthEarnings.toLocaleString("de-DE")}</p>
            </div>

            <div className="flex justify-around w-[80%] rounded-xl bg-[#47cd3b]">
              <p className="text-white">
                {previousMonthSavings >= 0 ? "Saved" : "Loss"}
              </p>
              <p>€{previousMonthSavings.toLocaleString("de-DE")}</p>
            </div>

            <div className="flex justify-around w-[80%] rounded-xl bg-[#F55D76]">
              <p className="text-white">Spent</p>
              <p>€{previousMonthSpending.toLocaleString("de-DE")}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Homepage;
