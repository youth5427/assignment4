import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import TableView from "../components/TableView";
import InfinityScrollView from "../components/InfinityScrollView";

const PageContainer = styled.div`
  margin-top: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  border-radius: 5px;
  background-color: #ffebcd;
  padding: 5px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const ResetButton = styled.button`
  height: 30px;

  border: none;
  border-radius: 5px;
  background-color: #ff6b6b;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #ff3b3b;
  }

  &:focus {
    outline: none;
  }
`;

const ViewToggleContainer = styled.div`
  position: fixed;
  top: 110px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  height: 40px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "white" : "black")};
  cursor: pointer;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#e0e0e0")};
  }

  &:focus {
    outline: none;
  }
`;

function Search() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("infinity");
  const userPassword = localStorage.getItem("userPassword");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState(""); // 선택된 평점 상태 추가
  const [sortOrder, setSortOrder] = useState(""); // 정렬 상태 추가

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
      const minRating = selectedRating ? parseFloat(selectedRating) : undefined;
      const maxRating = minRating !== undefined ? minRating + 0.9 : undefined;

      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            page,
            with_genres: selectedGenre || undefined,
            "vote_average.gte": minRating,
            "vote_average.lte": maxRating,
            sort_by: sortOrder || "popularity.desc", // 정렬 기준 적용
          },
        }
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchMoviesForInfinity = async () => {
    if (loading || currentPage > totalPages) return;

    setLoading(true);

    try {
      const minRating = selectedRating ? parseFloat(selectedRating) : undefined;
      const maxRating = minRating !== undefined ? minRating + 0.9 : undefined;

      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            page: currentPage,
            with_genres: selectedGenre || undefined,
            "vote_average.gte": minRating,
            "vote_average.lte": maxRating,
            sort_by: sortOrder || "popularity.desc", // 정렬 기준 적용
          },
        }
      );

      setMovies((prevMovies) => [
        ...prevMovies.filter(
          (movie) =>
            !response.data.results.find((newMovie) => newMovie.id === movie.id)
        ),
        ...response.data.results,
      ]);

      setTotalPages(response.data.total_pages);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    if (viewMode === "infinity") {
      fetchMoviesForInfinity();
    } else {
      fetchMoviesForTable(1);
    }
  }, [viewMode, selectedGenre, selectedRating, sortOrder]);

  const handleResetFilters = () => {
    if (window.confirm("필터가 초기화 됩니다.")) {
      setSelectedGenre("");
      setSelectedRating("");
      setSortOrder("");
      setCurrentPage(1);
      window.scrollTo({ top: 0, behavior: "smooth" }); // 상단으로 스크롤
    } else {
    }
  };

  return (
    <PageContainer>
      <Header />

      <ViewToggleContainer>
        <FilterContainer>
          <div>
            <label htmlFor="genre-select">장르 선택: </label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">전체</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rating-select">평점 선택: </label>
            <select
              id="rating-select"
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">전체</option>
              {[...Array(10)].map((_, i) => {
                const rating = 10 - i;
                return (
                  <option key={rating} value={rating}>
                    {rating}점대
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="sort-select">정렬 기준: </label>
            <select
              id="sort-select"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1); // 정렬 기준 변경 시 첫 페이지로 이동
              }}
            >
              <option value="">기본(인기순)</option>
              <option value="vote_average.desc">평점 높은 순</option>
              <option value="vote_average.asc">평점 낮은 순</option>
              <option value="release_date.desc">최신 출시일</option>
              <option value="release_date.asc">오래된 출시일</option>
              <option value="original_title.asc">제목 오름차순</option>
              <option value="original_title.desc">제목 내림차순</option>
            </select>
          </div>

          <ResetButton onClick={handleResetFilters}>초기화</ResetButton>
        </FilterContainer>
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
            setCurrentPage(page);
            fetchMoviesForTable(page);
          }}
        />
      ) : (
        <InfinityScrollView
          onPageChange={() => {
            setCurrentPage(1);
          }}
          fetchMovies={fetchMoviesForInfinity}
          movies={movies}
          loading={loading}
        />
      )}
    </PageContainer>
  );
}

export default Search;