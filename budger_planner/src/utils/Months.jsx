import { useTranslation } from "react-i18next";

function Months() {
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
  return months;
}

export default Months;
