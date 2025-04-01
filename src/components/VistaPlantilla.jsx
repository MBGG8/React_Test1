import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FormControl,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from "@mui/material";

function VistaPlantilla() {
  const [selectedValue, setSelectedValue] = useState("invitacion");
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedUser } = location.state || {
    selectedUser: "Usuario no especificado",
  };

  const handleNext = () => {
    navigate("/canales", { state: { plantilla: selectedValue, selectedUser } });
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
          borderRadius: 0,
          boxShadow: 3,
          width: 400,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Hola {selectedUser}, elige una Plantilla
        </Typography>
        <FormControl fullWidth>
          <RadioGroup
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <FormControlLabel
              value="invitacion"
              control={<Radio sx={{ color: "black" }} />}
              label="Invitación"
            />
            <FormControlLabel
              value="recordatorio"
              control={<Radio sx={{ color: "black" }} />}
              label="Recordatorio"
            />
            <FormControlLabel
              value="personalizado"
              control={<Radio sx={{ color: "black" }} />}
              label="Personalizado"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
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
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VistaPlantilla;
