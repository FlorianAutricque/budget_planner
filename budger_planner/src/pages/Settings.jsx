import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Settings() {
  const { i18n } = useTranslation();

  const btnEuroRef = useRef(null);
  const btnDollarRef = useRef(null);

  const btnFrenchRef = useRef(null);
  const btnEnglishRef = useRef(null);

  const [active, setActive] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("selectedLanguage", lng);
    setActive(lng);
  };

  const handleClickBtn = (firstRef, secondRef) => {
    if (firstRef.current && secondRef.current) {
      firstRef.current.style.backgroundColor = "var(--btn-blue)";
      secondRef.current.style.backgroundColor = "white";
      firstRef.current.style.color = "white";
      secondRef.current.style.color = "black";
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
            onClick={() => handleClickBtn(btnEuroRef, btnDollarRef)}
          >
            EURO
          </button>

          <button
            ref={btnDollarRef}
            className="rounded-tl-0 rounded-tr-xl rounded-br-xl rounded-bl-0 w-[50%]"
            onClick={() => handleClickBtn(btnDollarRef, btnEuroRef)}
          >
            DOLLAR
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl mb-8 bg-white shadow-md p-4">
        <h3>Choose a language</h3>
        <div className="flex justify-around w-[80%] rounded-xl border">
          <button
            ref={btnFrenchRef}
            onClick={() => [
              changeLanguage("fr"),
              handleClickBtn(btnFrenchRef, btnEnglishRef),
            ]}
          >
            Francais
          </button>

          <button
            ref={btnEnglishRef}
            onClick={() => [
              changeLanguage("en"),
              handleClickBtn(btnEnglishRef, btnFrenchRef),
            ]}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
