import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home";
import List from "./routes/List";
import UserAdd from "./routes/UserAdd";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<Home />}></Route>
        <Route path="/list" element={<List />} />
        <Route path="/spotifyAdd" element={<UserAdd />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
