import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/sass/_radioButtons.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [styles, setStyles] = useState({ display: "none" });
  const navigate = useNavigate();
  const validateEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const validateForm = (email, password) => {
    if (email.length <= 2 && password.length < 5) {
      setErrorMessage("Të dhëna të pasakta!");
      return false;
    } else if (!validateEmail.test(email)) {
      setErrorMessage(
        "Ju lutem shkruani formatin e duhur të adresës elektronike!"
      );
      return false;
    } else if (validateEmail.test(email) && password.length < 5) {
      setErrorMessage("Fjalëkalimi juaj duhet të ketë së paku 5 karaktere!");
      return false;
    } else {
      return true;
    }
  };
  const submitHandler = event => {
    event.preventDefault();

    if (!validateForm(email, password)) {
      setStyles({
        display: "inline"
      });
      return;
    }
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (
            data.access_token &&
            data.access_token !== "" &&
            data.access_token !== undefined
          ) {
            localStorage.setItem("token", data.access_token);
            if (data.role === "Company") {
              navigate("/company");
            } else {
              navigate("/jobseeker");
            }
          } else {
            setErrorMessage(data.msg);
            setStyles({
              display: "inline"
            });
          }
        });
      } else {
        return res.json().then(data => {
          console.log("Something went wrong: " + data);
        });
      }
    });
  };
  return (
    <div className="login">
      <div className="login-inside absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] w-4/5">
        <div className="container lg:w-4/5">
          <div className="row items-center">
            <h1 className="uppercase font-semibold text-brown text-xl">
              Gjej punëtorin/punëdhënësin potencial
            </h1>
            <div className="border-b-2 border-solid border-light-brown mb-5 pt-1"></div>
            <div className="col-md-6">
              <div className="image h-full">
                <img
                  className="h-full object-cover"
                  src={require("../assets/images/login.jpg")}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-5 offset-lg-1">
              <div className="content transition ease-in duration-300">
                <form
                  onSubmit={submitHandler}
                  className="flex flex-column animate"
                >
                  <h2 className="text-3xl md:mb-5 font-medium text-light-brown pt-2">
                    Kyçu/Regjistrohu
                  </h2>
                  <input
                    className="border text-xs text-light-brown border-brown xl:w-3/4 focus-visible:border-red mt-3 p-2 mb-1"
                    type="text"
                    name="username"
                    placeholder="ADRESA ELEKTRONIKE"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  ></input>
                  <input
                    className="border text-xs text-light-brown border-brown xl:w-3/4 mt-1 p-2 mb-3"
                    type="password"
                    name="password"
                    placeholder="FJALËKALIMI"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  ></input>
                  <section
                    className="error_messages mb-3 xl:w-3/4"
                    style={styles}
                  >
                    <span className="error_msg font-medium text-red">
                      <i
                        className="fa fa-exclamation-circle mr-1"
                        style={{ color: "red" }}
                      ></i>
                      {errorMessage}
                    </span>
                  </section>
                  <div className="buttons">
                    <button
                      type="submit"
                      className="button uppercase submit rounded-none border w-full xl:w-3/4 px-4 py-1 text-sm text-brown mt-3"
                    >
                      Kyçu
                    </button>
                    <Link to="/register">
                      <p className="xl:w-3/4 no-underline text-sm text-light-brown font-medium hover:text-brown">
                        Nuk keni llogari? Regjistrohu
                      </p>
                    </Link>
                    <Link to="/reset">
                      <p className="xl:w-3/4 text-sm text-light-brown font-medium hover:text-brown cursor-pointer">
                        Keni harruar fjalëkalimin?
                      </p>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
