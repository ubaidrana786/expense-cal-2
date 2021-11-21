import React from "react";
import { AddExpense } from "./AddExpense";
import { ExpenseList } from "./ExpenseList";
import { Navigation } from "../Navigation";
export const HandleExpenses = () => {
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row " style={{ marginTop: "100px" }}>
          <div className="col-md-6 login__container">
            <h1 className="mb-5">Your Balance </h1>
            <div className="row mb-5">
              <div className="col-md-6  card">
                <h5>Recent Deposit</h5>
                <p>$ 12</p>
              </div>
              <div className="col-md-6 card">
                <h5>Recent Expense</h5>
                <p>$ 12</p>
              </div>
            </div>
            <AddExpense />
          </div>
          <div className="col-md-6">
            <ExpenseList />
          </div>
        </div>
      </div>
    </>
  );
};
// expenses = dataArr.map((data) => {
  
//   return data.Type === "expense" ? data.price : 0;
// });
// deposite = dataArr.map((data) => {
//   return data.Type === "deposit" ? data.price : 0;
// });

// setuserExpenseData(Object.values(doc.data(), doc.id));
//  const expenseSum = expenses.reduce(subtractArrayNum, 0);

//  const depositeSum = deposite.reduce(addArrayNum, 0);

// setuserExpenseData(dataArr);
// setmoney(depositBalance - expenseBalance);
//  console.log(depositeSum);
//  console.log(depositeSum - expenseSum);
