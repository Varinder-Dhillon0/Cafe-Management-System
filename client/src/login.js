import "./styles/login.css";
import { useState } from "react";
import LoaderBlack from "./Loaders/loaderblack";
import Axios from "axios";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const cookies = new Cookies();

  //sending request to api for login
  const handleLogin = async (e) => {

    //preventing default behaviour of refresh
    e.preventDefault();

    try {

      if (!username || !password) {
        return toast.error("username and password are required");
      }

      setloading(true);

      //getting data from backend port
      await Axios.post(apiUrl + "/getUser", {
        username: username,
        password: password,
      }).then((res) => {
        // setting cookies to keep user logged in
        if (res.data.username) {
          cookies.set("username", res.data.username, { sameSite: "strict" });
          cookies.set("name", res.data.name, { sameSite: "strict" });
          window.location.reload(false);
        } else {
          toast.error(res.data.error || "an error occured");
          setloading(false);
        }
      })
    }catch(err){
      // network errors or other exceptions
      toast.error('Failed to connect to the server');
      setloading(false);
    }
    };

    //whenever user presses enter key
    const handleEnterKey = (e) => {
      if (e.key === "Enter") {
        handleLogin(e);
      }
    };

    return (
      <div className="login-wrapper">
        <div className="login_card">
          <div className="background">
            <div className="shape" />
            <div className="shape" />
          </div>
          <form className="form" onSubmit={handleLogin}>
            <h3>Login Here</h3>
            <input
              className="input"
              type="text"
              placeholder="Username"
              id="username"
              onChange={(e) => setusername(e.target.value)}
              onKeyDown={handleEnterKey}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              onKeyDown={handleEnterKey}

            />
            <p className="redirect">
              Not a user ? <a href="/sign-up">sign up</a>
            </p>
            <button
              type="button"
              onClick={handleLogin}
              className="button"
            >
              {loading ? <LoaderBlack /> : "Log In"}
            </button>
          </form>
        </div>
      </div>
    );
  }