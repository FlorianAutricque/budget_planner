import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { VscPieChart } from "react-icons/vsc";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function Navbar({ month }) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white border-t-2 pt-[8px] flex items-center justify-around"
      onClick={toggleActiveClass}
    >
      <NavLink
        className={({ isActive }) => (isActive ? "text-[var(--btn-blue)]" : "")}
        to="/"
      >
        <span className="flex flex-col items-center w-4 ">
          <GoHome size={40} /> <p className="text-xs">Home</p>
        </span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "text-[var(--btn-blue)]" : "")}
        to={`/month/${month.id}`}
      >
        <span className="flex flex-col items-center w-4">
          <VscPieChart size={40} />
          <p className="text-xs">Budget</p>
        </span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "text-[var(--btn-blue)]" : "")}
        to="/settings"
      >
        <span className="flex flex-col items-center w-4">
          <IoSettingsOutline size={40} />
          <p className="text-xs">{t("NAVBAR_ICONS.SETTINGS")}</p>
        </span>
      </NavLink>
    </div>
  );
}

export default Navbar;
