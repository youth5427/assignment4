import React, { useEffect, useState } from "react";

const LikeButton = ({
  movie,
  style = {},
  size = "40px",
  fontSize = "1.2rem",
}) => {
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLikedMovies(storedMovies);
    setIsLiked(storedMovies.some((m) => m.id === movie.id));
  }, [movie.id]);

  const handleLike = () => {
    const storedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
    const isAlreadyLiked = storedMovies.some((m) => m.id === movie.id);

    let updatedMovies;
    if (isAlreadyLiked) {
      updatedMovies = storedMovies.filter((m) => m.id !== movie.id);
      alert(`${movie.title}이(가) 저장 목록에서 제거되었습니다.`);
    } else {
      updatedMovies = [...storedMovies, movie];
      alert(`${movie.title}이(가) 저장되었습니다!`);
    }

    localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
    setLikedMovies(updatedMovies);
    setIsLiked(!isAlreadyLiked);
  };

  return (
    <button
      onClick={handleLike}
      style={{
        backgroundColor: isLiked
          ? "rgba(255, 255, 0, 1)"
          : "rgba(255, 255, 255, 0.8)",
        border: "none",
        borderRadius: "50%",
        width: size,
        height: size,
        fontSize: fontSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        ...style,
      }}
    >
      ❤
    </button>
  );
};

export default LikeButton;
