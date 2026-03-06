import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App.jsx"
import Noticia from "./pages/Noticia.jsx"
import Login from "./pages/admin/Login.jsx"
import Dashboard from "./pages/admin/Dashboard.jsx"
import NuevaNoticia from "./pages/admin/NuevaNoticia.jsx"
import EditarNoticia from "./pages/admin/EditarNoticia.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/noticia/:id" element={<Noticia />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/nueva" element={<NuevaNoticia />} />
        <Route path="/admin/editar/:id" element={<EditarNoticia />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)