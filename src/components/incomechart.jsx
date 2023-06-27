import React from "react";
import { Chart as ChartJs, Legend, Tooltip, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useData } from "./datacontext";
ChartJs.register(ArcElement, Legend, Tooltip);

function Incomechart() {
  const [data, setData] = useData();
  const incomecategory = [
    "Salary",
    "business",
    "Pocket Money",
    "Savings",
    "gifts",
    "Prize money",
  ];
  const income_list = incomecategory?.map((ele, idx) => {
    return data.reduce((acc, item) => {
      return item.type === "income" && item.category === ele
        ? acc + item.money
        : acc;
    }, 0);
  });
  // console.log(income_list);

  // console.log(data);
  // console.log("data");

  const datavalues = {
    labels: [
      "Salary",
      "business",
      "Pocket Money",
      "Savings",
      "gifts",
      "Prize money",
    ],
    datasets: [
      {
        data: income_list,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#FF9F40",
          "#9966FF",
        ],
      },
    ],
  };
  return (
    <>
      {/* <div>incomechart</div> */}
      <Doughnut data={datavalues}></Doughnut>
    </>
  );
}

export default Incomechart;
