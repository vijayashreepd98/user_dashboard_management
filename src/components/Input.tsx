import React from "react";
import styled from "styled-components";

interface InputProps {
  type: `number` | `text` | `email`;
  onChangeHandler: (value: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  value?: string | number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, onChangeHandler, id, value }, ref) => {
    return (
      <InputContainer
        type={type}
        onChange={onChangeHandler}
        id={id}
        value={value}
      />
    );
  }
);

const InputContainer = styled.input`
  width: max-width;
  font-size: 0.9rem;
  color: #242424;
  padding: 9px;
  outline: none;
  border-radius: 0.5rem;
  border: 1px solid #e2e5ea;
  background-color: #f4f4f4;
  &:focus {
    border: 2px solid #e2e5ea;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export default Input;
