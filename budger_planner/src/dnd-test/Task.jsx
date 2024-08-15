import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SumInputEachExpense from "../components/SumInputEachExpense";
import DeleteExpense from "../components/DeleteExpense";

function Task({
  id,
  title,
  monthName,
  onSumChange,
  expensesName,
  setExpensesName,
  setOverallSum,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-blue-100 flex flex-col gap-8 p-2 touch-none"
    >
      <div className="flex items-center justify-between">
        <div>{title}</div>
        <DeleteExpense
          monthName={monthName}
          expensesName={expensesName}
          setExpensesName={setExpensesName}
          expense={{ id, name: title }}
          setOverallSum={setOverallSum}
        />
      </div>
      <SumInputEachExpense
        monthName={monthName}
        expenseId={id}
        onSumChange={onSumChange}
      />
    </div>
  );
}

export default Task;
