import styled, { css } from "styled-components";
import { cards } from "../assets/images";
import { colors } from "../colors/colors";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-image: url(${cards.backgroundImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TableWrapper = styled.div`
  width: 800px;
  background-image: url(${cards.table});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 100px;
  padding: 0 26px 0 26px;

  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 0 0px 15px black;
  border-radius: 50px;
`;

export const DealerWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const PlayerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

export const SpaceBetweenGame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
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

export const BetContainer = styled.span`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
`;

export const Button = styled.button`
  width: ${({ xSize }) => (xSize ? `${xSize}px` : "100px")};
  height: ${({ ySize }) => (ySize ? `${ySize}px` : "40px")};
  margin-left: ${({ marginL }) => (marginL ? `${marginL}px` : 0)};
  border-radius: ${({ isBet }) => (isBet ? "0px" : "10px")};
  border: ${({ isBet }) => (isBet ? "2px #ffffff solid" : "none")};
  color: ${({ textColor }) => (textColor ? textColor : "black")};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  font-size: 17px;

  ${({ isBet }) => {
    switch (isBet) {
      case isBet === true:
        return css`
          border-top-right-radius: 16px;
          border-bottom-right-radius: 16px;
          font-weight: 600;
        `;

      default:
        break;
    }
  }}

  &:hover {
    color: #000000;
  }
`;

export const Input = styled.input`
  width: 76px;
  height: 38px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: 2px #ffffff solid;
  font-size: 15px;
  outline: none;
  background-color: transparent;
  color: ${colors.white};
  padding-left: 24px;
  font-size: 17px;
`;

export const Text = styled.h1`
  font-size: ${({ size }) => (size ? `${size}px` : "13px")};
  text-align: ${({ align }) => (align ? align : "center")};
  margin: 0;
  ${({ type }) => {
    switch (type) {
      case "player":
        return css`
          color: white;
        `;
      case "dealer":
        return css`
          color: white;
        `;
      case "lost":
        return css`
          color: #bb0e0e;
        `;
      case "won":
        return css`
          color: #0ff67f;
        `;
      case "modal":
        return css`
          color: ${colors.green};
        `;

      default:
        return css`
          color: black;
        `;
    }
  }};
`;

export const CardsWrapper = styled.div`
  margin-bottom: 20px;
`;

export const ImageWrapper = styled.div`
  width: 10px;
`;
