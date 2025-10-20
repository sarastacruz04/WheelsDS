import React, { useState } from 'react';
import styled from 'styled-components';
import Colors from '../assets/Colors';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import AddPhoto from '../components/common/AddPhoto';
import UserIcon from '../assets/ProfilePhoto.png';


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

const AddPhotoProfile = () => {
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Card>
        <Title>Agrega tu foto</Title>

        <AddPhoto onPhotoSelect={setPhoto} icon={UserIcon} />

        <ButtonsRow>
          <Button text="Anterior" $primary onClick={() => navigate('/register')} />
          <Button text="Siguiente" onClick={() => navigate('/car-question')} />
        </ButtonsRow>
      </Card>
    </PageWrapper>
  );
};

export default AddPhotoProfile;