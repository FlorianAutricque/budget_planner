import { NavLink } from "react-router-dom";

function Homepage() {
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

  const day = new Date();
  const currentMonthIndex = day.getMonth();
  const month = months[currentMonthIndex];
  const name = month ? month.nameMonth : "Unknown Month";

  return (
    <div>
      <h2>Welcome to your budget planner</h2>

      <p>We are in {name}, let&apos;s track our budget</p>

      <NavLink to={`/month/${month.id}`}>Start now</NavLink>
    </div>
  );
}

export default Homepage;
