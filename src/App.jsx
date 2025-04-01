import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/Users";
import VistaPlantilla from "./components/VistaPlantilla";
import VistaCanales from "./components/VistaCanales";
import VistaSms from "./components/VistaSms";
import VistaCorreoElectronico from "./components/VistaCorreoElectronico";
import VistaWhatsapp from "./components/VistaWhatsapp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/plantilla" element={<VistaPlantilla />} />
        <Route path="/canales" element={<VistaCanales />} />
        <Route path="/sms" element={<VistaSms />} />
        <Route
          path="/correo-electronico"
          element={<VistaCorreoElectronico />}
        />
        <Route path="/whatsapp" element={<VistaWhatsapp />} />
      </Routes>
    </Router>
  );
}

export default App;
