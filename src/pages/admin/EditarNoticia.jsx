import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const CATEGORIAS = ["ANIME", "CINE", "ESPECTÁCULO", "GAMING", "SERIES"];

export default function EditarNoticia() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase.from("noticias").select("*").eq("id", id).single();
      setForm(data);
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleGuardar = async () => {
    setLoading(true);
    let imagen_url = form.imagen_url;

    if (imagen) {
      const ext = imagen.name.split(".").pop();
      const nombre = `${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("imagenes").upload(nombre, imagen);
      if (!error) {
        const { data: urlData } = supabase.storage.from("imagenes").getPublicUrl(nombre);
        imagen_url = urlData.publicUrl;
      }
    }

    await supabase.from("noticias").update({
      titulo: form.titulo,
      resumen: form.resumen,
      contenido: form.contenido,
      categoria: form.categoria,
      autor: form.autor,
      destacado: form.destacado,
      publicado: form.publicado,
      imagen_url,
    }).eq("id", id);

    setLoading(false);
    setExito(true);
    setTimeout(() => window.location.href = "/admin/dashboard", 1500);
  };

  const input = { width: "100%", padding: "12px", background: "#1a1a2e", border: "1px solid #333", borderRadius: "4px", color: "#fff", fontSize: "14px", boxSizing: "border-box", marginBottom: "16px", fontFamily: "sans-serif" };

  if (!form) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", color: "#555" }}>
      Cargando...
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "sans-serif" }}>
      <header style={{ background: "#0f0f1a", borderBottom: "1px solid #1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#ff6b35", fontSize: "22px" }}>Editar Noticia</h1>
        <a href="/admin/dashboard" style={{ color: "#888", fontSize: "13px", textDecoration: "none" }}>← Volver</a>
      </header>

      <main style={{ padding: "32px", maxWidth: "700px", margin: "0 auto" }}>
        {exito && <div style={{ background: "#1a3a1a", color: "#4caf50", padding: "12px", borderRadius: "4px", marginBottom: "16px" }}>✓ Noticia actualizada correctamente</div>}

        {/* Imagen actual */}
        {form.imagen_url && (
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px", letterSpacing: "1px" }}>IMAGEN ACTUAL</p>
            <img src={form.imagen_url} alt="actual" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px", border: "1px solid #333" }} />
          </div>
        )}

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>TÍTULO *</label>
        <input name="titulo" value={form.titulo || ""} onChange={handleChange} style={input} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>RESUMEN</label>
        <textarea name="resumen" value={form.resumen || ""} onChange={handleChange} rows={3} style={{ ...input, resize: "vertical" }} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>CONTENIDO</label>
        <textarea name="contenido" value={form.contenido || ""} onChange={handleChange} rows={8} style={{ ...input, resize: "vertical" }} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>CATEGORÍA</label>
        <select name="categoria" value={form.categoria || ""} onChange={handleChange} style={input}>
          {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>AUTOR</label>
        <input name="autor" value={form.autor || ""} onChange={handleChange} style={input} />

        <label style={{ fontSize: "12px", color: "#888", letterSpacing: "1px" }}>CAMBIAR IMAGEN</label>
        <input type="file" accept="image/*" onChange={e => setImagen(e.target.files[0])} style={{ ...input, padding: "8px" }} />

        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
            <input type="checkbox" name="destacado" checked={form.destacado || false} onChange={handleChange} />
            Noticia destacada
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px" }}>
            <input type="checkbox" name="publicado" checked={form.publicado || false} onChange={handleChange} />
            Publicada
          </label>
        </div>

        <button onClick={handleGuardar} disabled={loading || !form.titulo} style={{ width: "100%", padding: "14px", background: "#4ecdc4", border: "none", borderRadius: "4px", color: "#0a0a0f", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}>
          {loading ? "Guardando..." : "✓ Guardar Cambios"}
        </button>
      </main>
    </div>
  );
}