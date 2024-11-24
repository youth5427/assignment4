import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TermsContainer = styled.div`
  position: relative; /* X 버튼의 위치를 설정하기 위해 필요 */
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #555;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #666;
`;

const CloseButton = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
  text-decoration: none; /* 링크의 기본 밑줄 제거 */

  &:hover {
    color: #ff0000;
  }
`;

const Terms = () => {
  return (
    <TermsContainer>
      <CloseButton to="/Signin?mode=signup">×</CloseButton>
      <Title>이용 약관</Title>
      <Section>
        <SubTitle>1. 일반 사항</SubTitle>
        <Paragraph>
          본 약관은 귀하가 본 서비스를 이용함에 있어 필요한 권리, 의무, 책임
          사항 및 기타 관련 절차를 규정합니다.
        </Paragraph>
      </Section>
      <Section>
        <SubTitle>2. 사용자 책임</SubTitle>
        <Paragraph>
          사용자는 본 서비스를 이용함에 있어 타인의 권리를 침해하지 않아야 하며,
          관련 법규를 준수해야 합니다.
        </Paragraph>
      </Section>
      <Section>
        <SubTitle>3. 데이터 사용</SubTitle>
        <Paragraph>
          귀하의 데이터는 서비스 제공 목적에 따라 안전하게 관리되며, 당사의
          개인정보 보호정책에 따라 처리됩니다.
        </Paragraph>
      </Section>
      <Section>
        <SubTitle>4. 서비스 중단</SubTitle>
        <Paragraph>
          서비스는 당사의 사정에 따라 중단될 수 있으며, 이에 대한 책임은 당사가
          부담하지 않습니다.
        </Paragraph>
      </Section>
      <Section>
        <SubTitle>5. 기타</SubTitle>
        <Paragraph>
          본 약관은 관련 법규를 준수하며, 약관에 대한 해석과 관할은 해당 법원이
          담당합니다.
        </Paragraph>
      </Section>
    </TermsContainer>
  );
};

export default Terms;
