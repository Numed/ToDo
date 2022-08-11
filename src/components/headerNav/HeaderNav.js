import styled from "styled-components";

const Header = styled.header`
  padding: 30px 80px;
  width: 100%;
  height: 100%;

  @media (max-width: 350px) {
    padding: 30px 0;
  }
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderLogo = styled.h1`
  font-size: 32px;
  line-height: 48px;
  letter-spacing: 1.2px;
  font-weight: 600;
`;

const HeaderNav = () => {
  return (
    <Header>
      <LogoContainer className="logo__section">
        <HeaderLogo>To Do List</HeaderLogo>
      </LogoContainer>
    </Header>
  );
};

export default HeaderNav;
