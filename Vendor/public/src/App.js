import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Root from "./components/Root";
import Card from "./components/About/Card";
import UserInfoProvider from "./components/userInfo/UserInfoProvider";

function App() {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Card />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
