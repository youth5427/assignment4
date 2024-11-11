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

  const fetchMoviesForTable = async (page) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            page,
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

    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            page: currentPage,
          },
        }
      );

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setTotalPages(response.data.total_pages);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (viewMode === "infinity") {
      fetchMoviesForInfinity();
    } else {
      fetchMoviesForTable(1);
    }
  }, [viewMode]);

  return (
    <PageContainer>
      <Header />
      <ViewToggleContainer>
        <ToggleButton
          active={viewMode === "table"}
          onClick={() => setViewMode("table")}
        >
          Table View
        </ToggleButton>
        <ToggleButton
          active={viewMode === "infinity"}
          onClick={() => setViewMode("infinity")}
        >
          Infinity Scroll
        </ToggleButton>
      </ViewToggleContainer>
      <h1>인기 영화</h1>
      {viewMode === "table" ? (
        <TableView
          movies={movies}
          currentPage={currentPage - 1}
          totalPages={totalPages}
          onPageChange={(page) => fetchMoviesForTable(page)}
        />
      ) : (
        <InfinityScrollView
          fetchMovies={fetchMoviesForInfinity}
          movies={movies}
          loading={loading}
        />
      )}
    </PageContainer>
  );
}

export default Popular;
