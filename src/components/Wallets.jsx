import styled from 'styled-components';
import { colors } from '../colors/colors';
import { responsiveBreakpoints } from '../consts/responsive';

const MOBILE_BREAKPOINT_MAX = responsiveBreakpoints.mobile.breakpoints.max;

export const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WalletWrapper = styled.div`
  display: flex;
`;
export const WalletDealerName = styled.div`
  width: 100px;
  height: 38px;
  border: 3px ${colors.white} solid;
  font-size: 15px;

  outline: none;
  color: ${colors.green};

  border-top-left-radius: 16px;
  border-bottom-color: ${colors.green};
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 70px;
    height: 30px;
  }
`;

export const WalletDealerCoins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 38px;
  font-size: 15px;

  outline: none;
  color: ${colors.green};
  border-top-right-radius: 16px;
  border: 3px #ffffff solid;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 70px;
    height: 30px;
  }
`;

export const WalletPlayerName = styled.div`
  width: 100px;
  height: 38px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 15px;
  color: ${colors.green};

  border: 3px ${colors.white} solid;
  border-bottom-left-radius: 16px;
  border-top-color: ${colors.green};

  background-color: ${colors.white};

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 70px;
    height: 30px;
  }
`;

export const WalletPlayerCoins = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 38px;
  font-size: 15px;

  outline: none;
  color: ${colors.green};
  border-bottom-right-radius: 16px;
  border: 3px #ffffff solid;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    width: 70px;
    height: 30px;
  }
`;

export const InputWrapper = styled.div`
  width: 150px;
  margin-bottom: 20px;
  margin-top: 30px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
