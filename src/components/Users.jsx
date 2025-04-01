import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function User() {
  const navigate = useNavigate();

  const users = ["Juan Perez", "Ana Gómez", "Carlos López", "Sofía Martínez"];

  const handleSelectUser = (user) => {
    navigate("/plantilla", { state: { selectedUser: user } });
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
          Selección de Usuario
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user}>
              <ListItemText primary={user} />
              <Button
                variant="contained"
                sx={{ ml: 2, bgcolor: "black", "&:hover": { bgcolor: "#333" } }}
                onClick={() => handleSelectUser(user)}
              >
                Seleccionar
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default User;
