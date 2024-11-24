import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
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
import Terms from "./components/Terms";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const user = localStorage.getItem("currentUser");
    setIsAuthenticated(authStatus);
    setCurrentUser(authStatus && user ? user : null);
    setIsLoading(false);
  }, []);

  const handleLogin = (userEmail) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", userEmail);
    setIsAuthenticated(true);
    setCurrentUser(userEmail);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (isLoading) {
    return <div className="loading-overlay">Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Routes>
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
          <Route path="/Terms" element={<Terms />} />

          <Route
            path="/Home"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Wishlist"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Wishlist currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Popular"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Popular currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Search"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Search currentUser={currentUser} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
