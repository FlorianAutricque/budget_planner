import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

function Column({
  tasks,
  monthName,
  onSumChange,
  setExpensesName,
  setOverallSum,
}) {
  return (
    <div className="bg-red-200 flex flex-col gap-2 p-4">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((expense) => (
          <Task
            key={expense.id}
            id={expense.id}
            title={expense.name}
            monthName={monthName}
            onSumChange={onSumChange}
            expensesName={tasks}
            setExpensesName={setExpensesName}
            setOverallSum={setOverallSum}
          />
        ))}
      </SortableContext>
    </div>
  );
}

export default Column;
