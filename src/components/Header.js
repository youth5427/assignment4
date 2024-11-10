import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 인증 상태 제거
    localStorage.removeItem("user"); // 사용자 데이터 제거 (필요 시)
    navigate("/signin"); // 로그인 페이지로 이동
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* 왼쪽 내비게이션 */}
        <nav className="left-nav">
          <ul className="nav-links">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/popular">Popular</a>
            </li>
          </ul>
        </nav>

        {/* 오른쪽 로그아웃 */}
        <div className="right-nav">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
