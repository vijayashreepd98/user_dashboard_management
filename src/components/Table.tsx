import { Dispatch, SetStateAction, useContext, useRef } from "react";
import styled from "styled-components";
import TableRow, { UserProps } from "./TableRow";
import Checkbox from "./Checkbox";
import { UserContext, RoleContext } from "../Context/ContextData";

const Table = ({
  userList,
  onEditHandler,
  onDeleteHandler,
  setIsCheckedAll,
  isCheckedAll,
}: {
  userList: Array<UserProps|any>;
  onEditHandler: (value:UserProps) => void;
  onDeleteHandler: (value:number) => void;
  setIsCheckedAll: Dispatch<SetStateAction<boolean>>;
  isCheckedAll: boolean;
}) => {
  const targetRef = useRef<HTMLTableRowElement>(null);
  const sourceRef = useRef<HTMLTableRowElement>(null);
  const { checkboxIds, setCheckboxIds } = useContext(UserContext);
  const { roleList } = useContext(RoleContext);

  return (
    <TableContainer>
      <TableHeaderContainer>
        <TableHeaderRow ref={targetRef}>
          <TableHeader>
            <TableHeaderCheckbox>
              <Checkbox
                isChecked={isCheckedAll}
                onClickCheckbox={() => {
                  setIsCheckedAll((prev) => !prev);
                }}
              />
            </TableHeaderCheckbox>
          </TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Email Address</TableHeader>
          <TableHeader>Teams</TableHeader>
          <TableHeader></TableHeader>
        </TableHeaderRow>
      </TableHeaderContainer>
      <TableBody>
        {userList.length ? (
          userList.map((user, index) => {
            return (
              <TableRow
                ref={index == 1 ? sourceRef : null}
                userData={user}
                onDeleteHandler={onDeleteHandler}
                onEditHandler={onEditHandler}
                checkboxIds={checkboxIds}
                setCheckboxIds={setCheckboxIds}
                roleList={roleList}
                isCheckedAll={isCheckedAll}
                setIsCheckedAll={setIsCheckedAll}
              />
            );
          })
        ) : (
          <NoDataContainer>No Data Found</NoDataContainer>
        )}
      </TableBody>
    </TableContainer>
  );
};

const TableHeaderCheckbox = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: center;
`;

const TableContainer = styled.table`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  overflow: scroll;
  table-layout: fixed;
  border-bottom: 1px solid #f1f2f5;
`;

const NoDataContainer = styled.div`
  width: 100%;
  padding: 3rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  box-sizing: border-box;
`;
const TableHeader = styled.th`
  text-align: left;
  width: 100%;
  padding: 10px 10px;
  color: #7f8798;
  font-size: 1rem;
  font-weight: normal;
  box-sizing: border-box;
  text-shadow: 0 0 3px rgba(180, 185, 195, 1);
  border-collapse: collapse;
  &:first-child {
    padding: 10px 0px;
  }
`;

const TableHeaderContainer = styled.thead``;

const TableHeaderRow = styled.tr`
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 15rem 7rem 11rem 1fr 15rem 6rem;
  box-sizing: border-box;
  border-bottom: 2px solid #f3f4f7;
  background-color: #f9fafb;
  padding: 0 1.3rem;
`;

const TableBody = styled.tbody`
  width: 100%;
`;

export const TableCell = styled.td`
  height: max-height;
  padding: 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  color: #a2a8b4;
  overflow: hidden;
  text-shadow: 0 0 3px #c9cdd3;
  &:first-child {
    padding: 12px 0;
  }
  &:last-child {
  }
`;

export default Table;
