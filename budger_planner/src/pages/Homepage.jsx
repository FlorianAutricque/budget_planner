import { NavLink } from "react-router-dom";

function Homepage({ month, name }) {
  return (
    <div className="px-[1rem] flex flex-col items-center gap-8">
      <h2 className="mt-10">Welcome to your budget planner</h2>

      <p>
        We are in <strong>{name}</strong>, let&apos;s track our budget
      </p>

      <NavLink to={`/month/${month.id}`} className="btn text-center">
        Start now
      </NavLink>
    </div>
  );
}

export default Homepage;
