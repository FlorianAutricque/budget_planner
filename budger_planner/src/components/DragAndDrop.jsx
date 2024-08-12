import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./Column";

function DragAndDrop({
  expensesName,
  setExpensesName,
  monthName,
  handleSumChange,
  setOverallSum,
}) {
  const getExpensePos = (id) =>
    expensesName.findIndex((expense) => expense.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setExpensesName((expenses) => {
        const originalPos = getExpensePos(active.id);
        const newPos = getExpensePos(over.id);

        const updatedExpenses = arrayMove(expenses, originalPos, newPos);

        window.localStorage.setItem(
          `expenses-${monthName}`,
          JSON.stringify(updatedExpenses)
        );

        return updatedExpenses;
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
      {" "}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={expensesName}
          strategy={verticalListSortingStrategy}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={expensesName}
              strategy={verticalListSortingStrategy}
            >
              <Column
                tasks={expensesName}
                monthName={monthName}
                onSumChange={handleSumChange}
                setExpensesName={setExpensesName}
                setOverallSum={setOverallSum}
              />
            </SortableContext>
          </DndContext>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DragAndDrop;
