import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

function VistaCorreoElectronico() {
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

  const channelRoutes = {
    SMS: "/sms",
    EMAIL: "/correo-electronico",
    WHATSAPP: "/whatsapp",
  };

  const templates = {
    invitacion: {
      subject: `Invitación al proceso de [nombre del proceso]`,
      message: `Estimado/a ${selectedUser},Queremos invitarte al proceso de [nombre del proceso] el [fecha] a las [hora].Saludos,[Empresa]`,
    },
    recordatorio: {
      subject: `Recordatorio del proceso de [nombre del proceso]`,
      message: `Estimado/a ${selectedUser},Te recordamos que el proceso será el [fecha] a las [hora].Saludos,[Empresa]`,
    },
    personalizado: { subject: "", message: "" },
  };

  const [emailSubject, setEmailSubject] = useState(
    channelMessages.EMAIL?.subject || templates[plantilla].subject
  );
  const [emailMessage, setEmailMessage] = useState(
    channelMessages.EMAIL?.message || templates[plantilla].message
  );

  const handleSend = () => {
    const updatedMessages = {
      ...channelMessages,
      EMAIL: { subject: emailSubject, message: emailMessage },
    };

    console.log("Mensajes enviados:", JSON.stringify(updatedMessages, null, 2));

    navigate("/");
  };

  const handleNext = () => {
    const updatedMessages = {
      ...channelMessages,
      EMAIL: { subject: emailSubject, message: emailMessage },
    };

    const nextChannelIndex = currentChannelIndex + 1;

    if (nextChannelIndex < selectedChannels.length) {
      const nextChannel = selectedChannels[nextChannelIndex];

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
          Configuración del Correo Electrónico
        </Typography>
        <TextField
          label="Asunto"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          sx={{ width: "100%", mb: 2 }}
        />
        <TextField
          label="Mensaje"
          multiline
          rows={4}
          value={emailMessage}
          onChange={(e) => setEmailMessage(e.target.value)}
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

export default VistaCorreoElectronico;
