import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 모바일 여부 판단

  useEffect(() => {
    // 현재 로그인한 사용자 가져오기
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const username = storedUser.split("@")[0];
      setCurrentUser(username);
    } else {
      setCurrentUser("경고! 잘못된 접근입니다.");
    }

    // 최근 검색어 가져오기
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);

    // 윈도우 크기 변경 이벤트 추가
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userPassword");
    setCurrentUser(null);
    navigate("/Signin");
    window.location.reload();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 검색어 저장
      const updatedSearches = [
        searchQuery,
        ...recentSearches.filter((term) => term !== searchQuery),
      ];
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches.slice(0, 5))
      ); // 최대 5개 저장
      setRecentSearches(updatedSearches.slice(0, 5));

      // 검색 실행
      navigate(`/Search?query=${encodeURIComponent(searchQuery)}`);
      setShowRecentSearches(false); // 검색 기록 숨김
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    navigate(`/Search?query=${encodeURIComponent(query)}`);
    setShowRecentSearches(false); // 검색 기록 숨김
  };

  const handleClearSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
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
      display: isMobile ? "none" : "flex", // 모바일에서는 숨김
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
      marginRight: "20px", // 오른쪽 마진 추가
    },
    searchContainer: {
      position: "relative",
      flex: "1",
      maxWidth: isMobile ? "150px" : "300px", // 모바일에서 검색창 너비 조정
    },
    searchInput: {
      padding: "5px",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "1rem",
      width: "100%",
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
    recentSearches: {
      listStyle: "none",
      marginTop: "10px",
      backgroundColor: "#fff",
      color: "#333",
      borderRadius: "5px",
      padding: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      position: "absolute",
      zIndex: 1000,
      width: "100%",
    },
    recentSearchItem: {
      cursor: "pointer",
      padding: "5px 0",
      borderBottom: "1px solid #ddd",
    },
    clearButton: {
      textAlign: "right",
      fontSize: "0.9rem",
      color: "#007bff",
      cursor: "pointer",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        {/* 왼쪽 내비게이션 */}
        <nav style={styles.leftNav}>
          <ul style={styles.navLinks}>
            {!isMobile && ( // 모바일에서는 "홈" 버튼만 보이도록
              <>
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
              </>
            )}
            {isMobile && ( // 모바일에서는 홈 버튼만 표시
              <li>
                <a href="/Home" style={styles.navLink}>
                  홈
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* 검색창 */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowRecentSearches(true)}
            onBlur={() => setShowRecentSearches(false)}
            onKeyDown={handleKeyDown}
            style={styles.searchInput}
          />
          {showRecentSearches && recentSearches.length > 0 && (
            <ul style={styles.recentSearches}>
              {recentSearches.map((query, index) => (
                <li
                  key={index}
                  style={styles.recentSearchItem}
                  onClick={() => handleRecentSearchClick(query)}
                >
                  {query}
                </li>
              ))}
              <div style={styles.clearButton} onClick={handleClearSearches}>
                전체 삭제
              </div>
            </ul>
          )}
        </div>

        {/* 사용자 및 로그아웃 */}
        <div style={styles.rightNav}>
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
