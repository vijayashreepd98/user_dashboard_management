import {
  faAngleDown,
  faAngleUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";

const Dropdown = ({
  roles,
  onSelectRole,
  selectedRoleId,
}: {
  roles: { [key: string]: string };
  onSelectRole: (value: number) => void;
  selectedRoleId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (id: number) => {
    onSelectRole(id);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton
        onClick={(e) => {
          toggleDropdown(e);
        }}
      >
        <ButtonText>{roles[selectedRoleId]}</ButtonText>
        <DropDownIcon>
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            style={{ fontSize: "1rem", margin: 0 }}
          />
        </DropDownIcon>
      </DropdownButton>
      <DropdownContent show={isOpen}>
        {Object.keys(roles).map((key, index) => {
          return (
            <React.Fragment>
              <DropdownItem onClick={() => handleItemClick(parseInt(key))}>
                <ButtonText>{roles[key]} </ButtonText>
                {parseInt(key) == selectedRoleId && (
                  <DropDownIcon>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ fontSize: "1rem", margin: 0 }}
                    />
                  </DropDownIcon>
                )}
              </DropdownItem>
            </React.Fragment>
          );
        })}
      </DropdownContent>
    </DropdownContainer>
  );
};

const DropDownIcon = styled.span`
  width: fit-content;
  padding: 0;
  box-sizing: border-box;
  height: fit-content;
  margin-left: auto;
  align-self: center;
  color: #997ddd;
`;

const ButtonText = styled.span`
  font-size: 0.9rem;
  color: #242424;
  text-align: left;
  width: 100%;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  background-color: #ffffff;
  border: none;
  width: 100%;
  padding: 9px;
  border-radius: 0.5rem;
  border: 1px solid #e2e5ea;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    border: 2px solid #e2e5ea;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

interface DropdownContentStyleProps {
  show: boolean;
}

const DropdownContent = styled.div<DropdownContentStyleProps>`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  width: 100%;
  font-size: 0.9rem;
  color: #242424;
  height: 180px;
  overflow-y: auto;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 1px 2px 2px #e5e7e7;
  padding-bottom: 0.5rem;
  scrollbar-width: none; 
  z-index: 1;
`;

const DropdownItem = styled.div`
  color: black;
  padding: 9px;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  &:hover {
    background-color: #f9fafb;
  }
`;

export default Dropdown;
