import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Posts } from "./Pages/Posts";

function App() {
  const [testing, setTesting] = useState("");

  const test = async () => {
    axios.get("http://localhost:5000/").then((response) => {
      setTesting(response.data);
    });
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
