import styled, { css } from "styled-components";

export const Input = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 10px;
  border: 0.5px gray solid;
  font-size: 15px;

  outline: none;
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
