import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  isChecked: boolean;
  onClickCheckbox: () => void;
}
const Checkbox = ({ isChecked, onClickCheckbox }: CheckboxProps) => {
  return (
    <CheckboxContainer
      type="checkbox"
      checked={isChecked}
      onClick={() => onClickCheckbox()}
    />
  );
};

const CheckboxContainer = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 0.2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  padding: 0.2rem;
  border-color: #eaecf0;
  position: relative;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  &:checked {
    background-color: #9650fb;
  }

  &:checked::before {
    content: "";
    display: block;
    width: 40%;
    height: 90%;
    background-color: transparent;
    box-sizing: border-box;
    border-bottom: 3px solid #f0e5fe;
    border-right: 3px solid #f0e5fe;
    margin: auto;
    transform: rotate(45deg);
  }
`;

export default Checkbox;
