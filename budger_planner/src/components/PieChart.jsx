import ReactEcharts from "echarts-for-react";

function PieChart({ monthName, expensesName }) {
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
        left: "right",
      },
      series: [
        {
          name: expensesName.length === 0 ? "" : "Expense Categories",
          type: "pie",
          radius: ["40%", "70%"],
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
    <div className="bg-[#ffffff] rounded-3xl shadow-md">
      <ReactEcharts option={getOption()} />
    </div>
  );
}

export default PieChart;
