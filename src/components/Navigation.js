import React from "react";
import { Link,useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { ImageUpload } from "./expense/ImageUpload";
export const Navigation = () => {
  const history = useHistory()
  const logout = (e) => {
    e.preventDefault();
    auth.signOut();
    history.push("./")
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-dark"
        style={{ backgroundColor: "#0f1760" }}
      >
        <div className="container">
          <Link className="navbar-brand " to="/">
            Expense Tracker
          </Link>
         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"> <Link className="navbar-brand " to="/expenselist">
            ExpenseList
          </Link></ul>
            <form className="form-inline my-2 my-lg-0">
              {/* <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> */}
              <ImageUpload />
              <button
                className="btn  my-2 my-sm-0"
                style={{
                  backgroundColor: "#e9e6e6",
                  color: "#192bc2",
                  fontWeight: "900px",
                }}
                onClick={logout}
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};
