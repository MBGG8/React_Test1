import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

function VistaSms() {
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

  const [smsMessage, setSmsMessage] = useState(
    channelMessages.SMS?.message || templates[plantilla]
  );

  const handleSend = () => {
    const updatedMessages = {
      ...channelMessages,
      SMS: smsMessage,
    };

    console.log("Mensajes enviados:", JSON.stringify(updatedMessages, null, 2));

    navigate("/");
  };

  const handleNext = () => {
    const updatedMessages = {
      ...channelMessages,
      SMS: { message: smsMessage },
    };

    const nextChannelIndex = currentChannelIndex + 1;

    if (nextChannelIndex < selectedChannels.length) {
      const nextChannel = selectedChannels[nextChannelIndex];

      const channelRoutes = {
        SMS: "/sms",
        EMAIL: "/correo-electronico",
        WHATSAPP: "/whatsapp",
      };

      if (channelRoutes[nextChannel]) {
        navigate(channelRoutes[nextChannel], {
          state: {
            plantilla,
            selectedChannels,
            currentChannelIndex: nextChannelIndex,
            channelMessages: updatedMessages,
            selectedUser,
          },
        });
      } else {
        console.error("Canal no reconocido:", nextChannel);
      }
    } else {
      console.log(
        "Mensajes enviados:",
        JSON.stringify(updatedMessages, null, 2)
      );
    }
  };

  const handleBack = () => {
    navigate("/canales", {
      state: {
        plantilla,
        selectedChannels,
        currentChannelIndex,
        channelMessages,
        selectedUser,
      },
    });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          Configuración del Mensaje SMS
        </Typography>
        <TextField
          label="Mensaje SMS"
          multiline
          rows={4}
          value={smsMessage}
          onChange={(e) => setSmsMessage(e.target.value)}
          sx={{ width: "100%", mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              color: "black",
              borderColor: "gray",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "#f0f0f0",
              },
              mr: 1,
            }}
          >
            Atrás
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "black", "&:hover": { bgcolor: "black" } }}
            onClick={
              currentChannelIndex === selectedChannels.length - 1
                ? handleSend
                : handleNext
            }
          >
            {currentChannelIndex === selectedChannels.length - 1
              ? "Enviar"
              : "Siguiente"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VistaSms;
