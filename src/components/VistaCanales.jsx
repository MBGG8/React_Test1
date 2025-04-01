import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

function VistaCanales() {
  const location = useLocation();
  const navigate = useNavigate();

  const { plantilla, selectedUser } = location.state || {
    plantilla: "invitacion",
    selectedUser: "Usuario no especificado",
  };

  const [selectedChannels, setSelectedChannels] = useState([]);

  const handleChannelChange = (e) => {
    const { name, checked } = e.target;
    setSelectedChannels((prev) =>
      checked ? [...prev, name] : prev.filter((channel) => channel !== name)
    );
  };

  const handleNext = () => {
    const orderedChannels = ["SMS", "EMAIL", "WHATSAPP"].filter((channel) =>
      selectedChannels.includes(channel)
    );

    const channelRoutes = {
      SMS: "sms",
      EMAIL: "correo-electronico",
      WHATSAPP: "whatsapp",
    };

    if (orderedChannels.length > 0) {
      navigate(`/${channelRoutes[orderedChannels[0]]}`, {
        state: {
          plantilla,
          selectedChannels: orderedChannels,
          currentChannelIndex: 0,
          channelMessages: {},
          selectedUser,
        },
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        component="section"
        sx={{
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: 400,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Selecciona los Canales
        </Typography>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="SMS" onChange={handleChannelChange} />}
              label="SMS"
            />
            <FormControlLabel
              control={<Checkbox name="EMAIL" onChange={handleChannelChange} />}
              label="Correo Electrónico"
            />
            <FormControlLabel
              control={
                <Checkbox name="WHATSAPP" onChange={handleChannelChange} />
              }
              label="WhatsApp"
            />
          </FormGroup>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/plantilla")}
            sx={{
              color: "black",
              borderColor: "gray",
              "&:hover": { borderColor: "black", backgroundColor: "#f0f0f0" },
              mr: 1,
            }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "#333" },
            }}
            onClick={handleNext}
            disabled={selectedChannels.length === 0}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VistaCanales;
