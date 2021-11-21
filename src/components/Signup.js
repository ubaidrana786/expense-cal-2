import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, storage } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../store/auth-contex";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [image, setimage] = useState(null);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };
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
    if (displayName && email && password) {
      try {
        const result = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        storage
          .ref("users/" + auth.currentUser.uid + "/profileImage")
          .put(image)
          .then((res) => {
            console.log("uploaded success");
            var currentUser = auth.currentUser;
            currentUser.updateProfile({
              displayName: displayName,
            });
          });

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
    } else {
      alert("please fill data");
    }
  };
  return (
    <>
      <section className="ftco-section">
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center">
            {/* <div className="col-md-6 text-center mb-5">
					<h2 className="heading-section">Login #01</h2>
				</div> */}
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                <h3 className="text-center mb-4">Sign Up</h3>
                <form action="#" className="login-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Username"
                      value={displayName}
                      onChange={(e) => setdisplayName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control rounded-left"
                      placeholder="E_mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group d-flex">
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group d-flex">
                    <input
                      type="file"
                      className="form-control"
                      height="50px"
                      width="50px"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary rounded submit px-3"
                      onClick={(e) => handlesubmit(e)}
                    >
                      Sign_Up
                    </button>
                  </div>
                  <div className="form-group ">
                    <div className="w-100 text-center">
                      <Link to="/" className="text-primary">
                        Already have an Accounts ?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
