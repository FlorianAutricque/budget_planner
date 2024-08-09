import { NavLink } from "react-router-dom";

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

  function sliderLeft() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 200;
  }

  function sliderRight() {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 200;
  }

  return (
    <div>
      <div className="flex gap-2">
        <p className="cursor-pointer" onClick={sliderLeft}>
          ICI
        </p>
        <div
          id="slider"
          className="flex gap-8 overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {months.map((month) => (
            <NavLink
              to={`/month/${month.id}`}
              className="list-none"
              key={month.id}
            >
              {month.nameMonth}
            </NavLink>
          ))}
        </div>
        <p className="cursor-pointer" onClick={sliderRight}>
          ICI
        </p>
      </div>
    </div>
  );
}

export default SliderMonths;
