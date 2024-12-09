import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EnviarRoteiro from "./pages/Roteiro/Enviar";
import ConsultarStatus from "./pages/Roteiro/Consultar";
import { isAuthenticated } from "./services/authService";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enviar-roteiro" element={<EnviarRoteiro />} />
      <Route path="/consultar-status" element={<ConsultarStatus />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);
