import React from "react";
import styled from "styled-components";
import Button from "./Button";

const PopUp = ({
  popUpcontent,
  popUpType = "confirmation",
  PopUpHeader = <></>,
  onCancelHandler = () => {},
  onConfirmHandler = () => {},
}: {
  popUpcontent: JSX.Element;
  popUpType?: "info" | "confirmation" | "form";
  PopUpHeader?: JSX.Element;
  onCancelHandler?: () => void;
  onConfirmHandler?: () => void;
}) => {
  return (
    <PopUpContainer onClick={(e) => e.stopPropagation()}>
      {popUpType == "info" ? (
        <React.Fragment>
          <PopUpHeaderContainer>{PopUpHeader}</PopUpHeaderContainer>
          <PopUpContentContainer>{popUpcontent}</PopUpContentContainer>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PopUpContentContainer>{popUpcontent}</PopUpContentContainer>
          {popUpType != "form" && (
            <ButtonContainer>
              <Button
                buttonText={"Cancel"}
                onClickHandler={() => {
                  onCancelHandler();
                }}
                buttonType={"cancel"}
                color="#858d98"
                backgroundColor="#ffffff"
              />
              <Button
                buttonText={"Confirm"}
                onClickHandler={() => {
                  onConfirmHandler();
                }}
                buttonType={"regular"}
                color="#d9cef2"
                backgroundColor="#7f5bd6"
              />
            </ButtonContainer>
          )}
        </React.Fragment>
      )}
    </PopUpContainer>
  );
};

const PopUpHeaderContainer = styled.div``;
const PopUpContainer = styled.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: fit-content;
  background-color: #ffffff;
  margin: 0;
  justify-content: center;
  box-sizing: border-box;
  align-items: flex-start;
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);
  gap: 1rem;
`;

const PopUpContentContainer = styled.div`
  width: 100%;
  height: fit-content;
`;

export const ButtonContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  box-sizing: border-box;
  column-gap: 1rem;
`;

export default PopUp;
