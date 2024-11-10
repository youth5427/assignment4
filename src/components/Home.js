import React, { useEffect, useState } from "react";
import "./Home.css";
import Banner from "./Banner";
import MovieRow from "./MovieRow";
import Header from "./Header"; // Header 컴포넌트 추가

const BASE_URL = "https://api.themoviedb.org/3";

function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const userPassword = localStorage.getItem("userPassword"); // 사용자 비밀번호를 API 키로 사용

  if (!userPassword) {
    console.error("API Key (Password) not found in localStorage.");
  }

  const popularMoviesUrl = `${BASE_URL}/movie/popular?api_key=${userPassword}`;
  const newReleasesUrl = `${BASE_URL}/movie/now_playing?api_key=${userPassword}`;
  const actionMoviesUrl = `${BASE_URL}/discover/movie?api_key=${userPassword}&with_genres=28`;

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/top_rated?api_key=${userPassword}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch featured movie");
        }
        const data = await response.json();
        setFeaturedMovie(data.results[0]); // 가장 평점 높은 영화 설정
      } catch (error) {
        console.error("Error fetching featured movie:", error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchFeaturedMovie();
  }, [userPassword]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <Header />

      {/* 배너 */}
      <Banner featuredMovie={featuredMovie} />

      {/* 영화 섹션 */}
      <MovieRow title="Popular Movies" fetchUrl={popularMoviesUrl} />
      <MovieRow title="New Releases" fetchUrl={newReleasesUrl} />
      <MovieRow title="Action Movies" fetchUrl={actionMoviesUrl} />
    </div>
  );
}

export default Home;
