import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Vehicle1 from "./pages/LiveData";
import ProtectedRoute from "./pages/ProtectedRoute";
import "./App.css";
import Graph from "./pages/graph";
import Presentation from "./pages/Presentation";
import VehiclePage from "./pages/VehiclePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* DEFAULT → VEHICLE */}
          <Route index element={<Navigate to="vehicle" replace />} />

          {/* VEHICLE PAGE */}
          <Route path="vehicle" element={<VehiclePage />} />

          {/* PRESENTATION PAGE */}
          <Route path="presentation" element={<Presentation />} />

        </Route>

        {/* <Route path="/vehicle1" element={<Vehicle1 />} />
        <Route path="/graph" element={<Graph />} />
        */}
      </Route>

      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
}
