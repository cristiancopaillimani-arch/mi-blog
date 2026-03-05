import { useState } from "react";
import { supabase } from "../../lib/supabase";

const CATEGORIAS = ["ANIME", "CINE", "ESPECTÁCULO", "GAMING", "SERIES"];

export default function NuevaNoticia() {
  const [form, setForm] = useState({
    titulo: "",
    resumen: "",
    contenido: "",
    categoria: "ANIME",
    autor: "",
    destacado: false,
    publicado: false,
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleImagen = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleGuardar = async () => {
    setLoading(true);
    let imagen_url = "";

    if (imagen) {
      const ext = imagen.name.split(".").pop();
      const nombre = `${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("imagenes")
        .upload(nombre, imagen);
      if (!error) {
        const { data: urlData } = supabase.storage.from("imagenes").getPublicUrl(nombre);
        imagen_url = urlData.publicUrl;
      }
    }

    await supabase.from("noticias").insert([{ ...form, imagen_url }]);
    setLoading(false);
    setExito(true);
    setTimeout(() => window.location.href = "/admin/dashboard", 1500);
  };

  const input = { width: "100%", padding: "12px", background: "#1a1a2e", border: "1px solid #333", borderRadius: "4px", color: "#fff", fontSize: "14px", boxSizing: "border-box", marginBottom: "16px" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "sans-serif" }}>
      <header style={{ background: "#0f0f1a", borderBottom: "1px solid #1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#ff6b35", fontSize: "22px" }}>Nueva Noticia</h1>
        <a href="/admin/dashboard" style={{ color: "#888", fontSize: "13px", textDecoration: "none" }}>← Volver</a>
      </header>

      <main style={{ padding: "32px", maxWidth: "700px", margin: "0 auto" }}>
        {exito && <div style={{ background: "#1a3a1a", color: "#4caf50", padding: "12px", borderRadius: "4px", marginBottom: "16px" }}>✓ Noticia guardada correctamente</div>}

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>TÍTULO *</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título de la noticia" style={input} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>RESUMEN</label>
        <textarea name="resumen" value={form.resumen} onChange={handleChange} placeholder="Breve descripción..." rows={3} style={{ ...input, resize: "vertical" }} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>CONTENIDO</label>
        <textarea name="contenido" value={form.contenido} onChange={handleChange} placeholder="Escribe el contenido completo aquí..." rows={8} style={{ ...input, resize: "vertical" }} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>CATEGORÍA</label>
        <select name="categoria" value={form.categoria} onChange={handleChange} style={input}>
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>AUTOR</label>
        <input name="autor" value={form.autor} onChange={handleChange} placeholder="Nombre del autor" style={input} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>IMAGEN</label>
        <input type="file" accept="image/*" onChange={handleImagen} style={{ ...input, padding: "8px" }} />

        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
            <input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} />
            Noticia destacada
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
            <input type="checkbox" name="publicado" checked={form.publicado} onChange={handleChange} />
            Publicar ahora
          </label>
        </div>

        <button
          onClick={handleGuardar}
          disabled={loading || !form.titulo}
          style={{ width: "100%", padding: "14px", background: "#ff6b35", border: "none", borderRadius: "4px", color: "#fff", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Guardando..." : "Guardar Noticia"}
        </button>
      </main>
    </div>
  );
}