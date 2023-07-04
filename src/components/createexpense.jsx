import React, { useState } from "react";

import "./expensestyles.css";
import { useData } from "./datacontext";
import Incomechart from "./incomechart";
import { Expensechart, ExpenseData } from "./expensechart";
import useSound from "use-sound";
import notification from "./Notification.mp3";
import toast, { Toaster } from "react-hot-toast";

function Createexpense() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [name, setName] = useState("");
  const [play, { stop }] = useSound(notification);

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
    play();
    toast.success("succesfully added");
    setData([newExpense, ...data]);
    localStorage.setItem("data", JSON.stringify([newExpense, ...data]));
  };

  const handleDelete = (index) => {
    var deleteConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (deleteConfirmed) {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
      toast.success("Succesfully deleted");
      localStorage.setItem("data", JSON.stringify(updatedData));
    }
  };
  const HandleReset = () => {
    const confirm = window.confirm(
      "Are you sure wanted to clear your all income and expense data "
    );
    if (confirm) {
      const confirm = window.confirm(
        "Reset means all your income and expense data will erase and starts from new, Are you Ok with that?  "
      );
      if (confirm) {
        setData([]);
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
  };
  const categoryOptions = type === "expense" ? expensecategory : incomecategory;

  return (
    <>
      <div
        className="row"
        // style={{ marginTop: "60px" }}
      >
        {/* *******expense Tracker************* */}
        <div className="d-flex flex-column col-md-4  ms-2 mt-md-5 ">
          <div className="mt-1">
            <h3 className="text-center mx-auto text-light p-1 my-2 rounded bg-primary">
              Expense Chart
            </h3>
          </div>
          <div className="d-flex" style={{ backgroundColor: "beige" }}>
            <h6 className="mx-auto">Total Expenses:{totalexpense}</h6>
          </div>
          <div>
            <Expensechart />
          </div>
        </div>
        {/* *******expense Tracker end ************* */}

        <div
          className="col-md-3 border  mt-5 fluid-container "
          style={{
            backgroundColor: "beige",
            minHeight: "50vh",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleSubmit} className="" style={{}}>
            {" "}
            <h3
              // id="blink"
              className="text-light  text-center  p-1 my-2 rounded bg-primary 
            "
            >
              Expense tracker
            </h3>
            <h3 className="text-center mt-3">
              Total balance:{" "}
              <span
                style={{
                  color: totalincome - totalexpense > 0 ? "green" : "red",
                }}
                className={
                  totalincome - totalexpense < 0 ? " blink" : "noblink"
                }
              >
                {totalincome - totalexpense}
              </span>
            </h3>
            <div className="d-flex">
              <small
                style={{
                  display:
                    totalincome - totalexpense < 0 && data.length > 0
                      ? "block"
                      : "none",
                }}
                className="mx-auto text-center text-danger blink"
              >
                you are running out of your money
              </small>
            </div>
            <div className="d-flex">
              {console.log(totalincome, totalexpense)}
              <small
                style={{
                  display:
                    totalincome - totalexpense < totalincome * 0.1 &&
                    totalincome - totalexpense > 0
                      ? "block"
                      : "none",
                }}
                className="mx-auto text-center text-warning blink"
              >
                your balance is lessthan 10% of your income<br></br>
                your total income is {totalincome}
              </small>
            </div>
            <div className="mt-3 row">
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
                  // value={cost}
                  onChange={(e) => setCost(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="d-flex mt-3">
              <button
                type="submit"
                className="mx-auto px-3 bg-primary rounded h6 py-1 text-light
                "
              >
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
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((ele, idx) => {
                  const date = new Date(Date.now());
                  // console.log(date.toLocaleString());
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
                          {/* <small>{time}</small> */}

                          <small>{date.toLocaleString()}</small>
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
          <div className="py-3">
            <button
              className=" m-1  bg-warning container rounded "
              onClick={HandleReset}
            >
              <h4>Reset</h4>
            </button>
          </div>
        </div>

        {/* *******income Tracker ************* */}
        <div className="d-flex flex-column col-md-4  ms-2">
          <div className="mt-2">
            <h3 className="text-center mt-md-5 mx-auto text-light p-1 my-2 rounded bg-primary">
              Income Chart
            </h3>
          </div>
          <div className="d-flex" style={{ backgroundColor: "beige" }}>
            <h6 className="mx-auto pt-2">Total Income:{totalincome}</h6>
          </div>
          <div>
            <Incomechart />
          </div>
        </div>
        {/* *******income Tracker end ************* */}
      </div>
      <hr></hr>

      {/* <div className="">Your highest spending is on {}</div>
      <ExpenseData></ExpenseData> */}
      <div>
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
          <table className="table my-table responsive">
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Money</th>
                <th style={{ minWidth: "150px" }}>Time</th>
                <th>Product</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((ele, idx) => {
                const date = new Date(Date.now());
                // console.log(date.toLocaleString());
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
                            display: ele.type === "income" ? "inline" : "none",
                          }}
                        >
                          +
                        </span>
                        <span
                          style={{
                            display: ele.type === "income" ? "none" : "inline",
                          }}
                        >
                          -
                        </span>
                        {ele.money}
                      </td>
                      <td>
                        {/* <small>{time}</small> */}

                        <small>{date.toLocaleString()}</small>
                      </td>
                      <td>{ele.product}</td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
}

export default Createexpense;
