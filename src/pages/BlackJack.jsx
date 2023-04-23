import React, { useEffect, useState } from "react";
import {
  Container,
  DealerWrapper,
  PlayerWrapper,
  IMG,
  Button,
  SpaceBetweenGame,
  SpaceBetweenButtons,
  Text,
} from "./BlackJack.style";
import { cards } from "../assets/images";

export function BlackJack() {
  const [cardPlayerImages, setCardPlayerImages] = useState([]);
  const [cardDealerImages, setCardDealerImages] = useState([]);
  const [cardState, setCardState] = useState([]);
  const [gameState, setGameState] = useState({
    delearSum: 0,
    playerSum: 0,
    canHit: true,
    dealerAceCount: 0,
    playerAceCount: 0,
  });

  let playerSum = 0;

  let dealerAceCount = 0;
  let playerAceCount = 0;

  let newCard;
  let deck = [];

  // TO DO all variables states in useState

  function buildDeck() {
    let cardValues = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    let cardTypes = ["C", "D", "H", "S"];

    for (let indexTypes = 0; indexTypes < cardTypes.length; indexTypes++) {
      //types
      for (let valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
        cardState.push(cardValues[valueIndex] + "-" + cardTypes[indexTypes]);
      }
    }
  }

  function shuffleCards() {
    for (let indexCards = 0; indexCards < cardState.length; indexCards++) {
      let randomNumbers = Math.floor(Math.random() * cardState.length); // multiplying 1 * deck length which is 56

      let initialDeck = cardState[indexCards];

      cardState[indexCards] = cardState[randomNumbers];

      cardState[randomNumbers] = initialDeck;
    }
  }

  function getValue(newCard) {
    console.log("spliutttt", newCard);
    let data = newCard.split("-");
    let value = data[0];

    if (isNaN(value)) {
      //if data is not a number do that

      if (value === "A") {
        return 11; //only A has 11 the rest 10
      }
      return 10;
    }

    return parseInt(value); //if the data is number return it
  }

  let dealerSum = 0;

  function startGame() {
    newCard = cardState.pop();
    dealerSum += getValue(newCard);
    dealerAceCount += checkAce(newCard);

    // dealer
    while (dealerSum < 17) {
      const card = cardState.pop();

      dealerSum += getValue(card);

      dealerAceCount += checkAce(card);

      setCardDealerImages((prevValue) => [...prevValue, card]);
    }
    // player
    for (let index = 0; index < 1; index++) {
      const card = cardState.pop();

      playerSum += getValue(card);
      playerAceCount += checkAce(card);
      deck.push(card);
      setCardPlayerImages((prev) => [...prev, card]);
    }

    setGameState((prev) => ({
      ...prev,
      playerSum,
      playerAceCount,
    }));
  }

  function hit() {
    if (!gameState.canHit) {
      return;
    }

    const card = cardState.pop();

    playerSum += getValue(card);
    playerAceCount += checkAce(card);

    const newSumPlayer = (gameState.playerSum += playerSum);
    const newPlayerAceCount = (gameState.playerAceCount += playerAceCount);

    setGameState((prev) => ({
      ...prev,
      playerSum: newSumPlayer,
      playerAceCount: newPlayerAceCount,
    }));

    setCardPlayerImages((prev) => [...prev, card]);
    console.log(reduceAce(newSumPlayer, newPlayerAceCount));
    if (reduceAce(newSumPlayer, newPlayerAceCount) > 21) {
      setGameState((prevValues) => ({
        ...prevValues,
        canHit: false,
      }));
    }
  }

  function reduceAce(playerSum, playerAceCount) {
    if (playerSum > 21 && playerAceCount > 0) {
      setGameState((prev) => ({
        ...prev,
        playerAceCount: playerAceCount - 1,
        playerSum: playerSum - 10,
      }));
    }

    return gameState.playerSum;
  }
  function checkAce(card) {
    if (card[0] === "A") {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    buildDeck();
    shuffleCards();
    startGame();
  }, []);
  return (
    <Container>
      <SpaceBetweenGame>
        <DealerWrapper>
          <h2>Dealer:</h2>
          <IMG src={cards.back} alt="card" />
          {cardDealerImages.map((data, index) => {
            return <IMG src={cards[data]} alt="card" key={index} />;
          })}
        </DealerWrapper>
        <PlayerWrapper>
          <div>
            <h2>Player:</h2>
            {cardPlayerImages.map((data, index) => {
              return <IMG src={cards[data]} alt="card" key={index} />;
            })}
          </div>

          <div>
            <SpaceBetweenButtons>
              <Button onClick={hit}>Hit</Button> <Button>Stay</Button>
            </SpaceBetweenButtons>
            <Text>Win</Text>
          </div>
        </PlayerWrapper>
      </SpaceBetweenGame>
    </Container>
  );
}
