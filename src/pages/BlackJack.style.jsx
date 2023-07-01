import styled, { css } from "styled-components";
import { cards } from "../assets/images";
import { colors } from "../colors/colors";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${cards.backgroundImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TableWrapper = styled.div`
  width: 600px;
  height: 900px;
  background-image: url(${cards.table});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 100px;
  padding: 0 26px 0 26px;

  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 0 20px 55px black;
  border-radius: 50px;
  position: relative;
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
  height: 100%;
`;
export const SpaceBetween = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IMG = styled.img`
  ${({ type }) => {
    switch (type) {
      case "chips":
        return css`
          height: 68px;
        `;
      case "cards":
        return css`
          height: 100px;
          margin: 2px;
        `;

      default:
        return css`
          height: 100px;
        `;
    }
  }}
`;

export const BetContainer = styled.span`
  position: absolute;
  top: calc(50% - 35px);
`;

export const Button = styled.button`
  width: ${({ xSize }) => (xSize ? `${xSize}px` : "100px")};
  height: ${({ ySize }) => (ySize ? `${ySize}px` : "40px")};
  margin-left: ${({ marginL }) => (marginL ? `${marginL}px` : 0)};
  border-radius: ${({ isBet }) => (isBet ? "0px" : "10px")};
  border: ${({ isBet }) => (isBet ? "3px #ffffff solid" : "none")};
  color: ${({ textColor }) => (textColor ? textColor : "black")};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  font-size: 17px;
  cursor: pointer;

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
    color: ${({ disabled }) => !disabled && "#000000"};
    opacity: 0.6;
  }
`;

export const Input = styled.input`
  width: 76px;
  height: 38px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: 3px #ffffff solid;
  outline: none;
  background-color: transparent;
  color: ${colors.white};
  padding-left: 24px;
  font-size: 17px;
`;

export const Text = styled.h1`
  display: block;
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
      case "walletName":
        return css`
          color: ${colors.green};
        `;
      case "walletChips":
        return css`
          color: ${colors.white};
          font-weight: 400;
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
  width: 30px;
  position: relative;
`;

export const WalletsWrapper = styled.div`
  top: 50%;
  right: 26px;
  position: absolute;
`;

export const BetValueWrapper = styled.div`
  width: 50px;
  position: absolute;
  top: 28px;
  left: 17px;
`;
