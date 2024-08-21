import { NavLink } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function SliderMonths() {
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

  const [isActive, setIsActive] = useState(false);
  const sliderRef = useRef(null);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  function sliderLeft() {
    const slider = sliderRef.current;
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  function sliderRight() {
    const slider = sliderRef.current;
    slider.scrollLeft = slider.scrollLeft + 200;
  }

  const currentMonthIndex = new Date().getMonth();

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      const monthElement = slider.children[currentMonthIndex];
      const sliderWidth = slider.offsetWidth;
      const elementWidth = monthElement.offsetWidth;
      const elementLeftPosition = monthElement.offsetLeft;

      const scrollPosition =
        elementLeftPosition - sliderWidth / 2 + elementWidth / 2;

      slider.scrollLeft = scrollPosition;
      const currentMonthText = monthElement.querySelector("p");
      if (currentMonthText) {
        currentMonthText.style.color = "white";
      }
    }
  }, [currentMonthIndex]);

  return (
    <div className="sliderMonth pt-[2rem] px-2">
      <div className="flex items-center gap-2">
        <p className="cursor-pointer" onClick={sliderLeft}>
          <FaArrowLeft color="white" />
        </p>
        <div
          id="slider"
          ref={sliderRef}
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
                  <p>{month.nameMonth}</p>
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
