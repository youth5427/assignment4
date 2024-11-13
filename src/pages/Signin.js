import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios"; // axios 추가

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
  background-image: url("/Signin_background.jpg");
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

const LoadingMessage = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const Loading = () => (
  <LoadingContainer>
    <div>
      <Spinner />
      <LoadingMessage>처리 중입니다...</LoadingMessage>
    </div>
  </LoadingContainer>
);
const validatePasswordWithAPI = async (password) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: { api_key: password }, // 비밀번호를 API 키로 검증
      }
    );
    return response.status === 200; // 요청 성공 시 true 반환
  } catch (error) {
    console.error("Invalid API key:", error);
    return false; // 실패 시 false 반환
  }
};
function Signin({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(async () => {
      if (password !== confirmPassword) {
        setMessage("비밀번호가 일치하지 않습니다.");
        setIsLoading(false);
        return;
      }
      // 비밀번호(API 키) 유효성 검사
      const isValidPassword = await validatePasswordWithAPI(password);

      if (!isValidPassword) {
        setMessage("올바른 API으로 가입해주세요.");
        setIsLoading(false);
        return;
      }
      // 계정 중복 확인
      if (email && password) {
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
      } else {
        setMessage("모든 필드를 입력해 주세요.");
        setIsLoading(false);
      }
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
        localStorage.setItem("currentUser", user.email);
        localStorage.setItem("userPassword", user.password);
        onLogin();
        setMessage("로그인 성공!");
        setIsLoading(false);
        navigate("/Home", { replace: true }); // 정확한 타이밍에 리디렉션
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
            <Title>{isSignup ? "회원가입" : "로그인"}</Title>
            <Form onSubmit={isSignup ? handleSignup : handleLogin}>
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
              {isSignup && (
                <>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm your password"
                  />
                </>
              )}
              <Button type="submit">{isSignup ? "Sign Up" : "Sign In"}</Button>
            </Form>
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
            <Footer />
          </Container>
        </Background>
      )}
    </>
  );
}

export default Signin;
