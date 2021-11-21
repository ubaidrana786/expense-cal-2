import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [emailError, setEmailError] = useState("");
  const [emailClass, setEmailClas] = useState("");
  const [passwordError, setpasswordError] = useState();
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const emailHandler = (e) => {
    const enteredEmailRefValue = enteredEmailRef.current.value;

    if (!validateEmail(enteredEmailRefValue)) {
      setEmailError("Invalid email");
      setEmailClas("error");
    } else {
      setEmailClas("");
      setEmailError("");
    }
  };
  const PasswordHandler = (e) => {
    const enteredPasswordRefValue = enteredPasswordRef.current.value;

    if (enteredPasswordRefValue.length < 6) {
      setpasswordError("Invalid Password");
      setEmailClas("error");
    } else {
      setEmailClas("");
      setpasswordError("");
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  // useEffect(() => {
  //     if (loading) {
  //         // maybe trigger a loading screen
  //         return;
  //     }
  //     if (user) history.replace("/dashboard");
  // }, [user, loading]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const enteredEmailRefValue = enteredEmailRef.current.value;
    const enteredPasswordRefValue = enteredPasswordRef.current.value;
    try {
      const result = await auth.signInWithEmailAndPassword(
        enteredEmailRefValue,
        enteredPasswordRefValue
      );

      // window.M.toast({ html: `welcome ${result.user.email}`, classes: "green" })
      toast.success("User is logged in", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push("/");
    } catch (err) {
      toast.error(err + "", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <section className="ftco-section">
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center"></div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                <h3 className="text-center mb-4">Sign In</h3>
                <form onSubmit={handlesubmit} className="login-form">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="Email"
                      onBlur={emailHandler}
                      ref={enteredEmailRef}
                    />

                    {
                      <span style={{ color: "red" }} className="error-message">
                        {emailError}
                      </span>
                    }
                  </div>
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      onBlur={PasswordHandler}
                      ref={enteredPasswordRef}
                    />
                  </div>
                  {
                    <span style={{ color: "red" }} className="error-message">
                      {passwordError}
                    </span>
                  }
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary rounded submit px-3"
                    >
                      Log_In
                    </button>
                  </div>
                  <div className="form-group ">
                    <div className="w-100 text-center">
                      <a href="#" onClick={signInWithGoogle}>
                        Sign_In with Google
                      </a>
                    </div>
                  </div>
                  <div className="form-group">
                    <span className="form-control btn btn-primary rounded submit px-3">
                      Don't have an account?{" "}
                      <Link to="/sign" style={{ color: "#E4959E" }}>
                        Register
                      </Link>{" "}
                      now.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
