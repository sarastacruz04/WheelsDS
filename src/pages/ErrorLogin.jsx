import React from "react";
import styled from "styled-components";
import Colors from "../assets/Colors";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import Button from "../components/common/Button";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.pageBackground};
`;

const Card = styled.div`
  background-color: ${Colors.white};
  padding: 50px 60px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 350px;
  border: 1px solid ${Colors.primary};
  text-align: center;
`;

const IconContainer = styled.div`
  font-size: 60px;
  color: red;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: ${Colors.primary};
  font-size: 24px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  color: #333;
  font-size: 16px;
  margin-bottom: 30px;
`;

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Card>
        <IconContainer>
          <FaTimesCircle />
        </IconContainer>
        <Title>ERROR</Title>
        <Message>
          Hubo un error al intentar iniciar sesión. <br />
          Intenta nuevamente
        </Message>
        <Button text="Volver" $primary onClick={() => navigate("/login")} />
      </Card>
    </PageWrapper>
  );
};

export default ErrorPage;
