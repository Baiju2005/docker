import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/user/Home";
import Profile from "./features/user/Profile";

function GuestOnly({ children }) {
  return localStorage.getItem("authToken") ? (
    <Navigate to="/profile" replace />
  ) : (
    children
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <GuestOnly>
            <Login />
          </GuestOnly>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnly>
            <Register />
          </GuestOnly>
        }
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
