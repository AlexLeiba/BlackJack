import styled from 'styled-components';
import { colors } from '../colors/colors';

export const Input = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 10px;
  border: 2px ${colors.green} solid;
  font-size: 15px;

  outline: none;
  color: ${colors.green};
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
