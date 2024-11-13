import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"; // Footer 컴포넌트 추가
import styled from "styled-components";

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

const Loading = () => {
  return (
    <LoadingContainer>
      <div>
        <Spinner />
        <LoadingMessage>처리 중입니다...</LoadingMessage>
      </div>
    </LoadingContainer>
  );
};

function Signin() {
  const [isSignup, setIsSignup] = useState(false); // 회원가입/로그인 모드 전환
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || null
  ); // 현재 로그인한 사용자
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true); // 로딩 상태 활성화

    setTimeout(() => {
      if (password !== confirmPassword) {
        setMessage("비밀번호가 일치하지 않습니다.");
        setIsLoading(false);
        return;
      }

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
        setIsSignup(false); // 로그인 모드로 전환
        clearFields();
        setIsLoading(false);
      } else {
        setMessage("모든 필드를 입력해 주세요.");
        setIsLoading(false);
      }
    }, 1000); // 1초 지연
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // 로딩 상태 활성화

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", user.email);
        setCurrentUser(user.email);
        setMessage("로그인 성공!");
        setIsLoading(false); // 로딩 상태 비활성화
        navigate("/Home", { replace: true });
      } else {
        setMessage("사용자 이름 또는 비밀번호가 잘못되었습니다.");
        setIsLoading(false); // 로딩 상태 비활성화
      }
    }, 1000); // 1초 지연
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/Signin", { replace: true });
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

            {currentUser && (
              <Button onClick={handleLogout} style={{ marginTop: "10px" }}>
                로그아웃
              </Button>
            )}

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
