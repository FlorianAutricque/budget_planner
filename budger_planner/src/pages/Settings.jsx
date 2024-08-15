import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Settings() {
  const { i18n } = useTranslation();

  const btnEuroRef = useRef(null);
  const btnDollarRef = useRef(null);

  const [active, setActive] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("selectedLanguage", lng);
    setActive(lng);
  };

  const handleClickBtnEuro = () => {
    if (btnEuroRef.current && btnDollarRef.current) {
      btnEuroRef.current.style.backgroundColor = "var(--btn-blue)";
      btnDollarRef.current.style.backgroundColor = "white";
      btnEuroRef.current.style.color = "white";
      btnDollarRef.current.style.color = "black";
    }
  };

  const handleClickBtnDollar = () => {
    if (btnEuroRef.current && btnDollarRef.current) {
      btnEuroRef.current.style.backgroundColor = "white";
      btnDollarRef.current.style.backgroundColor = "var(--btn-blue)";
      btnDollarRef.current.style.color = "white";
      btnEuroRef.current.style.color = "black";
    }
  };

  return (
    <div className="px-[1rem]">
      <div className="flex flex-col items-center gap-4 rounded-3xl mb-8 bg-white shadow-md p-4 mt-8">
        <h3>Choose a currency</h3>

        <div className="flex justify-around w-[80%] rounded-xl border">
          <button
            ref={btnEuroRef}
            className="rounded-tl-xl rounded-tr-0 rounded-br-0 rounded-bl-xl w-[50%]"
            onClick={handleClickBtnEuro}
          >
            EURO
          </button>

          <button
            ref={btnDollarRef}
            className="rounded-tl-0 rounded-tr-xl rounded-br-xl rounded-bl-0 w-[50%]"
            onClick={handleClickBtnDollar}
          >
            DOLLAR
          </button>
        </div>
      </div>

      <div>
        <p>Choose a language</p>
        <button onClick={() => changeLanguage("fr")}>Francais</button>

        <button onClick={() => changeLanguage("en")}>English</button>
      </div>
    </div>
  );
}

export default Settings;
