import { NavLink } from "react-router-dom";

import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import Column from "./components/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

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

  const [tasks, setTasks] = useState([
    { id: 1, title: "one" },
    { id: 2, title: "two" },
    { id: 3, title: "three" },
  ]);

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If `over` is null, do nothing
    if (!over) return;

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const originalPos = getTaskPos(active.id);
        const newPos = getTaskPos(over.id);

        return arrayMove(tasks, originalPos, newPos);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div>
      <h2>Welcome to your budget planner</h2>

      <p>We are in {name}, let&apos;s track our budget</p>

      <NavLink to={`/month/${month.id}`}>Start now</NavLink>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default Homepage;
