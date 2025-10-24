// src/pages/RegisterCar.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../assets/Colors";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeedbackModal from "../components/common/FeedbackModal";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${Colors.pageBackground};
`;

const Card = styled.div`
  background-color: ${Colors.white};
  padding: 40px 60px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 380px;
  border: 1px solid ${Colors.primary};
`;

const Title = styled.h2`
  color: ${Colors.primary};
  font-size: 24px;
  margin-bottom: 25px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1.8px solid ${Colors.primary};
  border-radius: 6px;
  font-size: 15px;
  margin-bottom: 15px;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const RegisterCar = () => {
  const [placa, setPlaca] = useState("");
  const [cupos, setCupos] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalDetails, setModalDetails] = useState("");
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");

    if (!email) {
      setModalType("no");
      setModalMessage("Error");
      setModalDetails("No se encontró el usuario actual.");
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${email}`,
        {
          carro: {
            placa: placa.trim(),
            cupos: Number(cupos),
            marca: marca.trim(),
            modelo: modelo.trim(),
          },
        }
      );

      setModalType("yes");
      setModalMessage("Carro registrado");
      setModalDetails(response.data.message);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      setModalType("no");
      setModalMessage("Error al registrar carro");
      setModalDetails(
        error.response?.data?.message || "Intenta nuevamente más tarde."
      );
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalType === "yes") navigate("/car-photo");
  };

  return (
    <PageWrapper>
      <Card>
        <Title>¡Registra tu carro!</Title>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Input
            type="text"
            placeholder="Placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Cupos"
            value={cupos}
            onChange={(e) => setCupos(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />

          <Button text="Siguiente" $primary type="submit" />
        </form>
      </Card>

      {showModal && (
        <FeedbackModal
          type={modalType}
          message={modalMessage}
          details={modalDetails}
          onClose={handleCloseModal}
        />
      )}
    </PageWrapper>
  );
};

export default RegisterCar;
