import styled, { css } from 'styled-components';

import { responsiveBreakpoints } from '../../consts/responsive';

const MOBILE_BREAKPOINT_MAX = responsiveBreakpoints.mobile.breakpoints.max;

export const ButtonContainer = styled.div`
  width: ${({ xSize }) => (xSize ? `${xSize}px` : '100px')};
  height: ${({ ySize }) => (ySize ? `${ySize}px` : '40px')};
  margin-left: ${({ marginL }) => (marginL ? `${marginL}px` : 0)};
  margin-right: ${({ marginR }) => (marginR ? `${marginR}px` : 0)};
  border-radius: ${({ isBet }) => (isBet ? '0px' : '10px')};
  border: ${({ isBet }) => (isBet ? '3px #ffffff solid' : 'none')};
  color: ${({ textColor }) => (textColor ? textColor : 'black')};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  font-size: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
    color: ${({ disabled }) => !disabled && '#000000'};
    opacity: 0.6;
  }

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 50px;
    height: 30px;
  }
`;
