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
          name: "Expense Categories",
          type: "pie",
          radius: ["30%", "70%"],
          roseType: "area",
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
  return <ReactEcharts option={getOption()} />;
}

export default PieChart;
