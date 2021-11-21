import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../../firebase";
import { Modal, Button } from "react-bootstrap";
import { ShowModalBody } from "./ShowModalBody";
import { toast } from "react-toastify";
import AuthContext from "../../store/auth-contex";


export const ExpenseList = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [userExpenseData, setuserExpenseData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [money, setmoney] = useState(0);
  const [depositBalance, setdepositBalance] = useState("");
  const [expenseBalance, setexpenseBalance] = useState("");
  var expenses = 0;
  var deposite = 0;

  const addArrayNum = (a, b) => {
    return +a + +b;
  };
  const subtractArrayNum = (a, b) => {
    return a - -b;
  };

  useEffect(() => {
    if (isLoggedIn) {
      db.collection("expense_calculator")
        .get()
        .then((Snapshot) => {
          Snapshot.docs.forEach((doc) => {
            if (doc.id === isLoggedIn.uid) {
              let dataArr = Object.values(doc.data());
              dataArr.forEach((data) => {
                data.doc_id = doc.id;
                //console.log(data)
              });

              expenses = dataArr.map((data) => {
                return data.Type === "expense" ? data.price : 0;
              });
              deposite = dataArr.map((data) => {
                return data.Type === "deposit" ? data.price : 0;
              });

              setuserExpenseData(Object.values(doc.data(), doc.id));
              const expenseSum = expenses.reduce(subtractArrayNum, 0);
              setexpenseBalance(expenseSum);
              // setexpenseBalance(expenses.reduce(subtractArrayNum, 0));
              const depositeSum = deposite.reduce(addArrayNum, 0);
              setdepositBalance(depositeSum);
              // setdepositBalance(deposite.reduce(addArrayNum, 0));
              setuserExpenseData(dataArr);
              setmoney(depositeSum - expenseSum);
              // console.log(depositeSum);
              console.log(depositeSum - expenseSum);
            }
          });
        });
    }
  }, [isLoggedIn]);
  const OnDlete = (id) => {
    //     db.collection("expense_calculator").doc().delete()
  };
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter ">
            Update Expenses
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowModalBody />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
  
      <div className="container">
        <div className="mt-4">
          <h1 style={{ marginTop: "100px" }}>Recent Expenses</h1>
          <h4>Total Balance {money}</h4>
          <h4>expense {expenseBalance}</h4>
          <h4>deposit {depositBalance}</h4>
          <div className="" style={{ margin: "auto" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Price (Rs)</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {userExpenseData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.Type}</td>
                      <td>{item.date}</td>
                      {/* <button
                    className="btn text-white mr-2"
                    style={{ backgroundColor: "#0f1760" }}
                    className="btn text-white"
                    style={{ backgroundColor: "#19215c" }}
                    onClick={() => setModalShow(true)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn text-white"
                    style={{ backgroundColor: "#0f1760" }}
                    className="btn text-white"
                    style={{ backgroundColor: "#19215c" }}
                    onClick={() => OnDlete(item.id)}
                  >
                    Dlete
                  </button> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </>
  );
};
