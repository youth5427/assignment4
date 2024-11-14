import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const MovieThumbnailWrapper = styled.div`
  position: relative;
`;

const MovieThumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LikeButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const LoadingMessage = styled.div`
  margin: 20px 0;
  font-size: 1.2rem;
  text-align: center;
  color: #007bff;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

function InfinityScrollView({ fetchMovies, movies, loading }) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // 스크롤 끝에 도달하면 fetchMovies 호출
    if (!loading && scrollHeight - scrollTop <= clientHeight * 1.5) {
      fetchMovies();
    }

    // 스크롤 위치에 따라 "맨 위로 가기" 버튼 표시
    setShowScrollToTop(scrollTop > 200);
  };

  // 초기 데이터 로드 후 화면 확인
  useEffect(() => {
    const checkContentHeight = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      // 화면에 데이터가 부족하면 추가 데이터 요청
      if (!loading && scrollHeight <= clientHeight) {
        fetchMovies();
      }
    };

    checkContentHeight(); // 초기 체크
  }, [movies, loading, fetchMovies]);

  // 스크롤 이벤트 등록 및 해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieThumbnailWrapper key={movie.id}>
            <MovieThumbnail
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <LikeButtonWrapper>
              <LikeButton movie={movie} />
            </LikeButtonWrapper>
          </MovieThumbnailWrapper>
        ))}
      </MoviesGrid>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      <ScrollToTopButton visible={showScrollToTop} onClick={scrollToTop}>
        맨 위로
      </ScrollToTopButton>
    </>
  );
}

export default InfinityScrollView;
