import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

function SliderMonths() {
  const months = [
    { id: 1, nameMonth: "Januray" },
    { id: 2, nameMonth: "February" },
    { id: 3, nameMonth: "March" },
    { id: 4, nameMonth: "April" },
    { id: 5, nameMonth: "May" },
    { id: 6, nameMonth: "June" },
    { id: 7, nameMonth: "July" },
    { id: 8, nameMonth: "August" },
    { id: 9, nameMonth: "September" },
    { id: 10, nameMonth: "October" },
    { id: 11, nameMonth: "November" },
    { id: 12, nameMonth: "December" },
  ];

  const [isActive, setIsActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  function sliderLeft() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  function sliderRight() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 200;
  }

  return (
    <div className="sliderMonth pt-[2rem]">
      <div className="flex items-center gap-2">
        <p className="cursor-pointer" onClick={sliderLeft}>
          <FaArrowLeft color="white" />
        </p>
        <div
          id="slider"
          className="hide-scrollbar flex gap-8 overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
          onClick={toggleActiveClass}
        >
          {months.map((month) => (
            <div key={month.id}>
              <div onClick={removeActive}>
                <NavLink
                  to={`/month/${month.id}`}
                  key={month.id}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white border-white border-b-4 z-20 font-bold block h-[2rem]"
                      : "text-[#b3b2b2]"
                  }
                >
                  {month.nameMonth}
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <p className="cursor-pointer" onClick={sliderRight}>
          <FaArrowRight color="white" />
        </p>
      </div>
    </div>
  );
}

export default SliderMonths;
