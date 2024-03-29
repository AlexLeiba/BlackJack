import styled, { css, keyframes } from "styled-components";
import { cards } from "../assets/images";
import { colors } from "../colors/colors";
import { responsiveBreakpoints } from "../consts/responsive";

const MOBILE_BREAKPOINT_MAX = responsiveBreakpoints.mobile.breakpoints.max;
const MOBILE_BREAKPOINT_MIN = responsiveBreakpoints.mobile.breakpoints.min;

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
  height: 90%;
  background-image: url(${cards.table});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0 26px;

  border-radius: 100px;
  box-shadow: 0 20px 55px 0 black;
  position: relative;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 100%;
    padding: 0 26px;
    overflow: hidden;
    height: 85%;
    margin-bottom: 80px;
  }

  @media (max-width: ${MOBILE_BREAKPOINT_MIN}px) {
    width: 100%;
    padding: 0 26px;
    overflow-x: hidden;
    border-radius: 50px;
  }
`;

export const DealerWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
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
  margin: 5px;
  gap: 10px;
`;

const impulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const IMG = styled.img`
  ${({ type }) => {
    switch (type) {
      case "chips":
        return css`
          height: 68px;

          &.impulse {
            animation: ${impulseAnimation} 0.5s;
          }
        `;
      case "cards":
        return css`
          &.impulse {
            animation: ${impulseAnimation} 0.3s;
          }
          @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
            height: 70px;
          }

          @media (min-width: 768px) {
            height: 100px;
          }
          margin: 2px;
        `;

      case "closeModal":
        return css`
          height: 20px;
          cursor: pointer;
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
  margin-right: ${({ marginR }) => (marginR ? `${marginR}px` : 0)};
  border-radius: ${({ isBet }) => (isBet ? "0px" : "10px")};
  border: ${({ isBet }) => (isBet ? "3px #ffffff solid" : "none")};
  color: ${({ textColor }) => (textColor ? textColor : "black")};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  font-size: 17px;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT_MIN}px) {
    font-size: 12px;

    ${({ type }) => {
      switch (type) {
        case "newGame":
          return css`
            width: 70px;
          `;

          break;

        default:
          break;
      }
    }}
  }

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
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: 3px ${colors.white} solid;
  outline: none;
  background-color: transparent;
  color: ${colors.white};
  font-size: 17px;
  padding: 10px 0px 10px 24px;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 50px;
    height: 30px;
    padding: 0 0 0 24px;
  }
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
          color: #f3f310;
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

          @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
            font-size: 10px;
          }
        `;
      case "walletChips":
        return css`
          color: ${colors.white};
          font-weight: 400;

          @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
            font-size: 12px;
          }
        `;

      default:
        return css`
          color: black;
        `;
    }
  }};
`;

export const CardsWrapper = styled.div``;

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

export const RaiseBetContainer = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
`;
