import React from 'react';
import styled from 'styled-components';
import Colors from '../../assets/Colors';

const StyledButton = styled.button`
  background-color: ${({ $primary }) =>
    $primary ? Colors.primary : 'transparent'};
  color: ${({ $primary }) =>
    $primary ? Colors.white : Colors.primary};
  border: 2px solid ${Colors.primary};
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const Button = ({ text, $primary, onClick, type }) => {
  return (
    <StyledButton $primary={$primary} onClick={onClick} type={type}>
      {text}
    </StyledButton>
  );
};

export default Button;
