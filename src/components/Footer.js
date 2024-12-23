import React from "react";
import styled from "styled-components";

// Footer 스타일 정의
const StyledFooter = styled.footer`
  position: fixed; /* 화면에서 고정 */
  bottom: 10px; /* 하단에서 10px 띄움 */
  left: 10px; /* 오른쪽에서 10px 띄움 */
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
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          영화 포스터 출처
        </a>
      </p>
    </StyledFooter>
  );
}

export default Footer;
