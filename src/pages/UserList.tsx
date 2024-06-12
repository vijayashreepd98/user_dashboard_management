import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ButtonCell from "../components/ButtonCell";
import Button from "../components/Button";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import PopUp from "../components/PopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import Form from "../components/Form";
import { ModelContext, RoleContext, UserContext } from "../Context/ContextData";
import Loading from "../components/Loading";
import { deleteUser, deleteUsersById, updateUser } from "../apis/user";
import { UserProps } from "../components/TableRow";

const UserList = () => {
  const {
    userData,
    error: userError,
    isLoading: userLoading,
    setCurrentPage,
    currentPage,
    setSearchText,
    checkboxIds,
    setCheckboxIds,
    forceLoad,
  } = useContext(UserContext);
  const { isLoading: roleLoading } = useContext(RoleContext);
  const { isModelOpen, setIsModelOpen } = useContext(ModelContext);
  const [popUpMessage, setPopUpMessage] = useState<{
    popUpType: "info" | "confirmation" | "form";
    message: string;
    data: UserProps;
  }>({
    popUpType: "info",
    message: "",
    data: {
      user_id: 0,
      avatar: "",
      name: "",
      user_name: "",
      is_active: false,
      email: "",
      master_role_id: 0,
      teams: [],
    },
  });
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  useEffect(() => {
    if (userError.is_error)
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "info",
        message: userError.error_message,
      });
  }, [userError]);

  async function confirmToDelete() {
    try {
      if (popUpMessage.data.user_id) {
        await deleteUser(popUpMessage.data.user_id);
        setPopUpMessage({
          ...popUpMessage,
          popUpType: "info",
          message: "User successfully deleted!",
        });
      } else {
        let payload = {};
        if (checkboxIds.length) {
          payload = {
            user_ids: JSON.stringify(checkboxIds),
          };
        }
        if (isCheckedAll) {
          payload = {
            is_delete_all: isCheckedAll,
          };
        }
        await deleteUsersById(payload);
        setPopUpMessage({
          ...popUpMessage,
          popUpType: "info",
          message: "User successfully deleted!",
        });
      }
    } catch (e) {
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "info",
        message: (e as Error).message,
      });
    }
  }
  async function onDeleteHandler() {
    try {
      setIsModelOpen(true);
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "confirmation",
        message: "Are you sure you want to delete this user?",
      });
    } catch (e) {
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "info",
        message: (e as Error).message,
      });
    }
  }

  const onEditHandler = (editUserData: UserProps) => {
    setIsModelOpen(true);
    setPopUpMessage({
      ...popUpMessage,
      popUpType: "form",
      message: "",
      data: editUserData,
    });
  };

  const onDeleteUserHandler = (userId: number) => {
    setIsModelOpen(true);
    setPopUpMessage({
      data: {
        ...popUpMessage.data,
        user_id: userId,
      },
      popUpType: "confirmation",
      message: "Are you sure you want to delete this user?",
    });
  };

  const onUpdateHandler = async (updateData: {
    [key: string]: string | number;
  }) => {
    try {
      const payload = {
        user_id: updateData.user_id,
        user_name: updateData.user_name,
        email: updateData.email,
        master_role_id: updateData.master_role_id,
      };
      await updateUser(payload);
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "info",
        message: "User Details changed!",
      });
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "info",
        message: "User successfully deleted!",
      });
    } catch (e) {
      setPopUpMessage({
        ...popUpMessage,
        popUpType: "info",
        message: (e as Error).message,
      });
    }
  };

  const onCloseOverlay = () => {
    forceLoad();
    setCheckboxIds([]);
    setIsCheckedAll(false);
    setIsModelOpen(false);
  };

  return (
    <PageContainer>
      {isModelOpen && (
        <OverlayContainer
          onClick={() => {
            onCloseOverlay();
          }}
        >
          {popUpMessage.popUpType == "confirmation" ? (
            <PopUp
              popUpcontent={
                <PopUpContentText>{popUpMessage.message} </PopUpContentText>
              }
              onCancelHandler={() => setIsModelOpen(false)}
              onConfirmHandler={() => confirmToDelete()}
            />
          ) : popUpMessage.popUpType == "form" ? (
            <PopUp
              popUpcontent={
                <Form
                  formData={popUpMessage.data}
                  onCancelHandler={() => {}}
                  onSubmitHandler={(updatedUserData: {
                    [key: string]: string | number;
                  }) => {
                    onUpdateHandler(updatedUserData);
                  }}
                />
              }
              popUpType="form"
            />
          ) : (
            <PopUp
              popUpcontent={
                <PopUpContentText>{popUpMessage.message} </PopUpContentText>
              }
              popUpType="info"
              PopUpHeader={
                <PopUpHeader>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ fontSize: "1.5rem" }}
                  />
                </PopUpHeader>
              }
            />
          )}
        </OverlayContainer>
      )}
      <React.Fragment>
        <PageHeader>Team Settings</PageHeader>
        <UserListContainer>
          <UserListHeaderContainer>
            <UserListHeader>Team Members</UserListHeader>
            <ButtonCell text={userData.total_user_count + " users"} />
            <Button
              disabled={checkboxIds.length > 0 || isCheckedAll ? false : true}
              buttonText={"Delete Selected"}
              onClickHandler={() => {
                onDeleteHandler();
              }}
              buttonType={"regular"}
            />
          </UserListHeaderContainer>
          <UserListContentContainer>
            <SearchBar
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            {roleLoading || userLoading ? (
              <Loading />
            ) : (
              <React.Fragment>
                <Table
                  userList={userData.user_list}
                  onDeleteHandler={onDeleteUserHandler}
                  onEditHandler={onEditHandler}
                  setIsCheckedAll={setIsCheckedAll}
                  isCheckedAll={isCheckedAll}
                />
                {userData.user_list.length ? (
                  <Footer>
                    <Pagination
                      pageCount={Math.ceil(userData.user_count / 10)}
                      onPageChange={(page: number) => {
                        setCurrentPage(page);
                      }}
                      currentPage={currentPage}
                    />
                  </Footer>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )}
          </UserListContentContainer>
        </UserListContainer>
      </React.Fragment>
    </PageContainer>
  );
};

const OverlayContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(42, 42, 42, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 2;
`;
const PageContainer = styled.div`
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  background-color: #f4f4f4;
  padding: 1rem 3rem;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;
`;
const PopUpHeader = styled.div`
  padding: 0.6rem;
  align-self: center;
  background-color: #d2f9e0;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #169757;
`;

const PageHeader = styled.h1`
  text-align: left;
  background-color: inherit;
  text-shadow: 1px 0px 0px gray;
  font-size: 1.9rem;
  margin: 0;
`;

const PopUpContentText = styled.h3`
  color: #424954;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.4rem;
  text-align: left;
  margin: 0;
  word-wrap: break-word;
`;

const UserListContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 1rem 0;
  display: flex;
  box-sizing: border-box;
  border-radius: 0.8rem;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.3rem;
  box-shadow: 0px 0px 10px #e4e4e6;
  margin-bottom: 2rem;
`;

const UserListHeaderContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  box-sizing: border-box;
  padding: 0 1.5rem;
  align-items: center;
  & > *:nth-child(3) {
    margin-left: auto;
  }
`;

const UserListHeader = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 1.3rem;
  font-weight: normal;
  text-shadow: 1px 0px 1px black;
`;

const SearchBar = styled.input`
  width: 30%;
  font-size: 0.9rem;
  color: #a2a8b4;
  padding: 7px;
  margin-left: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #f3f4f6;
  background-color: #f4f4f4;
  outline: none;
  &:focus {
    border: 1px solid #9a57fb;
  }
`;

const UserListContentContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Footer = styled.div`
  height: fit-content;
  display: flex;
  margin-top: 10px;
  padding: 0 1.3rem;
  box-sizing: border-box;
  flex-direction: row;
`;

export default UserList;
