// HomeDriver.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../assets/Colors.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import profilePhoto from '../../assets/ProfilePhoto.png';
import iconHome from "../../assets/Home.png";
import iconReservedTravel from "../../assets/ReservedTravel.png";
import iconCurrentTravel from "../../assets/CurrentTravel.png";

// --- Estilos ---
const HomeContainer = styled.div`
  background-color: ${colors.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px 40px 0;
  background-color: ${colors.white};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 20px 40px;
  background-color: #f0f4f7;

  @media (max-width: 768px) {
    padding: 20px;
    padding-bottom: 80px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  height: 45px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${colors.details};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background: ${colors.white};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
  width: 150px;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${colors.text};
  font-size: 14px;
  border-bottom: 1px solid #eee;

  &:hover {
    background-color: ${colors.background};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const SwitchButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.details};
  }
`;

const NavMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 25px;
  border-bottom: 2px solid ${colors.details};
  padding-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? colors.primary : colors.text)};
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: ${colors.primary};
  }
`;

const GreetingLeft = styled.h2`
  color: ${colors.text};
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const GreetingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.white};
  padding: 15px 25px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
`;

const CreateButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: ${colors.details};
    transform: scale(1.03);
  }
`;

const ModalOverlay = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${colors.white};
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
  color: ${colors.text};
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const SubmitButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${colors.details};
  }
`;

function HomeDriver() {
  const [userName, setUserName] = useState("Conductor");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const [departureTime, setDepartureTime] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [price, setPrice] = useState('');
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.nombre) {
      setUserName(`${storedUser.nombre} ${storedUser.apellido || ""}`);
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.trips) setTrips(storedUser.trips);
  }, [activeTab]);

  // ✅ FUNCIÓN ACTUALIZADA → Próximo viaje usando trips locales
  const getNextTrip = () => {
    if (!trips.length) return null;
    const now = new Date();

    const upcomingTrips = trips
      .map(t => {
        const [hours, minutes] = t.departureTime.split(":").map(Number);
        const tripDate = new Date();
        tripDate.setHours(hours, minutes, 0, 0);
        return { ...t, tripDate };
      })
      .filter(t => t.tripDate >= now);

    if (!upcomingTrips.length) return null;

    upcomingTrips.sort((a, b) => a.tripDate - b.tripDate);

    return upcomingTrips[0];
  };

  // ✅ NUEVA FUNCIÓN → Eliminar viaje
  const handleDeleteTrip = (index) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.trips) return;

    const updatedTrips = [...storedUser.trips];
    updatedTrips.splice(index, 1);
    storedUser.trips = updatedTrips;

    localStorage.setItem("user", JSON.stringify(storedUser));
    setTrips(updatedTrips);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?._id) return alert("Usuario no encontrado 😢");

    const tripData = {
      userId: storedUser._id,
      departureTime,
      fromLocation,
      toLocation,
      price: Number(price),
    };

    try {
      const res = await fetch("https://proyecto5-vs2l.onrender.com/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "No se pudo crear el tramo 😢");

      const updatedUser = { ...storedUser };
      updatedUser.trips = [...(storedUser.trips || []), data];
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setTrips(updatedUser.trips); // actualizar trips inmediatamente

      alert("Tramo creado correctamente 🚗");

      setDepartureTime('');
      setFromLocation('');
      setToLocation('');
      setPrice('');
      setShowModal(false);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <HomeContainer>
        <HeaderContainer>
          <LeftSection>
            <Logo src={logo} alt="Campus GO Logo" />
          </LeftSection>

          <ProfileContainer>
            <ProfileImage
              src={profilePhoto}
              alt="Foto de perfil"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <SwitchButton onClick={() => navigate('/home')}>
              Cambiar a Pasajero
            </SwitchButton>
            <DropdownMenu open={menuOpen}>
              <DropdownItem onClick={() => navigate('/profile')}>Ver perfil</DropdownItem>
              <DropdownItem onClick={() => navigate('/edit-profile')}>Editar datos</DropdownItem>
            </DropdownMenu>
          </ProfileContainer>
        </HeaderContainer>

        <NavMenu>
          <NavButton $active={activeTab === "home"} onClick={() => setActiveTab("home")}>
            <img src={iconHome} alt="home" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
            Inicio
          </NavButton>
          <NavButton $active={activeTab === "reserved"} onClick={() => setActiveTab("reserved")}>
            <img src={iconReservedTravel} alt="reserved" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
            Viajes creados
          </NavButton>
          <NavButton $active={activeTab === "current"} onClick={() => setActiveTab("current")}>
            <img src={iconCurrentTravel} alt="current" style={{ width: "18px", height: "18px", marginRight: "8px" }} />
            Viaje actual
          </NavButton>
        </NavMenu>

        <ContentWrapper>
          {activeTab === "home" && (
            <GreetingContainer>
              <GreetingLeft>¡Hola {userName || "Conductor"}! 🚗</GreetingLeft>
              <CreateButton onClick={() => setShowModal(true)}>+ Crear tramo</CreateButton>
            </GreetingContainer>
          )}

          {activeTab === "reserved" && (
            <>
              <h3 style={{ textAlign: "center", color: colors.text, marginBottom: "20px" }}>
                📋 Tus viajes creados
              </h3>

              {trips.length === 0 ? (
                <p style={{ textAlign: "center", color: colors.text }}>Aún no has creado viajes 😢</p>
              ) : (
                trips.map((trip, index) => (
                  <div key={index} style={{ 
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div>
                      <p><strong>Desde:</strong> {trip.fromLocation}</p>
                      <p><strong>Hasta:</strong> {trip.toLocation}</p>
                      <p><strong>Hora:</strong> {trip.departureTime}</p>
                      <p><strong>Precio:</strong> ${trip.price}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteTrip(index)} 
                      style={{
                        backgroundColor: colors.details,
                        color: colors.white,
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      Borrar
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === "current" && (() => {
            const nextTrip = getNextTrip();
            return (
              <>
                <h3 style={{ textAlign: "center", color: colors.text, marginBottom: "20px" }}>
                  🛣️ Tu viaje más próximo
                </h3>

                {!nextTrip ? (
                  <p style={{ textAlign: "center", color: colors.text }}>No hay viajes próximos 😢</p>
                ) : (
                  <div style={{
                    background: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}>
                    <p><strong>Desde:</strong> {nextTrip.fromLocation}</p>
                    <p><strong>Hasta:</strong> {nextTrip.toLocation}</p>
                    <p><strong>Hora:</strong> {nextTrip.departureTime}</p>
                    <p><strong>Precio:</strong> ${nextTrip.price}</p>
                  </div>
                )}
              </>
            );
          })()}
        </ContentWrapper>
      </HomeContainer>

      <ModalOverlay open={showModal}>
        <ModalContent>
          <h2>Crear nuevo tramo 🚗</h2>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Hora de salida</Label>
              <Input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label>Desde</Label>
              <Input type="text" value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label>Hasta</Label>
              <Input type="text" value={toLocation} onChange={(e) => setToLocation(e.target.value)} required />
            </FormGroup>
            <FormGroup>
              <Label>Precio</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </FormGroup>
            <SubmitButton type="submit">Crear tramo</SubmitButton>
          </form>
          <CreateButton onClick={() => setShowModal(false)} style={{ marginTop: '10px', width: '100%' }}>Cerrar</CreateButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}

export default HomeDriver;
