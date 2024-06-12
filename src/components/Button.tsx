import styled from "styled-components";

interface ButtonProps {
  buttonText: string;
  onClickHandler: Function;
  buttonType: "form" | "regular" | "cancel";
  color?: string;
  backgroundColor?: string;
  disabled?: Boolean;
}

interface ButtonStyleProps {
  buttonType: "form" | "regular" | "cancel";
  color?: string;
  backgroundColor?: string;
  disabled?: Boolean;
}
const Button = ({
  buttonText,
  onClickHandler,
  buttonType,
  color,
  backgroundColor,
  disabled = false,
}: ButtonProps) => {
  return (
    <ButtonContainer
      onClick={(e) => {
        e.preventDefault();
        onClickHandler();
      }}
      buttonType={buttonType}
      color={color}
      backgroundColor={backgroundColor}
      disabled={disabled}
    >
      {buttonText}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<ButtonStyleProps>`
  padding: 0.6rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#7f5bd6"};
  color: ${(props) => (props.color ? props.color : "#f2eefa")};
  text-align: center;
  border: 2px solid #e0e3e8;
  font-size: 0.9rem;
  font-weight: normal;
  text-shadow: 1px 0px 0px #f2eefa;
  box-sizing: border-box;
  &:hover {
    background-color: ${(props) =>
      props.buttonType == "form"
        ? "#462796"
        : props.buttonType == "cancel"
        ? props.backgroundColor
        : "#462796"};
  }

  &:disabled {
    cursor-pointer: none;
    cursor: not-allowed;
  }
`;

export default Button;
