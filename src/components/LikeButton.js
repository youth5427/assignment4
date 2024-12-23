import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark"; // 북마크 아이콘

const Fab = styled.button`
  background-color: ${(props) =>
    props.isLiked ? "#f57c00" : "rgba(255, 255, 255, 0.8)"};
  color: black;
  border: none;
  border-radius: 30%;
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 24px;

  &:hover {
    background-color: #f57c00;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 24px;
  }
`;

const LikeButton = ({
  movie,
  style = {},
  size = "40px",
  fontSize = "1.2rem",
}) => {
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userWishlistKey = `${currentUser}_wishlist`;
      const storedMovies =
        JSON.parse(localStorage.getItem(userWishlistKey)) || [];
      setLikedMovies(storedMovies);
      setIsLiked(storedMovies.some((m) => m.id === movie.id));
    }
  }, [movie.id]);

  const handleLike = () => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("로그인이 필요합니다!");
      return;
    }

    const userWishlistKey = `${currentUser}_wishlist`;
    const storedMovies =
      JSON.parse(localStorage.getItem(userWishlistKey)) || [];
    const isAlreadyLiked = storedMovies.some((m) => m.id === movie.id);

    let updatedMovies;
    if (isAlreadyLiked) {
      updatedMovies = storedMovies.filter((m) => m.id !== movie.id);
      alert(`${movie.title}이(가) 저장 목록에서 제거되었습니다.`);
    } else {
      updatedMovies = [...storedMovies, movie];
      alert(`${movie.title}이(가) 저장되었습니다!`);
    }

    localStorage.setItem(userWishlistKey, JSON.stringify(updatedMovies));
    setLikedMovies(updatedMovies);
    setIsLiked(!isAlreadyLiked);
  };

  return (
    // <button
    //   onClick={handleLike}
    //   style={{
    //     backgroundColor: isLiked
    //       ? "rgba(255, 255, 0, 1)"
    //       : "rgba(255, 255, 255, 0.8)",
    //     border: "none",
    //     borderRadius: "50%",
    //     width: size,
    //     height: size,
    //     fontSize: fontSize,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     cursor: "pointer",
    //     ...style,
    //   }}
    // >
    //   ❤
    // </button>

    <Fab onClick={handleLike} isLiked={isLiked}>
      <BookmarkIcon style={{ fontSize: fontSize }} />
    </Fab>
  );
};

export default LikeButton;
