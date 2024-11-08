// src/components/Home.js
import React from "react";
import Footer from "./Footer"; // Footer 컴포넌트 추가

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page!</h1>
      <p>This is the home screen you are redirected to after login.</p>
      {/* 추가적인 UI 요소나 스타일을 여기에 작성 */}
      <Footer /> {/* Footer 컴포넌트 추가 */}
    </div>
  );
}

export default Home;
