import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 인증 상태 제거
    localStorage.removeItem("currentUser");
    // localStorage.removeItem("user"); // 사용자 데이터 제거 (필요 시)
    navigate("/Signin"); // 로그인 페이지로 이동
  };

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#222",
      color: "white",
      padding: "20px",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    navLinks: {
      listStyle: "none",
      display: "flex",
      gap: "20px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.1rem",
    },
    navLinkHover: {
      color: "#1db954",
    },
    logoutButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
    leftNav: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    rightNav: {
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        {/* 왼쪽 내비게이션 */}
        <nav style={styles.leftNav}>
          <ul style={styles.navLinks}>
            <li>
              <a href="/Home" style={styles.navLink}>
                홈
              </a>
            </li>
            <li>
              <a href="/Popular" style={styles.navLink}>
                인기 영화
              </a>
            </li>
            <li>
              <a href="/Wishlist" style={styles.navLink}>
                찜한 리스트
              </a>
            </li>
          </ul>
        </nav>

        {/* 오른쪽 로그아웃 */}
        <div style={styles.rightNav}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
