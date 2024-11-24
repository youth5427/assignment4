import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton"; // LikeButton 컴포넌트 가져오기

const BannerContainer = styled.div`
  position: relative;
  height: 500px;
  color: white;
  margin: 0 50px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 8px;
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 50px;
  left: 20px;
  z-index: 2;
  color: white;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 2rem;
  @media (max-width: 768px) {
    text-align: center; /* 중앙 정렬 */
  }
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

  &:nth-child(2) {
    background-color: rgba(109, 109, 110, 0.7);
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;
const Overview = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.4;
  color: #ddd;
  max-width: 40%;
  @media (max-width: 768px) {
    background-color: rgba(109, 109, 110, 0.5);
    font-size: 0.8rem; /* 글자 크기 줄임 */
    text-align: center; /* 중앙 정렬 */
    max-width: 90%; /* 가로 너비 확장 */
    border-radius: 5px;
    padding: 5px 10px;
    box-sizing: border-box; /* 패딩을 포함하여 요소 크기를 계산 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

function Banner({ featuredMovie }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
        <Overview>{featuredMovie.overview}</Overview>
        <ButtonContainer>
          <Button onClick={handlePlayClick}>재생</Button>
          <Button onClick={handleDetailsClick}>상세 정보</Button>
          {/* LikeButton 컴포넌트 활용 */}
          <LikeButton movie={featuredMovie} size="40px" fontSize="1.2rem" />
        </ButtonContainer>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
