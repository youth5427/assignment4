import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const MovieThumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
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
`;

function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const userPassword = localStorage.getItem("userPassword");
  const maxPagesToShow = 10; // 최대 페이지 수 제한

  // 장르 목록 가져오기
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              api_key: userPassword,
              language: "ko-KR",
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [userPassword]);

  // 선택된 장르와 페이지에 따라 영화 리스트 가져오기
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: userPassword,
              language: "ko-KR",
              page: currentPage,
              with_genres: selectedGenre || undefined, // 장르 선택 없으면 기본값
            },
          }
        );
        setMovies(response.data.results.slice(0, 20)); // 20개만 가져오기
        setTotalPages(Math.min(response.data.total_pages, maxPagesToShow)); // 최대 10페이지 제한
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre, userPassword]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePagination = () => {
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => {
      const page = startPage + index;
      return (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageButton>
      );
    });
  };

  return (
    <PageContainer>
      <Header />
      <h1>인기 영화</h1>
      <FilterContainer>
        <label htmlFor="genre-select">장르 선택: </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setCurrentPage(1); // 새로운 장르 선택 시 첫 페이지로 이동
          }}
        >
          <option value="">전체</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </FilterContainer>
      <MoviesGrid>
        {movies.map((movie) => (
          <MovieThumbnail
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </MoviesGrid>
      <PaginationContainer>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          이전
        </PageButton>
        {generatePagination()}
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          다음
        </PageButton>
      </PaginationContainer>
    </PageContainer>
  );
}

export default PopularMoviesPage;
