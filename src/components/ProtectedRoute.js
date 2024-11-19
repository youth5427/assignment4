import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, children }) {
  // 상태 초기화 대기
  if (isAuthenticated === null) {
    return null; // 로딩 상태 혹은 빈 화면을 보여줍니다.
  }

  if (!isAuthenticated) {
    return <Navigate to="/Signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
