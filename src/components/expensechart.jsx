import React from "react";
import { Chart as ChartJs, Legend, Tooltip, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useData } from "./datacontext";
ChartJs.register(ArcElement, Legend, Tooltip);
var expense_list;
function Expensechart() {
  const [data, setData] = useData();
  const expensecategory = [
    "bills",
    "groceries",
    "clothes",
    "car",
    "travel",
    "food",
    "business Investments",
  ];
  expense_list = expensecategory?.map((ele, idx) => {
    return data.reduce((acc, item) => {
      return item.type === "expense" && item.category === ele
        ? acc + item.money
        : acc;
    }, 0);
  });
  const datavalues = {
    labels: [
      "bills",
      "groceries",
      "clothes",
      "car",
      "travel",
      "food",
      "business Investments",
    ],
    datasets: [
      {
        data: expense_list,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
          "#9922FF",
        ],
      },
    ],
  };
  return (
    <>
      <Doughnut data={datavalues}></Doughnut>
    </>
  );
}

function ExpenseData() {
  return <div>expensechart ${expense_list}</div>;
}

export { Expensechart, ExpenseData };
