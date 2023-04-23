import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const DealerWrapper = styled.div`
  width: 100%;
  height: 50%;
  background-color: #c2c7cc;
`;

export const PlayerWrapper = styled.div`
  width: 100%;
  height: 60%;
  background-color: #11e2e2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SpaceBetweenGame = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const SpaceBetweenButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IMG = styled.img`
  height: 150px;
  margin: 2px;
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  margin-left: 10px;
  border-radius: 10px;
  border-color: aliceblue;
`;

export const Text = styled.span`
  font-size: 13px;
`;
