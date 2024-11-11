import { HTMLAttributes } from "react";
import styled from "styled-components";

type InputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
} & HTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  ...props
}: InputProps) => {
  return (
    <Wrapper>
      <LabelStyle>{label}</LabelStyle>
      <InputStyle
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </Wrapper>
  );
};

const InputStyle = styled.input`
  border: 1px solid black;
  outline: none;
  padding: 12px;
  border-radius: 2px;
`;

const LabelStyle = styled.label`
  font-size: 18px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
`;
