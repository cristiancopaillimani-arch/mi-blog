import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Dashboard() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    const { data } = await supabase
      .from("noticias")
      .select("*")
      .order("created_at", { ascending: false });
    setNoticias(data || []);
    setLoading(false);
  };

  const togglePublicado = async (id, publicado) => {
    await supabase.from("noticias").update({ publicado: !publicado }).eq("id", id);
    cargarNoticias();
  };

  const eliminar = async (id) => {
    if (confirm("¿Eliminar esta noticia?")) {
      await supabase.from("noticias").delete().eq("id", id);
      cargarNoticias();
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  const btn = (bg, color, txt, onClick) => (
    <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: "4px", border: "none", cursor: "pointer", fontSize: "12px", background: bg, color, fontWeight: 600, fontFamily: "sans-serif" }}>
      {txt}
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "sans-serif" }}>
      <header style={{ background: "#0f0f1a", borderBottom: "1px solid #1a1a2e", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "Georgia, serif", color: "#ff6b35", fontSize: "22px" }}>NexusMedia — Admin</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="/admin/nueva" style={{ background: "#ff6b35", color: "#fff", padding: "8px 20px", borderRadius: "4px", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>
            + Nueva Noticia
          </a>
          <button onClick={cerrarSesion} style={{ background: "none", border: "1px solid #333", color: "#888", padding: "8px 20px", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main style={{ padding: "32px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "24px", color: "#aaa" }}>
          {loading ? "Cargando..." : `${noticias.length} noticias en total`}
        </h2>

        {noticias.map(n => (
          <div key={n.id} style={{ background: "#0f0f1a", border: "1px solid #1a1a2e", borderRadius: "8px", padding: "20px", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "10px", background: "#1a1a2e", color: "#ff6b35", padding: "3px 10px", borderRadius: "2px", letterSpacing: "1px" }}>
                  {n.categoria}
                </span>
                {n.destacado && <span style={{ fontSize: "10px", background: "#2a1a0a", color: "#f7c948", padding: "3px 10px", borderRadius: "2px" }}>⭐ DESTACADA</span>}
              </div>
              <h3 style={{ fontSize: "15px", color: "#e8e8f0" }}>{n.titulo}</h3>
              <p style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>{n.created_at?.slice(0, 10)}</p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              {btn(n.publicado ? "#1a3a1a" : "#3a1a1a", n.publicado ? "#4caf50" : "#ff4444", n.publicado ? "✓ Publicado" : "✗ Borrador", () => togglePublicado(n.id, n.publicado))}
              {btn("#1a1a3a", "#4ecdc4", "✏ Editar", () => window.location.href = `/admin/editar/${n.id}`)}
              {btn("none", "#888", "🗑 Eliminar", () => eliminar(n.id))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}