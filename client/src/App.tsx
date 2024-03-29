import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { CreatePost } from "./Pages/CreatePost";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { NotFound } from "./Pages/NotFound";
import { SinglePost } from "./Pages/SinglePost";
import { EditPost } from "./Pages/SinglePost/EditPost";
import "./styles/variables.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/post/edit/:id" element={<EditPost />} />
              <Route path="/posts/create-new" element={<CreatePost />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
