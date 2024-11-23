import React from "react";
import styled from "styled-components";

// Footer 스타일 정의
const StyledFooter = styled.footer`
  position: fixed; /* 화면에서 고정 */
  bottom: 10px; /* 하단에서 10px 띄움 */
  right: 10px; /* 오른쪽에서 10px 띄움 */
  font-size: 0.8rem;
  color: #333;

  a {
    color: #1a73e8;
    text-decoration: none;

    &:hover {
      color: #0c54b8;
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <p>
        <a
          href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EC%97%94%ED%84%B0%ED%85%8C%EC%9D%B8%EB%A8%BC%ED%8A%B8-%EC%84%BC%ED%84%B0-%EC%9C%84%EC%97%90-%EB%86%93%EC%9D%B8-%ED%8F%89%EB%A9%B4-tv-cPwnUGSdl-c"
          target="_blank"
          rel="noreferrer"
        >
          배경 출처
        </a>
      </p>
    </StyledFooter>
  );
}

export default Footer;
