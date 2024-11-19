import React from "react";
import styled from "styled-components";

// 스타일 정의
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
        <LoadingMessage>로그인 중입니다...</LoadingMessage>
      </div>
    </LoadingContainer>
  );
};

export default Loading;
