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
import ChatProvider from "./contexts/chats";

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              index
              element={
                <LoggedInPageProtection>
                  <Chats />
                </LoggedInPageProtection>
              }
            ></Route>
            <Route path="chats" element={<Home />}></Route>

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
    </ChatProvider>
  );
}

export default App;
