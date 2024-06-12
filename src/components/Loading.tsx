import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingText>Loading ...</LoadingText>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  padding: 1rem;
  margin: auto;
`;

const LoadingText = styled.h3`
  text-align: center;
  background-color: inherit;
  text-shadow: 1px 0px 0px gray;
  font-size: 1.9rem;
  margin: 0;
  font-weight: 300;
`;

export default Loading;
