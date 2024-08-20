import ReactEcharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

function PieChart({ monthName, expensesName }) {
  const { t } = useTranslation();

  const getOption = () => {
    return {
      title: {
        text: monthName,
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "",
        top: "center",
      },
      series: [
        {
          name: expensesName.length === 0 ? "" : t("PAGE_MONTH.PIE"),
          type: "pie",
          radius: ["40%", "70%"],
          center: ["65%", "50%"],
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "outside",
          },
          data: expensesName.map((expense) => ({
            value:
              parseFloat(
                localStorage.getItem(`sum-${monthName}-${expense.id}`)
              ) || 0,
            name: expense.name,
          })),
        },
      ],
    };
  };
  return (
    <div className="bg-[#ffffff] rounded-3xl shadow-md mt-8 mb-8">
      <ReactEcharts option={getOption()} />
    </div>
  );
}

export default PieChart;
