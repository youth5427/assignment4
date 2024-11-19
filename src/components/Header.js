import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 현재 로그인한 사용자 가져오기
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      // @ 앞부분만 추출
      const username = storedUser.split("@")[0];
      setCurrentUser(username);
    } else {
      setCurrentUser("경고! 잘못된 접근입니다."); // currentUser가 없을 경우 경고
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 인증 상태 제거
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userPassword");
    setCurrentUser(null);
    navigate("/Signin"); // 로그인 페이지로 이동
    window.location.reload(); // 페이지 새로고침으로 /Signin으로 정상적으로 이동
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/Search?query=${encodeURIComponent(searchQuery)}`);
    }
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
    logoutButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.1rem",
      cursor: "pointer",
      marginLeft: "20px",
    },
    leftNav: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    rightNav: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    userName: {
      fontSize: "1.1rem",
      color: "#ddd",
      fontWeight: "bold",
    },
    searchInput: {
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "1rem",
    },
    searchButton: {
      padding: "5px 10px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#444",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
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
              <a href="/Search" style={styles.navLink}>
                찾아보기
              </a>
            </li>
            <li>
              <a href="/Wishlist" style={styles.navLink}>
                찜한 리스트
              </a>
            </li>
          </ul>
        </nav>

        {/* 검색 기능 */}
        <div style={styles.rightNav}>
          <input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            검색
          </button>

          {/* 사용자 이름 및 로그아웃 */}
          {currentUser && <span style={styles.userName}>{currentUser}</span>}
          <p> 님</p>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
