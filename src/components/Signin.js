import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // Footer 컴포넌트 추가
import "./Signin.css";

function Signin() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      if (storedUser.email === email && storedUser.password === password) {
        setMessage("로그인 성공!");
        navigate("/home");
      } else {
        setMessage("사용자 이름 또는 비밀번호가 잘못되었습니다.");
      }
    } else {
      setMessage("회원가입이 필요합니다.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
      setMessage("회원가입이 완료되었습니다! 이제 로그인하세요.");
      setIsSignup(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setMessage("모든 필드를 입력해 주세요.");
    }
  };

  return (
    <div className="container">
      <h2>{isSignup ? "회원가입" : "로그인"}</h2>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
            />
          </>
        )}

        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>
      {message && <p>{message}</p>}
      <span
        className="link-text"
        onClick={() => {
          setIsSignup(!isSignup);
          setMessage("");
        }}
      >
        {isSignup ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
      </span>
      <Footer /> {/* Footer 컴포넌트 추가 */}
    </div>
  );
}

export default Signin;
