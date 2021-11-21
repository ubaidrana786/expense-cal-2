import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../firebase";

export const ShowModalBody = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else setuser(null);
    });
  }, []);

  const enteredTitleRef = useRef();
  const enteredAmountRef = useRef();
  const enteredTypeRef = useRef();
  const enteredDateRef = useRef();
  const [user, setuser] = useState(null);
  const [transactions, settransactions] = useState([]);
  const updateExpense = (e) => {
    e.preventDefault();
    const enteredTitleRefValue = enteredTitleRef.current.value;
    const enteredAmountRefValue = enteredAmountRef.current.value;
    const enteredTypeRefValue = enteredTypeRef.current.value;
    const enteredDateRefValue = enteredDateRef.current.value;
    const updatedTransactions = transactions;
    updatedTransactions.push({
      name: enteredTitleRefValue,
      Type: enteredTypeRefValue,
      price: enteredAmountRefValue,
      date: enteredDateRefValue,
    });

    // db.collection("expense_calculator")
    //   .doc(user.uid)
    //   .update({
    //     ...updatedTransactions
    //   })
    //   .then((element) => {
    //     // settransactions(updatedTransactions);

    //   })
    //   .catch((error) => {
    //     //error callback

    //     alert("error ", error);
    //   });
  };
  return (
    <div>
      <div className="container ">
        <div className="row mt-5">
          <div className=" ">
            <form>
              <div className="form-row row mb-5">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    ref={enteredTitleRef}
                    // onChange={(e) => setEnteredTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    min="0.01"
                    step="0.01"
                    // onChange={amountChangeHandler}
                    ref={enteredAmountRef}
                    placeholder="Amount"
                  />
                </div>
              </div>
              <div className="form-row row">
                <div className="form-group col-md-6">
                  <select
                    name="type"
                    className="form-control"
                    // onChange={TypeChangeHandler}
                    ref={enteredTypeRef}
                  >
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
                    // onChange={(e) => setenteredDate(e.target.value)}
                    ref={enteredDateRef}
                  />
                </div>
              </div>

              <div className="login__container">
                <button
                  className="btn "
                  style={{ backgroundColor: "#19215c", color: "white" }}
                  onClick={updateExpense}
                >
                  Update Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
