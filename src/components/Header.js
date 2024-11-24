import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 모바일 여부 판단
  const [showMenu, setShowMenu] = useState(false); // 모바일 메뉴 상태
  const getUserKey = (username) => `${username}_recentSearches`;
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(storedUser); // 이메일 전체를 저장
      const userKey = getUserKey(storedUser); // 이메일 형식으로 키 생성
      const storedSearches = JSON.parse(localStorage.getItem(userKey)) || [];
      setRecentSearches(storedSearches);
    } else {
      setCurrentUser("경고! 잘못된 접근입니다.");
    }

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
      const userKey = getUserKey(currentUser); // 이메일 형식으로 키 생성
      const storedSearches = JSON.parse(localStorage.getItem(userKey)) || [];
      const updatedSearches = [
        searchQuery,
        ...storedSearches.filter((term) => term !== searchQuery),
      ];
      localStorage.setItem(
        userKey,
        JSON.stringify(updatedSearches.slice(0, 5))
      ); // 최대 5개 저장
      setRecentSearches(updatedSearches.slice(0, 5));
      navigate(`/Search?query=${encodeURIComponent(searchQuery)}`);
      setShowRecentSearches(false);
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
    setShowRecentSearches(false);
  };

  const handleClearSearches = () => {
    const userKey = getUserKey(currentUser); // 이메일 형식으로 키 생성
    localStorage.removeItem(userKey); // 사용자별 검색어 삭제
    setRecentSearches([]);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
      flexDirection: "row",
      gap: "20px",
      animation: "fadeIn 0.5s ease-in-out", // 애니메이션 추가
    },
    logoutButton: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.1rem",
      cursor: "pointer",
      marginLeft: "20px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
    rightNav: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginRight: "20px", // 오른쪽 마진 추가
    },
    dropdownMenu: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backgroundColor: "#333",
      padding: "10px",
      borderRadius: "5px",
      position: "absolute",
      top: "60px",
      left: "20px",
      zIndex: 1000,
      width: "150px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      animation: "slideDown 0.5s ease-in-out", // 슬라이드 다운 애니메이션 추가
    },
    searchContainer: {
      position: "relative",
      flex: "1",
      maxWidth: "500px",
      margin: "0px 30px",
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
    menuButton: {
      // 햄버거 모양의 메뉴버튼
      backgroundColor: "#6200ea",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      fontSize: "24px",
    },
  };
  // 글로벌 CSS 추가
  const globalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
  // 글로벌 스타일을 페이지에 추가
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = globalStyles;
  document.head.appendChild(styleSheet);

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        {/* PC 환경에서 항상 보이는 네비게이션 */}
        {!isMobile && (
          <nav>
            <ul style={styles.navLinks}>
              <li>
                <Link to="/Home" style={styles.navLink}>
                  <img
                    src={`${process.env.PUBLIC_URL}/icon.webp`} // // public 폴더에 저장된 파일 경로
                    alt="홈"
                    style={{ width: "24px", height: "24px" }} // 이미지 크기 조정
                  />
                </Link>
              </li>
              <li>
                <Link to="/Popular" style={styles.navLink}>
                  인기 영화
                </Link>
              </li>
              <li>
                <Link to="/Search" style={styles.navLink}>
                  찾아보기
                </Link>
              </li>
              <li>
                <Link to="/Wishlist" style={styles.navLink}>
                  찜한 리스트
                </Link>
              </li>
            </ul>
          </nav>
        )}

        {/* 모바일 환경에서 메뉴 버튼 */}
        {isMobile && (
          <>
            <MenuIcon onClick={toggleMenu} style={{ fontSize: "24px" }} />{" "}
            {/* 햄버거 아이콘 */}
            {showMenu && (
              <ul style={styles.dropdownMenu}>
                <li>
                  <Link
                    to="/Home"
                    style={styles.navLink}
                    onClick={() => setShowMenu(false)}
                  >
                    홈
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Popular"
                    style={styles.navLink}
                    onClick={() => setShowMenu(false)}
                  >
                    인기 영화
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Search"
                    style={styles.navLink}
                    onClick={() => setShowMenu(false)}
                  >
                    찾아보기
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Wishlist"
                    style={styles.navLink}
                    onClick={() => setShowMenu(false)}
                  >
                    찜한 리스트
                  </Link>
                </li>
              </ul>
            )}
          </>
        )}

        {/* 검색창 */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowRecentSearches(true)}
            onBlur={() => setTimeout(() => setShowRecentSearches(false), 100)} // 지연 처리
            onKeyDown={handleKeyDown}
            style={styles.searchInput}
          />
          {showRecentSearches && recentSearches.length > 0 && (
            <ul
              style={styles.recentSearches}
              onMouseDown={(e) => e.preventDefault()} // onBlur 방지
            >
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
          {currentUser && (
            <>
              <span style={styles.userName}>
                {currentUser.split("@")[0]} {/* @ 앞부분만 표시 */}
              </span>
              <p> 님</p>
            </>
          )}
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
