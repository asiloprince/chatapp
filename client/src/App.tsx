import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/App.css";
import Home from "./pages/Home";
import Chats from "./pages/Chats";
import Login from "./pages/login/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/register/Signup";
import {
  LoggedInPageProtection,
  NonLoggedInPage,
} from "./components/RouteProtections";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            index
            element={
              <LoggedInPageProtection>
                <Home />
              </LoggedInPageProtection>
            }
          ></Route>
          <Route path="chats" element={<Chats />}></Route>

          <Route
            path="login"
            element={
              <NonLoggedInPage>
                <Login />
              </NonLoggedInPage>
            }
          ></Route>
          <Route
            path="signup"
            element={
              <NonLoggedInPage>
                <Signup />
              </NonLoggedInPage>
            }
          ></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
