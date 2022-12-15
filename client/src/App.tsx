import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./Pages";

function App() {
  const [testing, setTesting] = useState("");
  const test = async () => {
    axios.get("http://localhost:5000/").then((response) => {
      setTesting(response.data);
    });
  };

  console.log("testing", testing);

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
