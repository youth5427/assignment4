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
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 초기 null로 설정
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const user = localStorage.getItem("currentUser");
    setIsAuthenticated(authStatus);
    setCurrentUser(authStatus && user ? user : null);
  }, []);

  const handleLogin = (userEmail) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", userEmail);
    setIsAuthenticated(true);
    setCurrentUser(userEmail);
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* 기본 경로 */}
        <Route
          path="/"
          element={
            isAuthenticated === null ? null : isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/Signin" replace />
            )
          }
        />

        {/* 로그인 상태에서 비정상적으로 /Signin으로 접근 방지 */}
        <Route
          path="/Signin"
          element={
            isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              <SignIn onLogin={handleLogin} />
            )
          }
        />

        {/* 보호된 Home 페이지 */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home currentUser={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* 보호된 Wishlist 페이지 */}
        <Route
          path="/Wishlist"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Wishlist currentUser={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* 보호된 Popular 페이지 */}
        <Route
          path="/Popular"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Popular currentUser={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* 보호된 Search 페이지 */}
        <Route
          path="/Search"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Search currentUser={currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
