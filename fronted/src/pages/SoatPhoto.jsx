import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../assets/Colors";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import AddPhoto from '../components/common/AddPhoto';
import CarIcon from '../assets/AddPhoto.png';

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
  min-width: 380px;
  border: 1px solid ${Colors.primary};
`;

const Title = styled.h1`
  color: ${Colors.primary};
  font-size: 24px;
  margin-bottom: 25px;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 15px;
`;

const SoatPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Title>¡Agrega una foto de tu SOAT vigente! </Title>

        <AddPhoto onPhotoSelect={setPhoto} icon={CarIcon} />

        <ButtonsRow>
          <Button text="Anterior" $primary onClick={() => navigate("/car-photo")} />
          <Button text="Siguiente" onClick={() => navigate("/home")} />
        </ButtonsRow>
      </Card>
    </PageWrapper>
  );      
};

export default SoatPhoto;
