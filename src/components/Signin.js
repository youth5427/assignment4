import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Footer 컴포넌트 추가
import "./Signin.css";

function Signin() {
  const [isSignup, setIsSignup] = useState(false); // 회원가입/로그인 상태 전환
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [message, setMessage] = useState(""); // 메시지 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이터

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userPassword", password); // 비밀번호 저장
        setMessage("로그인 성공!");
        navigate("/Home", { replace: true }); // 절대 경로로 이동, 기록 대체
      } else {
        setMessage("사용자 이름 또는 비밀번호가 잘못되었습니다.");
      }
    } else {
      setMessage("회원가입이 필요합니다.");
    }
  };

  // 회원가입 처리
  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (email && password) {
      const newUser = { email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("userPassword", password); // 비밀번호 저장
      setMessage("회원가입이 완료되었습니다! 이제 로그인하세요.");
      setIsSignup(false);
      clearFields();
    } else {
      setMessage("모든 필드를 입력해 주세요.");
    }
  };

  // 입력 필드 초기화
  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container">
      <h2>{isSignup ? "회원가입" : "로그인"}</h2>

      {/* 로그인/회원가입 폼 */}
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />

        {isSignup && (
          <>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </>
        )}

        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>

      {/* 메시지 출력 */}
      {message && <p className="message">{message}</p>}

      {/* 회원가입/로그인 전환 링크 */}
      <span
        className="link-text"
        onClick={() => {
          setIsSignup(!isSignup);
          setMessage("");
          clearFields();
        }}
      >
        {isSignup ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
      </span>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Signin;
