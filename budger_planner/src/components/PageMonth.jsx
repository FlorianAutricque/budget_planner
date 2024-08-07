import { useState } from "react";
import { useParams } from "react-router-dom";

function PageMonth() {
  const { monthId } = useParams();
  const [value, setValue] = useState("");

  const monthNames = {
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
  };

  const monthName = monthNames[monthId] || "Unknown Month";

  return (
    <div>
      {monthName}

      <div>
        <p>salary : {value}</p>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border"
          type="number"
          placeholder="Input your salary"
        />
      </div>
    </div>
  );
}

export default PageMonth;
