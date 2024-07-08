import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="chats" element={<Chats />}></Route>

          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
