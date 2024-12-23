import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group"; // 애니메이션 라이브러리
import Footer from "../components/FooterSignin";
import styled from "styled-components";
import axios from "axios"; // axios 추가
import "../components/SigninAnimation.css"; // 애니메이션 스타일 추가

// 스타일 정의
const Container = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  text-align: center;
  margin: auto;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-image: url(${process.env.PUBLIC_URL}/Signin_background.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LinkText = styled.span`
  color: #1a73e8;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: #0c54b8;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  text-align: left;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border: 1px solid #4caf50;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #4caf50;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const KakaoLoginButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #fee500;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 1rem;

  &:hover {
    background-color: #ffd700;
  }
`;

const LoadingMessage = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const Loading = () => (
  <LoadingContainer>
    <div>
      <Spinner />
      <LoadingMessage>처리 중입니다....</LoadingMessage>
    </div>
  </LoadingContainer>
);

const Signin = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // URL 쿼리 파라미터를 읽어 초기 상태 설정
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get("mode") === "signup";

  const [isSignup, setIsSignup] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); // 약관 동의 상태
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
        console.log("Kakao 로그인 성공!!", authObj);
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
            alert("Kakao API 호출에 실패했습니다.");
            setMessage("Failed to retrieve user information.");
          },
        });
      },
      fail: (err) => {
        console.error("Kakao 로그인 실패!!", err);
        alert("Kakao 로그인 실패!! 네트워크 상태를 확인해주세요.");
        setMessage("Kakao 로그인 실패!! 네트워크 상태를 확인해주세요.");
      },
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      if (!isAgreed) {
        setMessage("약관에 동의해야 회원가입이 가능합니다.");
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setMessage("비밀번호가 일치하지 않습니다.");
        setIsLoading(false);
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        setMessage("이미 존재하는 이메일입니다.");
        setIsLoading(false);
        return;
      }

      const newUser = { email, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("회원가입이 완료되었습니다!");
      setIsSignup(false);
      clearFields();
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userPassword", user.password);
        console.log("로그인성공!", user.email);
        onLogin(user.email);
        setMessage("로그인 성공!");
        setIsLoading(false);
        navigate("/Home", { replace: true });
      } else {
        setMessage("사용자 이름 또는 비밀번호가 잘못되었습니다.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Background>
          <Container>
            <CSSTransition
              in={isSignup}
              timeout={300}
              classNames="form-slide"
              unmountOnExit
            >
              <div>
                <Title>회원가입</Title>
                <Form onSubmit={handleSignup}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                  />
                  <div style={{ textAlign: "left", marginBottom: "1rem" }}>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                    />
                    <label
                      htmlFor="terms"
                      style={{ marginLeft: "0.5rem", fontSize: "0.9rem" }}
                    >
                      <span>
                        <Link to="/Terms">이용약관</Link>
                      </span>
                      에 동의합니다.
                    </label>
                  </div>
                  <Button type="submit">Sign Up</Button>
                </Form>
              </div>
            </CSSTransition>

            <CSSTransition
              in={!isSignup}
              timeout={300}
              classNames="form-slide"
              unmountOnExit
            >
              <div>
                <Title>로그인</Title>
                <Form onSubmit={handleLogin}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <Button type="submit">Sign In</Button>
                </Form>
              </div>
            </CSSTransition>

            {message && <p>{message}</p>}
            <LinkText
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
                clearFields();
              }}
            >
              {isSignup
                ? "이미 계정이 있나요? 로그인"
                : "계정이 없나요? 회원가입"}
            </LinkText>
            <KakaoLoginButton onClick={handleKakaoLogin}>
              Login with Kakao
            </KakaoLoginButton>
            {message && <p>{message}</p>}
          </Container>

          <Footer />
        </Background>
      )}
    </>
  );
};

export default Signin;
