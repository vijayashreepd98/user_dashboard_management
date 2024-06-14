import { useState } from "react";
import styled from "styled-components";

const Pagination = ({
  pageCount = 100,
  onPageChange,
  currentPage = 1,
}: {
  pageCount: number;
  onPageChange: (value: number) => void;
  currentPage: number;
}) => {
  const [order, setOrder] = useState(0);

  const pageNumbers = [];
  for (let i = 4; i < currentPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => {
          onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1);
          setOrder(-1);
        }}
        disabled={currentPage == 1}
      >
        &#x2190; previous
      </PaginationButton>
      <PaginationBar>
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          color={currentPage === 1 ? "#8a69d9" : "#b1b6c0"}
          backgroundColor={currentPage === 1 ? "#f9f5ff" : "#FFFFFF"}
          displayType={pageCount >= 1 ? "block" : "none"}
        >
          1
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(2)}
          disabled={currentPage === 2}
          backgroundColor={currentPage === 2 ? "#f9f5ff" : "#FFFFFF"}
          color={currentPage === 2 ? "#8a69d9" : "#b1b6c0"}
          displayType={pageCount >= 2 ? "block" : "none"}
        >
          2
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(3)}
          disabled={currentPage === 3}
          backgroundColor={currentPage === 3 ? "#f9f5ff" : "#FFFFFF"}
          color={currentPage === 3 ? "#8a69d9" : "#b1b6c0"}
          displayType={pageCount >= 3 ? "block" : "none"}
        >
          {order == 1 && currentPage > 3 && currentPage < pageCount - 2
            ? currentPage
            : 3}
        </PaginationButton>
        {pageCount - 3 > 3 && <Seperator>. &nbsp; . &nbsp; .</Seperator>}
        <PaginationButton
          onClick={() =>
            onPageChange(
              pageCount - 1 == 3
                ? pageCount
                : pageCount - 2 == 3
                ? pageCount - 1
                : pageCount - 2
            )
          }
          disabled={
            currentPage ===
            (pageCount - 1 == 3
              ? pageCount
              : pageCount - 2 == 3
              ? pageCount - 1
              : pageCount - 2)
          }
          backgroundColor={
            currentPage ===
            (pageCount - 1 == 3
              ? pageCount
              : pageCount - 2 == 3
              ? pageCount - 1
              : pageCount - 2)
              ? "#f9f5ff"
              : "#FFFFFF"
          }
          color={
            currentPage ===
            (pageCount - 1 == 3
              ? pageCount
              : pageCount - 2 == 3
              ? pageCount - 1
              : pageCount - 2)
              ? "#8a69d9"
              : "#b1b6c0"
          }
          displayType={pageCount - 4 >= 0 ? "block" : "none"}
        >
          {order == -1 && currentPage > 4 && currentPage < pageCount - 2
            ? currentPage
            : pageCount - 1 == 3
            ? pageCount
            : pageCount - 2 == 3
            ? pageCount - 1
            : pageCount - 2}
        </PaginationButton>
        <PaginationButton
          onClick={() =>
            onPageChange(pageCount - 2 == 3 ? pageCount : pageCount - 1)
          }
          disabled={
            currentPage === (pageCount - 2 == 3 ? pageCount : pageCount - 1)
          }
          backgroundColor={
            currentPage === (pageCount - 2 == 3 ? pageCount : pageCount - 1)
              ? "#f9f5ff"
              : "#FFFFFF"
          }
          color={
            currentPage === (pageCount - 2 == 3 ? pageCount : pageCount - 1)
              ? "#8a69d9"
              : "#b1b6c0"
          }
          displayType={pageCount > 4 ? "block" : "none"}
        >
          {pageCount - 2 == 3 ? pageCount : pageCount - 1}
        </PaginationButton>
        <PaginationButton
          onClick={() => onPageChange(pageCount)}
          disabled={currentPage === pageCount}
          backgroundColor={currentPage === pageCount ? "#f9f5ff" : "#FFFFFF"}
          color={currentPage === pageCount ? "#8a69d9" : "#b1b6c0"}
          displayType={pageCount > 5 ? "block" : "none"}
        >
          {pageCount}
        </PaginationButton>
      </PaginationBar>
      <PaginationButton
        onClick={() => {
          onPageChange(
            currentPage + 1 < pageCount ? currentPage + 1 : pageCount
          );
          setOrder(1);
        }}
        disabled={currentPage == pageCount}
      >
        next &#x2192;
      </PaginationButton>
    </PaginationContainer>
  );
};

interface PageBarButtonProps {
  color?: string;
  backgroundColor?: string;
  displayType?: "none" | "block";
}

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
      @media screen and (max-width: 1200px) {
      padding: 0.7rem 0;
  & > button:first-child {
    width:2rem;
      position: relative;
      visibility: hidden;
      &::after {
        content: '←' !important; 
        position: absolute;
        top: 50%;
        left: 0.8rem;
        font-size:1.2rem;
        transform: translate(0, -50%);
        white-space: nowrap;
        padding:0 !important;
        visibility: visible; /* Ensure the new text is visible */
      };
    };
    & > button:last-child {
    width:2rem;
      position: relative;
      visibility: hidden;
      padding:0;

      &::after {
        content: '→' !important;
        position: absolute;
        top: 50%;
        right:0.8rem;
        padding:0;
        font-size:1.2rem;
        transform: translate(0, -50%);
        white-space: nowrap;
        visibility: visible; 
      }
    }
  }
  }
 
`;

const PaginationBar = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-contents: center;
  @media screen and (max-width: 700px) {
    padding: 0 0.5rem;
    align-items: center;
    gap: 0.7rem;
  }
  @media screen and (max-width: 350px) {
    gap: 0.5rem;
  }
`;

const PaginationButton = styled.button<PageBarButtonProps>`
  padding: 0.3rem 1.1rem;
  border-radius: 0.5rem;
  outline: none;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  font-size: 1rem;
  text-shadow: 0 0 2px #c8cbd0;
  border: 1px ridge #e9ebee;
  color: ${(props) => (props.color ? props.color : "#434e60")};
  box-shadow: 0px 0px 4px #eceef1;
  display: ${(props) => (props.displayType ? props.displayType : "block")};

  &:hover {
    border: 1px solid #8a69d9;
  }
  &:disabled {
    cursor-pointer: none;
    cursor: not-allowed;
  }
  @media screen and (max-width: 700px) {
    padding: 0.3rem 0.3rem;
    height: fit-content;
  }
  @media screen and (max-width: 350px) {
    padding: 0.3rem 0.2rem;
    height: fit-content;
  }
`;

const Seperator = styled.p`
  color: #969caa;
  text-align: center;
  height: auto;
  display: inline-block;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

export default Pagination;
