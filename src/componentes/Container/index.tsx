import { ReactNode } from "react";
import styled from "styled-components";

type ContainerProps = { title: string; children: ReactNode };

export const Container = ({ title, children }: ContainerProps) => {
  return (
    <Wrapper>
      <TitleStyle>{title}</TitleStyle>
      {children}
    </Wrapper>
  );
};

const TitleStyle = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px 18px;
`;
