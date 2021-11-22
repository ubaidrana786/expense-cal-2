import React, { useState, useEffect } from "react";

import { auth, db } from "../firebase";
const AuthContext = React.createContext({
  isLoggedIn: false,
});
export const AuthContextProvider = (props) => {
  const [user, setuser] = useState();
  const [userExpenseData, setuserExpenseData] = useState([]);
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
    auth.onAuthStateChanged((user) => {
      setuser(user);
    });
  }, []);
  useEffect((user) => {
  calculateBalance()
  }, [user])
  const calculateBalance = ()=>{
    if (user) {
      db.collection("expense_calculator")
        .get()
        .then((Snapshot) => {
          Snapshot.docs.forEach((doc) => {
            if (doc.id === user.uid) {
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
  }

  const userIsLoggedIn = user;
  const allcalculation = depositBalance
 
  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    allBalance:allcalculation
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
