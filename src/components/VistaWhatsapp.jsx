import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const channelRoutes = {
  SMS: "/sms",
  EMAIL: "/correo-electronico",
  WHATSAPP: "/whatsapp",
};

function VistaWhatsapp() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    plantilla,
    selectedChannels,
    currentChannelIndex,
    channelMessages,
    selectedUser,
  } = location.state || {
    plantilla: "invitacion",
    selectedChannels: [],
    currentChannelIndex: 0,
    channelMessages: {},
    selectedUser: "Usuario no especificado",
  };

  const templates = {
    invitacion: `Hola ${selectedUser}, te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!`,
    recordatorio: `Hola ${selectedUser}, te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!`,
    personalizado: "",
  };

  const [whatsappMessage, setWhatsappMessage] = useState(
    channelMessages.WHATSAPP || templates[plantilla]
  );

  const handleSend = () => {
    const updatedMessages = {
      ...channelMessages,
      WHATSAPP: whatsappMessage,
    };

    console.log("Mensajes enviados:", JSON.stringify(updatedMessages, null, 2));

    navigate("/");
  };

  const handleBack = () => {
    if (currentChannelIndex === 0) {
      navigate("/canales", {
        state: {
          plantilla,
          selectedChannels,
          channelMessages,
          selectedUser,
        },
      });
    } else {
      const previousChannelIndex = currentChannelIndex - 1;
      const previousChannel = selectedChannels[previousChannelIndex];

      if (channelRoutes[previousChannel]) {
        navigate(channelRoutes[previousChannel], {
          state: {
            plantilla,
            selectedChannels,
            currentChannelIndex: previousChannelIndex,
            channelMessages,
            selectedUser,
          },
        });
      } else {
        console.error(
          `No se encontró una ruta válida para el canal: ${previousChannel}`
        );
      }
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
          Configuración del Mensaje de WhatsApp
        </Typography>
        <TextField
          label="Mensaje WhatsApp"
          multiline
          rows={4}
          value={whatsappMessage}
          onChange={(e) => setWhatsappMessage(e.target.value)}
          sx={{ width: "100%", mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
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
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
            onClick={handleSend}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VistaWhatsapp;
