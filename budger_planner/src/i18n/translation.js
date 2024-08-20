import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        MONTH_NAVBAR: {
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
        },
        NAVBAR_ICONS: {
          HOME: "Home",
          BUDGET: "Budget",
          SETTINGS: "Settings",
        },
        HOMEPAGE: {
          SLOGAN: {
            PLAN_1: "Plan For",
            PLAN_2: "Sucess",
            PLAN_3: "& Track Your",
            PLAN_4: "Expenses",
          },
          MONTH: {
            1: "We are in",
            2: "let's track our budget",
          },
          BUTTON: "Start now",
          PREVIOUS_MONTH: {
            SAVINGS: "savings",
            EARNED: "Earned",
            SAVED: "Saved",
            SPENT: "Spent",
          },
        },
        PAGE_MONTH: {
          BTN_ADD: "Add",
          PIE: "Expense Categories",
          SALARY: {
            SALARY: "Salary",
          },
          TOTAL: {
            TOTAL_EXPENSES: "total expenses",
            LOSS: "Loss",
            SAVED: "Saved",
          },
          EACH_EXPENSE: {
            PLACEHOLDER_ENTER: "Enter a value",
            PLACEHOLDER_ADD: "Add a new value",
          },
          INPUT_NEW_EXP: {
            TITLE: "Add a new expense:",
            PLACEHOLDER: "Fuel, Grocery...",
          },
        },
        SETTINGS: {
          CURRENCY: {
            TITLE: "Choose a currency",
          },
          LNG: {
            TITLE: "Choose a language",
          },
        },
      },
    },
    fr: {
      translation: {
        MONTH_NAVBAR: {
          1: "Janvier",
          2: "Février",
          3: "Mars",
          4: "Avril",
          5: "Mai",
          6: "Juin",
          7: "Juillet",
          8: "Aout",
          9: "Septembre",
          10: "Octobre",
          11: "Novembre",
          12: "Décembre",
        },
        NAVBAR_ICONS: {
          HOME: "Home",
          BUDGET: "Budget",
          SETTINGS: "Paramètre",
        },
        HOMEPAGE: {
          SLOGAN: {
            PLAN_1: "Plan For",
            PLAN_2: "Sucess",
            PLAN_3: "& Track Your",
            PLAN_4: "Expenses",
          },
          MONTH: {
            1: "Nous sommes en",
            2: "commençons à économiser maintenant",
          },
          BUTTON: "C'est parti",
          PREVIOUS_MONTH: {
            SAVINGS: "Economies de",
            EARNED: "Gagné",
            SAVED: "Économisé",
            SPENT: "Économisé",
          },
        },
        PAGE_MONTH: {
          BTN_ADD: "Ajouter",
          PIE: "Categories des depenses",
          SALARY: {
            SALARY: "Salary",
          },
          TOTAL: {
            TOTAL_EXPENSES: "total expenses",
            LOSS: "Loss",
            SAVED: "Saved",
          },
          EACH_EXPENSE: {
            PLACEHOLDER_ENTER: "Enter a value",
            PLACEHOLDER_ADD: "Add a new value",
          },
          INPUT_NEW_EXP: {
            TITLE: "Add a new expense:",
            PLACEHOLDER: "Fuel, Grocery...",
          },
        },
        SETTINGS: {
          CURRENCY: {
            TITLE: "Choose a currency",
          },
          LNG: {
            TITLE: "Choose a language",
          },
        },
      },
    },
  },
  lng: selectedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
