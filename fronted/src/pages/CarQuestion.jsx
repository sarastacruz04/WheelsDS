import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../assets/Colors";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

// --- Estilos ---
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.pageBackground};
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Card = styled.div`
  background-color: ${Colors.white};
  padding: 50px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 350px;
  border: 1px solid ${Colors.primary};

  @media (max-width: 768px) {
    padding: 30px 20px;
    width: 100%;
    min-width: unset;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Title = styled.h2`
  color: ${Colors.primary};
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const Options = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
`;

const OptionLabel = styled.label`
  font-size: 16px;
  color: ${Colors.primary};
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CarQuestion = () => {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Evita que alguien entre directo a esta ruta sin haberse registrado
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
  }, [navigate]);

  const handleNext = () => {
    if (!answer) {
      alert("Por favor selecciona una opción antes de continuar.");
      return;
    }

    if (answer === "si") {
      navigate("/register-car"); // Ir a registrar carro
    } else {
      navigate("/home"); // Saltar al home si no quiere registrar carro
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Title>¿Quieres registrar un carro?</Title>

        <Options>
          <OptionLabel>
            <input
              type="radio"
              name="carro"
              value="no"
              checked={answer === "no"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            No
          </OptionLabel>

          <OptionLabel>
            <input
              type="radio"
              name="carro"
              value="si"
              checked={answer === "si"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            Sí
          </OptionLabel>
        </Options>

        <Button text="Siguiente" $primary onClick={handleNext} />
      </Card>
    </PageWrapper>
  );
};

export default CarQuestion;
