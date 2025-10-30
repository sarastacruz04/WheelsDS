import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../assets/Colors";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

// --- Estilos (sin cambios) ---
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.pageBackground};
  padding: 20px;
`;

const Card = styled.div`
  background-color: ${Colors.white};
  padding: 50px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  min-width: 350px;
  border: 1px solid ${Colors.primary};
`;

const Title = styled.h2`
  color: ${Colors.primary};
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
`;

const Options = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
`;

const OptionLabel = styled.label`
  font-size: 16px;
  color: ${Colors.primary};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CarQuestion = () => {
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) navigate("/login");
  }, [navigate]);

  const handleNext = async () => {
    if (!answer) {
      alert("Selecciona una opción para continuar");
      return;
    }

    if (answer === "no") {
      navigate("/home");
      return;
    }

    try {
      const userEmail = localStorage.getItem("userEmail");
      const res = await axios.get(`${API_BASE_URL}/users/${userEmail}`);
      const user = res.data;

      // ✅ Validamos que todos los campos del carro estén completos
      const hasCarComplete =
        user.placa?.trim() &&
        user.marca?.trim() &&
        user.modelo?.trim() &&
        user.cupos > 0;

      if (hasCarComplete) {
        navigate("/home-driver"); // ✅ Ya tiene carro con toda la info
      } else {
        navigate("/register-car"); // ✅ Le falta completar la info del carro
      }

    } catch (error) {
      console.error("❌ Error al revisar datos del carro:", error);
      alert("No se pudo verificar la información del usuario");
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
