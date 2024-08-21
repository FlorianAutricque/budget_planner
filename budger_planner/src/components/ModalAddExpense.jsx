import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";

function ModalAddExpense({
  pie,
  salaryRef,
  sum,
  expenses,
  money,
  valueNameExpense,
  addNameOfExpense,
  addNewExpense,
  showModalAddExpense,
  setShowModalAddExpense,
}) {
  const { t } = useTranslation();
  function handleShowModalAddExpense() {
    setShowModalAddExpense(!showModalAddExpense);

    if (pie.current) pie.current.classList.toggle("blur");
    if (salaryRef.current) salaryRef.current.classList.toggle("blur");
    if (sum.current) sum.current.classList.toggle("blur");
    if (expenses.current) expenses.current.classList.toggle("blur");
    if (money.current) money.current.classList.toggle("blur");
  }

  const modalRef = useRef(null);

  //CLOSE MODAL CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModalAddExpense(false);
        if (pie.current) pie.current.classList.remove("blur");
        if (salaryRef.current) salaryRef.current.classList.remove("blur");
        if (sum.current) sum.current.classList.remove("blur");
        if (expenses.current) expenses.current.classList.remove("blur");
        if (money.current) money.current.classList.remove("blur");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pie, salaryRef, sum, expenses, money, setShowModalAddExpense]);
  return (
    <div>
      <button
        onClick={handleShowModalAddExpense}
        className="z-50 fixed bottom-[70px] right-[10px]"
      >
        <IoIosAddCircle
          color="var(--btn-blue)"
          size={60}
          className="bg-white rounded-[50%] p-[-5px]"
        />
      </button>
      {showModalAddExpense && (
        <div ref={modalRef} className="modal">
          <span
            onClick={handleShowModalAddExpense}
            className="fixed right-2 top-2 cursor-pointer"
          >
            <IoMdCloseCircleOutline size={20} />
          </span>
          <h3>{t("PAGE_MONTH.INPUT_NEW_EXP.TITLE")}</h3>
          <input
            value={valueNameExpense}
            type="text"
            placeholder={t("PAGE_MONTH.INPUT_NEW_EXP.PLACEHOLDER")}
            onChange={addNameOfExpense}
            className="border rounded-md bg-[var(--background-color)]"
          />
          <button onClick={addNewExpense} className="btn">
            {t("PAGE_MONTH.BTN_ADD")}
          </button>
        </div>
      )}
    </div>
  );
}

export default ModalAddExpense;
