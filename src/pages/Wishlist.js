import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import MovieRow from "../components/MovieRow";

// 스타일 정의
const WishlistContainer = styled.div`
  background-color: #f0f0f0;
  color: black;
  min-height: 100vh;
  padding-top: 70px; /* Header 높이만큼 여유 공간 추가 */
`;

const Section = styled.section`
  margin: 20px 0;
`;

function Wishlist() {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setWishlistMovies(storedMovies);
  }, []);

  return (
    <WishlistContainer>
      <Header />
      {wishlistMovies.length > 0 ? (
        <Section>
          <MovieRow
            title="위시리스트"
            fetchUrl="" // API 요청이 필요하지 않으므로 빈 문자열
            userPassword="" // 패스워드 필요 없음
            movies={wishlistMovies} // 로컬 스토리지 데이터를 직접 전달
          />
        </Section>
      ) : (
        <p style={{ padding: "20px", fontSize: "1.2rem", color: "gray" }}>
          위시리스트에 저장된 영화가 없습니다.
        </p>
      )}
    </WishlistContainer>
  );
}

export default Wishlist;
