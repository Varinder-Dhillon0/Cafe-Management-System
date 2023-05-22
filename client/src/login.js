import "./styles/login.css";
import { useState , useEffect} from "react";
import Axios from "axios";
import Cookies from 'universal-cookie';
import {  useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  
  const Navigation = useNavigate();
  const cookies = new Cookies();

  //variables for checks 
  let username_check = cookies.get('username');
  let name_check = cookies.get('name');

  //sending request to api for login
  const handleLogin = (e) => {
    e.preventDefault();

    if(!username){
      return toast.error("Enter Username");
    }

    if(!password){
      return toast.error("Enter Password");
    }

    //getting data from backend port 
    const getUser = Axios.post("http://localhost:5000/getUser", {
      username: username,
      password: password,
    })
      .then((res) => {
          // setting cookies to keep user logged in
          if(res.data.username){
            cookies.set('username', res.data.username);
            cookies.set('name', res.data.name);
            window.location.reload(false);
          }else{
            throw new Error();
          }
      })

      toast.promise(getUser, {
        loading: 'Logging in',
        success: 'Logged in',
        error: 'Username/password combination is wrong',
      });

  };

  useEffect(() => {
    //checking if user is already logged in on every load of page /login
    if(username_check && name_check){
      Navigation("/");
    }
  },[])

  return (
    <div className="login-wrapper">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form className="form">
        <h3>Login Here</h3>
        <input
          className="input"
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <p className="redirect">
          Not a user ? <a href="/sign-up">sign up</a>
        </p>
        <button type="button" onClick={handleLogin} className="button">
          Log In
        </button>
      </form>
    </div>
  );
}
