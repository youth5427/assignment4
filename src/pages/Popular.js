import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import TableView from "../components/TableView"; // 분리된 TableView 컴포넌트 import
import Header from "../components/Header";

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Popular() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userPassword = localStorage.getItem("userPassword");

  useEffect(() => {
    const fetchMovies = async () => {
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
        setMovies(response.data.results.slice(0, 20)); // 20개만 가져오기
        setTotalPages(Math.min(response.data.total_pages, 100)); // 최대 10페이지 제한
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchMovies();
  }, [currentPage, userPassword]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PageContainer>
      <Header />
      <h1>인기 영화</h1>
      <TableView
        movies={movies}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
}

export default Popular;
