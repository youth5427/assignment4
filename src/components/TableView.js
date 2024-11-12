import React from "react";
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
const CurrentPageDisplay = styled.div`
  margin-left: 10px;
  font-size: 1rem;
  color: #555;
`;

function TableView({ movies, currentPage, totalPages, onPageChange }) {
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
