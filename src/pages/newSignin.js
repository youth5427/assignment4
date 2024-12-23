// Signin.js
import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import axios from "axios";
import Footer from "../components/FooterSignin";
import "../components/SigninAnimation.css";

const KakaoLoginButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #fee500;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #ffd700;
  }
`;

const Signin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const kakao_api = process.env.REACT_APP_KAKAO_API_KEY;

  const initializeKakao = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakao_api); // 카카오에서 제공받은 JavaScript Key를 입력
    }
  };

  const handleKakaoLogin = () => {
    initializeKakao();
    window.Kakao.Auth.login({
      scope: "profile_nickname",
      success: (authObj) => {
        console.log("Kakao login successful", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: (res) => {
            console.log("Kakao API response", res);
            const nickname = res.kakao_account.profile.nickname;
            setMessage(`Welcome, ${nickname}!`);
            onLogin(nickname);
            navigate("/Home", { replace: true });
          },
          fail: (err) => {
            console.error("Kakao API request failed", err);
            setMessage("Failed to retrieve user information.");
          },
        });
      },
      fail: (err) => {
        console.error("Kakao login failed", err);
        setMessage("Kakao login failed.");
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Login</h2>
          <KakaoLoginButton onClick={handleKakaoLogin}>
            Login with Kakao
          </KakaoLoginButton>
          {message && <p>{message}</p>}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Signin;
