import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton"; // LikeButton import

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const MovieThumbnailWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: flex-end;
  transition: transform 0.3s ease; /* 호버 시 확대 애니메이션 */
  transform: scale(1);

  &:hover {
    transform: scale(1.05); /* 부모 컨테이너 확대 */
  }
`;

const MovieThumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease; /* 자식 요소도 애니메이션 */

  /* 부모 컨테이너의 hover와 동기화 */
  ${MovieThumbnailWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const LikeButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e0e0e0")};
  }
`;
const MovieTitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 40px; /* 두 줄 텍스트에 필요한 최소 높이 */
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  transition: transform 0.3s ease;

  /* 부모 컨테이너의 hover와 동기화 */
  ${MovieThumbnailWrapper}:hover & {
    transform: scale(1.05);
  }
`;
function TableView({ movies, currentPage, totalPages, onPageChange }) {
  const pressTimer = useRef(null);

  const generatePagination = () => {
    const maxPagesToShow = 2; // 현재 페이지를 기준으로 앞뒤 2개씩 표시
    const startPage = Math.max(1, currentPage - maxPagesToShow);
    const endPage = Math.min(totalPages, currentPage + maxPagesToShow);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const page = startPage + index;
      return (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      );
    });
  };

  const handleLongPress = (movie) => {
    const naverSearchUrl = `https://search.naver.com/search.naver?query=영화 ${encodeURIComponent(
      movie.title
    )}`;
    window.open(naverSearchUrl, "_blank");
  };

  const handlePressStart = (movie) => {
    // 길게 누르기 타이머 설정
    pressTimer.current = setTimeout(() => handleLongPress(movie), 500); // 1초(1000ms) 동안 눌렀을 때 이벤트 발생
  };

  const handlePressEnd = () => {
    // 길게 누르기 타이머 초기화
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  return (
    <>
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieThumbnailWrapper key={movie.id}>
            <MovieThumbnail
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onMouseDown={() => handlePressStart(movie)} // 마우스 눌렀을 때 타이머 시작
              onMouseUp={handlePressEnd} // 마우스 뗄 때 타이머 초기화
              onMouseLeave={handlePressEnd} // 마우스가 벗어나면 타이머 초기화
              onTouchStart={() => handlePressStart(movie)} // 모바일 터치 시작 시 타이머 시작
              onTouchEnd={handlePressEnd} // 모바일 터치 종료 시 타이머 초기화
            />
            <LikeButtonWrapper>
              <LikeButton movie={movie} />
            </LikeButtonWrapper>
            <MovieTitleOverlay>{movie.title}</MovieTitleOverlay>{" "}
            {/* 영화 제목 추가 */}
          </MovieThumbnailWrapper>
        ))}
      </MoviesGrid>
      <PaginationContainer>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 10))}
        >
          &lt;&lt;
        </PageButton>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          &lt;
        </PageButton>

        {generatePagination()}

        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          &gt;
        </PageButton>
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 10))}
        >
          &gt;&gt;
        </PageButton>

        {/* 현재 페이지 표시 텍스트 */}
        {/* <CurrentPageDisplay>
          Page {currentPage} of {totalPages}
        </CurrentPageDisplay> */}
      </PaginationContainer>
    </>
  );
}

export default TableView;
