import { useState } from "react";
import { useTranslation } from "react-i18next";

function Settings() {
  const { i18n } = useTranslation();
  const [active, setActive] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("selectedLanguage", lng);
    setActive(lng);
  };

  return (
    <div>
      <div>
        <p>Choose a currency</p>
        <button>EURO</button>
        <button>DOLLARS</button>
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
