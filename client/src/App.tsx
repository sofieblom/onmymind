import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { CreatePost } from "./Pages/CreatePost";
import { Layout } from "./components/Input/Layout";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { NotFound } from "./Pages/NotFound";

function App() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const authenticated = localStorage.getItem("token" || "");

  const getUser = (id: string, email: string) => {
    setId(id);
    setEmail(email);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login getUser={getUser} />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute authenticated={authenticated} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/posts/create-new" element={<CreatePost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

interface UserType {
  email: string;
  _id: string;
  token: string;
}

export default App;
