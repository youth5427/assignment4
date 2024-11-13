import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/Signin";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Popular from "./pages/Popular";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // localStorage 값과 상태 동기화
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* 기본 경로 */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/Signin" replace />
            )
          }
        />

        {/* 로그인 페이지 */}
        <Route path="/Signin" element={<SignIn onLogin={handleLogin} />} />

        {/* 보호된 Home 페이지 */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* 보호된 Wishlist 페이지 */}
        <Route
          path="/Wishlist"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Wishlist onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* 보호된 Popular 페이지 */}
        <Route
          path="/Popular"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Popular onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
