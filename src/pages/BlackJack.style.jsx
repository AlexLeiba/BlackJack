import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const GameWrapper = styled.div`
  width: 50%;
`;

export const DealerWrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: #c2c7cc;
  padding: 10px;
`;

export const PlayerWrapper = styled.div`
  width: 100%;
  height: 60%;
  background-color: #0c6d3b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const SpaceBetweenGame = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const SpaceBetween = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IMG = styled.img`
  height: ${({ type }) => (type === "chips" ? "40px" : "150px")};
  margin: 2px;
`;

export const Button = styled.button`
  width: ${({ xSize }) => (xSize ? `${xSize}px` : "100px")};
  height: ${({ ySize }) => (ySize ? `${ySize}px` : "40px")};
  margin: 0 0 10px 10px;
  border-radius: 10px;
  border: none;
  color: ${({ textColor }) => (textColor ? textColor : "black")};
  background-color: ${({ bgColor }) => bgColor && bgColor};

  &:hover {
    background-color: #b5c4d1;
    color: white;
  }
`;

export const Text = styled.h1`
  width: 100%;
  font-size: ${({ size }) => (size ? `${size}px` : "13px")};
  text-align: ${({ align }) => (align ? align : "center")};
  margin: 10px 10px 0 0;
  ${({ type }) => {
    switch (type) {
      case "player":
        return css`
          color: white;
        `;
      case "dealer":
        return css`
          color: black;
        `;
      case "lost":
        return css`
          color: #bb0e0e;
        `;
      case "won":
        return css`
          color: #0ff67f;
        `;

      default:
        return css`
          color: black;
        `;
    }
  }};
`;

export const BetWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 0;
`;

export const Input = styled.input`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  border: none !important;
  font-size: 15px;
`;

export const CardsWrapper = styled.div`
  margin-bottom: 20px;
`;

export const ImageWrapper = styled.div`
  width: 10px;
  margin-top: 25px;
`;
