import React, { useEffect, useState, useRef, useContext } from "react";
import { ExpenseList } from "./ExpenseList";
import "../Login.css";
import { auth, db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../../store/auth-contex";


export const AddExpense = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    Amount: true,
    Type: true,
    date: true,
  });
  const [money, setmoney] = useState(0);
  const enteredTitleRef = useRef();
  const enteredAmountRef = useRef();
  const enteredTypeRef = useRef();
  const enteredDateRef = useRef();
  const [transactions, settransactions] = useState([]);
  useEffect(() => {
    if (isLoggedIn) {
      fetchDbData();
    }
  }, [isLoggedIn]);

  const fetchDbData = () => {
    db.collection("expense_calculator")
      .get()
      .then((Snapshot) => {
        Snapshot.docs.forEach((doc) => {
          if (doc.id === isLoggedIn.uid) {
            settransactions(Object.values(doc.data()));
          }
        });
      });
  };

  const addExpenseData = (e) => {
    e.preventDefault();
    const enteredTitleRefValue = enteredTitleRef.current.value;
    const enteredAmountRefValue = enteredAmountRef.current.value;
    const enteredTypeRefValue = enteredTypeRef.current.value;
    const enteredDateRefValue = enteredDateRef.current.value;
    const enteredTitleIsValid = !isEmpty(enteredTitleRefValue);
    const enteredAmountIsValid = !isEmpty(enteredAmountRefValue);
    const enteredTypeIsValid = !isEmpty(enteredTypeRefValue);
    const enteredDateIsValid = !isEmpty(enteredDateRefValue);

    setFormInputsValidity({
      name: enteredTitleIsValid,
      Amount: enteredAmountIsValid,
      Type: enteredTypeIsValid,
      date: enteredDateIsValid,
    });

    const formIsValid =
      enteredTitleIsValid &&
      enteredAmountIsValid &&
      enteredTypeIsValid &&
      enteredDateIsValid;

    if (!formIsValid) {
      return;
    }
    const updatedTransactions = transactions;
    updatedTransactions.push({
      id: updatedTransactions.length,
      name: enteredTitleRefValue,
      Type: enteredTypeRefValue,
      price: enteredAmountRefValue,
      date: enteredDateRefValue,
    });
    db.collection("expense_calculator")
      .doc(isLoggedIn.uid)
      .set({
        ...updatedTransactions,
      })
      .then((element) => {
        settransactions(updatedTransactions);
        // setmoney(enteredTypeRefValue === 'deposit' ? money + parseFloat(enteredAmountRefValue) : money - parseFloat(enteredAmountRefValue),)
      })
      .catch((error) => {
        //error callback

        alert("error ", error);
      });
  };
  //  console.log("transaction" + transactions)

  return (
    <>
   
      <ToastContainer />
      <div className="container">
        <div
          className="row "
          style={{ marginTop: "100px", justifyContent: "center" }}
        >
          <div className="col-md-6 login__container">
            <h1 className="mb-5">
              {" "}
              <span className="text-success">
                {isLoggedIn.displayName}
              </span>{" "}
            </h1>
            <h5>Your Balance</h5>
            <div className="row mb-5">
              <div className="col-md-6  card">
                <h5>Recent Deposit</h5>
                <p>$ 12</p>
              </div>
              <div className="col-md-6 card">
                <h5>Recent Expense </h5>
                <p>$ 12</p>
              </div>
            </div>
            <form onSubmit={addExpenseData}>
              <div className="form-row row mb-5">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    ref={enteredTitleRef}
                    placeholder="Title"
                  />
                  {!formInputsValidity.name && (
                    <p className="text-danger">Please enter a valid name!</p>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    min="0.01"
                    step="0.01"
                    ref={enteredAmountRef}
                    placeholder="Amount"
                  />
                  {!formInputsValidity.Amount && (
                    <p className="text-danger">Please enter a valid name!</p>
                  )}
                </div>
              </div>
              <div className="form-row row">
                <div className="form-group col-md-6">
                  <select
                    name="type"
                    className="form-control"
                    ref={enteredTypeRef}
                  >
                    {!formInputsValidity.Type && (
                      <p className="text-danger">Please enter a valid Type!</p>
                    )}
                    <option value="0">Type</option>
                    <option value="expense">Expense</option>
                    <option value="deposit">Deposit</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Date"
                    ref={enteredDateRef}
                  />
                  {!formInputsValidity.date && (
                    <p className="text-danger">Please enter a valid Date!</p>
                  )}
                </div>
              </div>

              <div className="login__container">
                <button
                  className="btn text-white"
                  style={{ backgroundColor: "#0f1760" }}
                  style={{ backgroundColor: "#19215c" }}
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col-md-6">
            <ExpenseList />
          </div> */}
        </div>
      </div>
    </>
  );
};
