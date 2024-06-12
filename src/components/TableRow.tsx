import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TableCell } from "./Table";
import Checkbox from "./Checkbox";
import Profile from "./Profile";
import ButtonCell from "./ButtonCell";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

 export interface UserProps {
  user_id: number;
  avatar: string;
  name: string;
  user_name: string;
  is_active: boolean;
  email: string;
  master_role_id: number;
  teams: string[];
}

interface Props {
  userData: UserProps;
  onDeleteHandler: (userId: number) => void;
  onEditHandler: (userData: UserProps) => void;
  checkboxIds: number[];
  setCheckboxIds: Dispatch<SetStateAction<number[]>>;
  roleList: { [key: string]: string };
  isCheckedAll: boolean;
  setIsCheckedAll: Dispatch<SetStateAction<boolean>>;
}

const TableRow = React.forwardRef<HTMLTableRowElement, Props>(
  (
    {
      userData,
      onDeleteHandler,
      onEditHandler,
      checkboxIds,
      setCheckboxIds,
      roleList,
      isCheckedAll,
      setIsCheckedAll,
    },
    ref
  ) => {
    function onClickCheckbox() {
      setIsCheckedAll(false);
      if (checkboxIds.includes(userData.user_id)) {
        setCheckboxIds((prev) =>
          prev.filter((id: number) => id !== userData.user_id)
        );
      } else {
        setCheckboxIds((prev) => [...prev, userData.user_id]);
      }
    }

    return (
      <TableRowContainer ref={ref}>
        <TableCell>
          <Checkbox
            isChecked={
              checkboxIds.includes(userData.user_id) || isCheckedAll
            }
            onClickCheckbox={onClickCheckbox}
          />
        </TableCell>
        <TableCell>
          <Profile
            avatar={userData.avatar}
            name={userData.name}
            userName={userData.user_name}
          />
        </TableCell>
        <TableCell>
          <ButtonCell
            text={
              <StatusContainer>
                <Circle />
                <StatusText>
                  {userData.is_active ? "Active" : "In-Active"}
                </StatusText>
              </StatusContainer>
            }
            color="#37926b"
            shadow="#7cbb9f"
            backgroundColor="#ecfdf3"
          />
        </TableCell>
        <TableCell>
          <CellText>{roleList[userData.master_role_id]}</CellText>
        </TableCell>
        <TableCell>
          <CellText>{userData.email}</CellText>
        </TableCell>
        <TableCell>
          <TeamContainer>
            {userData.teams.slice(0, 3).map((team: string, index) => {
              return (
                <ButtonCell
                  key={index}
                  text={team}
                  color="#967dd5"
                  shadow="#c8b8e9"
                  backgroundColor="#f9f5ff"
                />
              );
            })}
            {userData.teams.length > 4 && (
              <ButtonCell
                text={`+${userData.teams.length - 3}`}
                color="#4e596a"
                shadow="#a8aeb7"
                backgroundColor="#f2f4f7"
              />
            )}
          </TeamContainer>
        </TableCell>
        <TableCell>
          <ActionButtonContainer>
            <ActionButton onClick={() => onDeleteHandler(userData.user_id)}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ fontSize: "1.3rem" }}
              />
            </ActionButton>
            <ActionButton onClick={() => onEditHandler(userData)}>
              <FontAwesomeIcon
                icon={faPencil}
                style={{ fontSize: "1.3rem" }}
              />
            </ActionButton>
          </ActionButtonContainer>
        </TableCell>
      </TableRowContainer>
    );
  }
);

export default TableRow;

const ActionButton = styled.button`
  width: fit-content;
  color: #7e8798;
  border: none;
  background-color: #ffffff;
  &:hover {
    color: #9a57fb;
  }
`;

const CellText = styled.p`
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
`;

const TableRowContainer = styled.tr`
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 15rem 7rem 11rem 1fr 15rem auto;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 1.3rem;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: fit-content;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const Circle = styled.div`
  width: 0.4rem;
  height: 0.4rem;
  background-color: #37926b;
  border-radius: 50%;
  align-self: center;
`;

const StatusContainer = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const StatusText = styled.p`
  padding: 0;
  margin: 0;
  align-self: center;
  font-size: inherit;
`;
