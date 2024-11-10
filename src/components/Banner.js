import React from "react";
import "./Banner.css";

function Banner({ featuredMovie }) {
  if (!featuredMovie) return null;

  return (
    <div className="banner">
      <img
        src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
        alt={featuredMovie.title}
        className="banner-image"
      />
      <div className="banner-content">
        <h2>{featuredMovie.title}</h2>
        <p>{featuredMovie.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
