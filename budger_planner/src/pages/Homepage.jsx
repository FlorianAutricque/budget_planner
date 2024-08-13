import { NavLink } from "react-router-dom";

function Homepage({ month, name }) {
  return (
    <div className="px-[1rem]">
      <h2>Welcome to your budget planner</h2>

      <p>We are in {name}, let&apos;s track our budget</p>

      <NavLink to={`/month/${month.id}`}>Start now</NavLink>
    </div>
  );
}

export default Homepage;
