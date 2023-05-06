import React from "react";
import Modal from "react-modal";
import { Button, IMG, Text } from "../pages/BlackJack.style";
import { IconsWrapper, Input, InputWrapper } from "./Input.style";
import { cards } from "../assets/images";

export function InfoModal({
  isVisible,
  handleCreateNewGame,
  handleGameState,
  gameState,
}) {
  const customStyles = {
    content: {
      width: "400px",
      height: "250px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
    },
  };

  return (
    <Modal isOpen={isVisible} style={customStyles}>
      <IconsWrapper>
        <IMG
          style={{ height: "20px", cursor: "pointer" }}
          src={cards.close}
          onClick={() =>
            handleGameState((prevState) => ({
              ...prevState,
              isModalVisible: false,
            }))
          }
        />
      </IconsWrapper>

      <Text size={20}>Before to start please introduce your name!</Text>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <InputWrapper>
            <Text align="left">Name</Text>
            <Input
              type="string"
              title="Name"
              value={gameState.userName}
              onChange={(e) =>
                handleGameState((prevValue) => ({
                  ...prevValue,
                  userName: e.target.value,
                }))
              }
            />
          </InputWrapper>

          <Button
            disabled={gameState.userName.length < 1}
            textColor="white"
            onClick={handleCreateNewGame}
            bgColor={gameState.userName.length > 0 ? "red" : "gray"}
            xSize={100}
          >
            New game
          </Button>
        </div>
      </div>
    </Modal>
  );
}
