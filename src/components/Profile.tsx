import styled from "styled-components";

interface ProfileProps {
  avatar: string;
  name: string;
  userName: string;
}
const Profile = ({ avatar, name, userName }: ProfileProps) => {
  return (
    <ProfileContainer>
      <ProfileImage src={avatar} />
      <ProfileContent>
        <ProfileName>{name}</ProfileName>
        <ProfileAlias>@{userName}</ProfileAlias>
      </ProfileContent>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
`;

const ProfileImage = styled.img`
  height: 2.5rem;
  display: block;
  border-radius: 50%;
  align-self: center;
  justify-content: center;
`;
const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h4`
  padding: 0;
  margin: 0;
  color: #595e69;
  font-size: 1rem;
  font-weight: 400;
  text-shadow: 0 0 2px #7b7f88;
`;
const ProfileAlias = styled.p`
  margin: 0;
  color: #a2a8b4;
  font-size: 1rem;
  text-shadow: 0 0 2px #c9ccd4;
  padding: 0;
`;

export default Profile;
