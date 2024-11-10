import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 스타일 정의
const BannerContainer = styled.div`
  position: relative;
  height: 500px;
  color: white;
  margin: 0 50px; /* 좌우 여백 추가 */
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 8px; /* 선택 사항: 배너에 둥근 테두리를 추가 */
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 50px; /* 아래쪽에서 50px 패딩 */
  left: 20px; /* 좌측에서 약간 띄움 */
  z-index: 2;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 2rem;
`;

const Overview = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.4;
  color: #ddd;
  max-width: 40%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    background-color: #e50914;
    color: white;
  }

  &:last-child {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

function Banner({ featuredMovie }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // 창 너비가 768px 이하인지 확인
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize); // 리스너 추가
    return () => window.removeEventListener("resize", handleResize); // 리스너 정리
  }, []);

  if (!featuredMovie) return null;

  const handlePlayClick = () => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      featuredMovie.title
    )}`;
    window.open(youtubeSearchUrl, "_blank");
  };

  const handleDetailsClick = () => {
    const naverSearchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(
      featuredMovie.title
    )}`;
    window.open(naverSearchUrl, "_blank");
  };

  return (
    <BannerContainer>
      <BannerImage
        src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
        alt={featuredMovie.title}
      />
      <BannerContent>
        <Title>{featuredMovie.title}</Title>
        {/* overview는 작은 화면에서 생략 */}
        {!isSmallScreen && <Overview>{featuredMovie.overview}</Overview>}
        <ButtonContainer>
          <Button onClick={handlePlayClick}>재생</Button>
          <Button onClick={handleDetailsClick}>상세 정보</Button>
        </ButtonContainer>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
