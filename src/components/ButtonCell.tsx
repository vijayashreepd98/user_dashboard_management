import styled from "styled-components";

const ButtonCell = ({
  text,
  color,
  backgroundColor,
  shadow,
}: {
  text: string | JSX.Element;
  color?: string;
  backgroundColor?: string;
  shadow?: string;
}) => {
  return (
    <ButtonCellContainer
      color={color}
      backgroundColor={backgroundColor}
      shadow={shadow}
    >
      {text}
    </ButtonCellContainer>
  );
};

interface ButtonCellStyleProps {
  color?: string;
  backgroundColor?: string;
  shadow?: string;
}
const ButtonCellContainer = styled.p<ButtonCellStyleProps>`
  padding: 0.2rem 0.3rem;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#FFFFFF"};
  margin: 0;
  width: fit-content;
  color: ${(props) => (props.color ? props.color : "#462796")} !important;
  font-size: 0.9rem;
  text-shadow: 0 0 2px ${(props) => (props.shadow ? props.shadow : `gray`)};
`;

export default ButtonCell;
