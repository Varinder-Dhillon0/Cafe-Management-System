import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Sign from "./sign-up";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

//for different routes that user can route to and rendering it to root which is present in index.html
//by selecting it

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<Sign />}></Route>
      </Routes>
    </BrowserRouter>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 2000,
          style: {
            border: '1px solid #713200',
            padding: '10px',
            borderRadius : '35px',
            color: '#3B2F2F',
            fontFamily : 'Poppins',
            fontSize : "14px",
            background : "#fff",
          },
          iconTheme: {
            primary: '#00a500',
            secondary: '#fff',
          },
        },
        error: {
          duration: 2000,
          style: {
            border: '1px solid #713200',
            padding: '10px',
            borderRadius : '35px',
            color: '#3B2F2F',
            background : "#fff",
            fontFamily : 'Poppins',
            fontSize : "14px"
          },
          iconTheme: {
            primary: '#ff2828',
            secondary: '#fff',
          },
        },
      }}
    />
  </React.StrictMode>
);
