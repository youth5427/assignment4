import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 인증 상태 제거
    // localStorage.removeItem("user"); // 사용자 데이터 제거 (필요한 경우)
    navigate("/Signin"); // 로그인 페이지로 이동
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">TMDb Movie App</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="/Home">Home</a>
            </li>
            <li>
              <a href="/popular">Popular</a>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
