import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import TableView from "../components/TableView";
import InfinityScrollView from "../components/InfinityScrollView";

const PageContainer = styled.div`
  margin-top: 100px; /* Header로부터 10px 떨어지도록 설정 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const ViewToggleContainer = styled.div`
  position: fixed;
  top: 110px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000; /* 다른 요소보다 위에 표시 */
`;

const ToggleButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e0e0e0")};
  }

  &:focus {
    outline: none;
  }
`;

function Popular() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("infinity"); // "table" or "infinity"
  const userPassword = localStorage.getItem("userPassword");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: { api_key: userPassword, language: "ko-KR" },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, [userPassword]);
  const fetchMoviesForTable = async (page) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie", // discover API 사용
        {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            page,
            with_genres: selectedGenre || undefined, // 선택된 장르 적용
          },
        }
      );
      setMovies(response.data.results); // 기존 데이터 덮어쓰기
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchMoviesForInfinity = async () => {
    if (loading || currentPage > totalPages) return;

    setLoading(true); // 로딩 상태를 설정

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie", // discover API 사용
        {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            page: currentPage,
            with_genres: selectedGenre || undefined, // 선택된 장르 적용
          },
        }
      );

      // 중복 데이터 방지를 위해 기존 데이터와 합침
      setMovies((prevMovies) => [
        ...prevMovies.filter(
          (movie) =>
            !response.data.results.find((newMovie) => newMovie.id === movie.id)
        ),
        ...response.data.results,
      ]);

      setTotalPages(response.data.total_pages);
      setCurrentPage((prevPage) => prevPage + 1); // 다음 페이지로 증가
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    setMovies([]); // 기존 데이터를 초기화
    setCurrentPage(1);
    if (viewMode === "infinity") {
      fetchMoviesForInfinity();
    } else {
      fetchMoviesForTable(1);
    }
  }, [viewMode, selectedGenre]); // selectedGenre 추가
  return (
    <PageContainer>
      <Header />
      <FilterContainer>
        <label htmlFor="genre-select">장르 선택: </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setCurrentPage(1); // 장르 변경 시 첫 페이지로 이동
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
      <ViewToggleContainer>
        <ToggleButton
          active={viewMode === "table"}
          onClick={() => setViewMode("table")}
        >
          Table View
        </ToggleButton>
        <ToggleButton
          active={viewMode === "infinity"}
          onClick={() => {
            setCurrentPage(1);
            setViewMode("infinity");
          }}
        >
          Infinity Scroll
        </ToggleButton>
      </ViewToggleContainer>
      <h1></h1>
      {viewMode === "table" ? (
        <TableView
          movies={movies}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page); // 현재 페이지 상태 업데이트
            fetchMoviesForTable(page); // 해당 페이지 데이터 로드
          }}
        />
      ) : (
        <InfinityScrollView
          onPageChange={() => {
            setCurrentPage(1); // 현재 페이지 상태 업데이트
          }}
          fetchMovies={fetchMoviesForInfinity}
          movies={movies}
          loading={loading}
        />
      )}
    </PageContainer>
  );
}

export default Popular;
