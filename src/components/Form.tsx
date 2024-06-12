import { useContext, useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { ButtonContainer } from "./PopUp";
import Button from "./Button";
import { RoleContext } from "../Context/ContextData";
import { UserProps } from "./TableRow";

const Form = ({
  formData,
  onCancelHandler,
  onSubmitHandler,
}: {
  formData: UserProps;
  onCancelHandler: Function;
  onSubmitHandler: Function;
}) => {
  const [formValues, setFormValues] = useState<UserProps>({ ...formData });
  const [selectedRole, setSelectedRole] = useState<number>(
    formData.master_role_id
  );
  const { roleList } = useContext(RoleContext);
  return (
    <FormContainer>
      <FromHeader>Edit User Details</FromHeader>
      <FormFieldContainer>
        <FormField>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            type={"text"}
            onChangeHandler={(e) => {
              return setFormValues((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
            id="name"
            value={formValues.name}
          />
        </FormField>
        <FormField>
          <FieldLabel htmlFor="role">User Role</FieldLabel>
          <Dropdown
            roles={roleList}
            onSelectRole={(id: number) => {
              setSelectedRole(id);
              setFormValues((prev) => {
                return { ...prev, master_role_id: id };
              });
            }}
            selectedRoleId={selectedRole}
          />
        </FormField>
        <FormField>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            type={"text"}
            onChangeHandler={(e) => {
              return setFormValues((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            value={formValues.email}
            id={"email"}
          />
        </FormField>
      </FormFieldContainer>
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
            onSubmitHandler(formValues);
          }}
          buttonType={"regular"}
          color="#d9cef2"
          backgroundColor="#7f5bd6"
        />
      </ButtonContainer>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FromHeader = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 500;
`;

const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  gap: 0.8rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  width: 100%;
  font-size: 0.9rem;
  color: #3b4759;
  text-shadow: 0 0 2px #cbced3;
`;

export default Form;
