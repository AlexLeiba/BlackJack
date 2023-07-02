import React from "react";
import Modal from "react-modal";
import { Button, IMG, SpaceBetween, Text } from "../pages/BlackJack.style";
import { IconsWrapper, Input, InputWrapper } from "./Input.style";
import { cards } from "../assets/images";
import { colors } from "../colors/colors";
import { Spacer } from "./Spacer";
import { Container } from "./InfoModal.style";

export function InfoModal({
  isVisible,
  handleCreateNewGame,
  handleGameState,
  gameState,
  canContinue,
  nextGame,
  playerCards,
}) {
  const customStyles = {
    content: {
      width: "400px",
      height: "325px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      overflow: "hidden",
      borderRadius: "30px",
    },
  };

  return (
    <Modal ariaHideApp={false} isOpen={isVisible} style={customStyles}>
      <IconsWrapper>
        {playerCards > 0 && (
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
        )}
      </IconsWrapper>
      <Text type={"blackjack"} size={25}>
        {playerCards > 0 ? "Blackjack" : " Welcome to Blackjack"}
      </Text>

      <Text type={"modal"} size={20}>
        If you want to start a new game please introduce your name!
      </Text>

      <Container>
        <InputWrapper>
          <Text type={"modal"} align="left">
            Name
          </Text>
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

        <IconsWrapper>
          <IMG style={{ height: "20px" }} src={cards.vector2} />
          <IMG style={{ height: "20px" }} src={cards.vector1} />
          <IMG style={{ height: "20px" }} src={cards.vector4} />
          <IMG style={{ height: "20px" }} src={cards.vector3} />
        </IconsWrapper>

        <Spacer margin={40} />

        <SpaceBetween>
          <Button
            disabled={gameState.userName.length < 1}
            textColor={colors.white}
            onClick={handleCreateNewGame}
            bgColor={
              gameState.userName.length > 0 ? `${colors.red}` : `${colors.gray}`
            }
          >
            New game
          </Button>

          {canContinue && (
            <Button
              marginL={16}
              textColor={colors.white}
              onClick={() =>
                playerCards > 0
                  ? handleGameState((prevState) => ({
                      ...prevState,
                      isModalVisible: false,
                    }))
                  : nextGame()
              }
              bgColor={colors.green}
            >
              Continue
            </Button>
          )}
        </SpaceBetween>
      </Container>
    </Modal>
  );
}
