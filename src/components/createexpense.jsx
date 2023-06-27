import React, { useState } from "react";
import moment from "moment";
import "./expensestyles.css";
import { useData } from "./datacontext";
import Incomechart from "./incomechart";
import Expensechart from "./expensechart";

function Createexpense() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [name, setName] = useState("");

  const [data, setData] = useData();
  const date = new Date();

  const totalincome = data?.reduce((sum, ele) => {
    return ele.type === "income" ? sum + ele.money : sum;
  }, 0);
  const totalexpense = data?.reduce((sum, ele) => {
    return ele.type === "expense" ? sum + ele.money : sum;
  }, 0);

  const incomecategory = [
    "Salary",
    "business",
    "Pocket Money",
    "Savings",
    "gifts",
    "Prize money",
  ];
  const expensecategory = [
    "bills",
    "groceries",
    "clothes",
    "car",
    "travel",
    "food",
    "business Investments",
  ];

  const handleChangeType = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    setCategory("");
  };

  const handleChangeCategory = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      type: type,
      category: category,
      money: cost,
      product: name,
      date: date.toLocaleString(),
    };
    setData([newExpense, ...data]);
    localStorage.setItem("data", JSON.stringify([newExpense, ...data]));
  };

  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  const categoryOptions = type === "expense" ? expensecategory : incomecategory;

  return (
    <>
      <div
        className="row"
        // style={{ marginTop: "60px" }}
      >
        {/* *******income Tracker ************* */}
        <div className="d-flex flex-column col-md-4  ms-2">
          <div>
            <h3 className="text-center mt-5 mx-auto">Income tracker</h3>
          </div>
          <div>
            <Incomechart />
          </div>
        </div>
        {/* *******income Tracker end ************* */}

        <div
          className="col-md-3 border px-3 mt-5 "
          style={{ minHeight: "50vh" }}
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Expense tracker</h3>
            <h3 className="text-center">
              Total balance:{" "}
              <span
                style={{
                  color: totalincome - totalexpense > 0 ? "green" : "red",
                }}
              >
                {totalincome - totalexpense}
              </span>
            </h3>
            <div className="mt-5 row">
              <div className="col-6">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ borderBottom: "solid" }}
                  required
                  value={type}
                  onChange={handleChangeType}
                >
                  <option value="" disabled>
                    Type
                  </option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="category col-6">
                <select
                  className="form-select"
                  required
                  value={category}
                  onChange={handleChangeCategory}
                >
                  <option value="" disabled selected>
                    Category
                  </option>
                  {categoryOptions?.map((ele, idx) => (
                    <option key={idx} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 row">
              <div className="col-6">
                <input
                  id="item"
                  type="text"
                  placeholder="Name of product"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-6">
                <input
                  id="item"
                  type="number"
                  placeholder="Cost"
                  className="form-control"
                  value={cost}
                  onChange={(e) =>
                    setCost(e.target.value ? parseInt(e.target.value) : 0)
                  }
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <button type="submit" className="mx-auto px-3">
                Create
              </button>
            </div>
          </form>
          <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
            <table className="table my-table responsive">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Money</th>
                  <th style={{ minWidth: "150px" }}>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((ele, idx) => {
                  const time = moment(ele.date, "M/D/YYYY, h:mm:ss A");
                  return (
                    ele.type && (
                      <tr key={idx}>
                        <td
                          style={{
                            color: ele.type === "income" ? "green" : "red",
                          }}
                        >
                          {ele.type}
                        </td>
                        <td>{ele.category}</td>
                        <td
                          style={{
                            color: ele.type === "income" ? "green" : "red",
                          }}
                        >
                          <span
                            style={{
                              display:
                                ele.type === "income" ? "inline" : "none",
                            }}
                          >
                            +
                          </span>
                          <span
                            style={{
                              display:
                                ele.type === "income" ? "none" : "inline",
                            }}
                          >
                            -
                          </span>
                          {ele.money}
                        </td>
                        <td>
                          <small>{time.fromNow()}</small>
                        </td>
                        <td>
                          <div
                            className="btn bg-danger text-light"
                            onClick={() => handleDelete(idx)}
                          >
                            del
                          </div>
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* *******expense Tracker************* */}
        <div className="d-flex flex-column col-md-4  ms-2 mt-5 ">
          <div>
            <h3 className="text-center mx-auto">Expense tracker</h3>
          </div>
          <div>
            <Expensechart />
          </div>
        </div>
        {/* *******expense Tracker end ************* */}
      </div>
    </>
  );
}

export default Createexpense;
