import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { VscPieChart } from "react-icons/vsc";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

function Navbar({ month }) {
  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white border-t-2 pt-[8px] flex items-center justify-center gap-10"
      onClick={toggleActiveClass}
    >
      <NavLink
        className={({ isActive }) => (isActive ? "text-[var(--btn-blue)]" : "")}
        to="/"
      >
        <span className="flex flex-col items-center ">
          <GoHome size={40} /> <p className="text-xs">Home</p>
        </span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "text-[var(--btn-blue)]" : "")}
        to={`/month/${month.id}`}
      >
        <span className="flex flex-col items-center ">
          <VscPieChart size={40} />
          <p className="text-xs">Budget</p>
        </span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? "text-[var(--btn-blue)]" : "")}
        to="/settings"
      >
        <span className="flex flex-col items-center ">
          <IoSettingsOutline size={40} />
          <p className="text-xs">Settings</p>
        </span>
      </NavLink>
    </div>
  );
}

export default Navbar;
