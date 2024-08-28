import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Settings() {
  const { i18n, t } = useTranslation();

  const btnEuroRef = useRef(null);
  const btnDollarRef = useRef(null);

  const btnFrenchRef = useRef(null);
  const btnEnglishRef = useRef(null);

  const [activeLanguage, setActiveLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const [activeCurrency, setActiveCurrency] = useState(
    localStorage.getItem("selectedCurrency") || "euro"
  );

  useEffect(() => {
    if (activeLanguage === "fr") {
      handleClickBtn(btnFrenchRef, btnEnglishRef, "fr", false);
    } else {
      handleClickBtn(btnEnglishRef, btnFrenchRef, "en", false);
    }

    if (activeCurrency === "euro") {
      handleClickBtn(btnEuroRef, btnDollarRef, "euro", false);
    } else {
      handleClickBtn(btnDollarRef, btnEuroRef, "dollar", false);
    }
  }, [activeLanguage, activeCurrency]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("selectedLanguage", lng);
    setActiveLanguage(lng);
  };

  const changeCurrency = (currency) => {
    localStorage.setItem("selectedCurrency", currency);
    setActiveCurrency(currency);
  };

  const handleClickBtn = (firstRef, secondRef, type, save = true) => {
    if (firstRef.current && secondRef.current) {
      firstRef.current.style.backgroundColor = "var(--btn-blue)";
      secondRef.current.style.backgroundColor = "white";
      firstRef.current.style.color = "white";
      secondRef.current.style.color = "black";

      if (save) {
        if (type === "fr" || type === "en") {
          changeLanguage(type);
        } else {
          changeCurrency(type);
        }
      }
    }
  };

  return (
    <div className="px-[1rem] flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 rounded-3xl mb-8 bg-white shadow-md p-4 mt-8 w-full md:w-[50%]">
        <h3>{t("SETTINGS.CURRENCY.TITLE")}</h3>

        <div className="flex justify-around w-[80%] rounded-xl border">
          <button
            ref={btnEuroRef}
            className="rounded-tl-xl rounded-tr-0 rounded-br-0 rounded-bl-xl w-[50%]"
            onClick={() => handleClickBtn(btnEuroRef, btnDollarRef, "euro")}
          >
            EURO
          </button>

          <button
            ref={btnDollarRef}
            className="rounded-tl-0 rounded-tr-xl rounded-br-xl rounded-bl-0 w-[50%]"
            onClick={() => handleClickBtn(btnDollarRef, btnEuroRef, "dollar")}
          >
            DOLLAR
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl mb-8 bg-white shadow-md p-4 w-full md:w-[50%]">
        <h3>{t("SETTINGS.LNG.TITLE")}</h3>
        <div className="flex justify-around w-[80%] rounded-xl border">
          <button
            ref={btnFrenchRef}
            className="rounded-tl-xl rounded-tr-0 rounded-br-0 rounded-bl-xl w-[50%]"
            onClick={() => handleClickBtn(btnFrenchRef, btnEnglishRef, "fr")}
          >
            Francais
          </button>

          <button
            ref={btnEnglishRef}
            className="rounded-tl-0 rounded-tr-xl rounded-br-xl rounded-bl-0 w-[50%]"
            onClick={() => handleClickBtn(btnEnglishRef, btnFrenchRef, "en")}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
