import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Noticia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);
  const [relacionadas, setRelacionadas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("noticias")
        .select("*")
        .eq("id", id)
        .single();
      setNoticia(data);

      if (data) {
        const { data: rel } = await supabase
          .from("noticias")
          .select("*")
          .eq("categoria", data.categoria)
          .eq("publicado", true)
          .neq("id", id)
          .limit(3);
        setRelacionadas(rel || []);
      }
      setCargando(false);
    };
    cargar();
  }, [id]);

  if (cargando) return (
    <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", border: "3px solid #ff6b35", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "#555", fontFamily: "sans-serif", letterSpacing: "2px", fontSize: "12px" }}>CARGANDO</p>
      </div>
    </div>
  );

  if (!noticia) return (
    <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontFamily: "sans-serif" }}>
      Noticia no encontrada.
    </div>
  );

  const CATEGORIA_COLORS = {
    ANIME: "#ff6b35", CINE: "#4ecdc4", "ESPECTÁCULO": "#ffe66d", GAMING: "#a8ff78", SERIES: "#ff6b9d",
  };
  const color = CATEGORIA_COLORS[noticia.categoria] || "#ff6b35";

  return (
    <div style={{ background: "#080810", minHeight: "100vh", color: "#e8e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: ${color}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-in { animation: fadeIn 0.8s ease forwards; }
        .back-btn:hover { background: rgba(255,107,53,0.15) !important; transform: translateX(-4px); }
        .back-btn { transition: all 0.2s !important; }
        .share-btn:hover { background: rgba(255,255,255,0.1) !important; }
        .share-btn { transition: all 0.2s !important; }
        .rel-card:hover { transform: translateY(-4px); background: #13131f !important; }
        .rel-card { transition: all 0.2s !important; cursor: pointer; }
        .progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, ${color}, #ffe66d); z-index: 999; transition: width 0.1s; }
      `}</style>

      {/* Barra de progreso de lectura */}
      <ProgressBar color={color} />

      {/* Header */}
      <header style={{ position: "fixed", top: "3px", left: 0, right: 0, zIndex: 100, background: "rgba(8,8,16,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Logo */}
          <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", background: `linear-gradient(135deg, ${color}, #ffe66d)`, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: 900, color: "#080810", fontFamily: "Georgia, serif" }}>N</span>
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 900, color: "#e8e8f0", letterSpacing: "-0.5px" }}>
              NEXUS<span style={{ fontWeight: 300, color: "#888" }}>MEDIA</span>
            </span>
          </div>

          {/* Categoría + Volver */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ background: color, color: "#080810", padding: "4px 12px", borderRadius: "2px", fontSize: "10px", letterSpacing: "2px", fontFamily: "sans-serif", fontWeight: 700 }}>
              {noticia.categoria}
            </span>
            <button
              className="back-btn"
              onClick={() => navigate("/")}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif", letterSpacing: "1px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              VOLVER
            </button>
          </div>
        </div>
      </header>

      {/* Hero con imagen */}
      <div style={{ position: "relative", height: "70vh", minHeight: "400px", overflow: "hidden", marginTop: "60px" }}>
        {noticia.imagen_url
          ? <img src={noticia.imagen_url} alt={noticia.titulo} className="fade-in" style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.05)" }} />
          : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, #0f0f1a, #1a1a2e)` }} />
        }
        {/* Gradientes */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,16,0.3) 0%, rgba(8,8,16,0) 30%, rgba(8,8,16,0.7) 70%, rgba(8,8,16,1) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, rgba(8,8,16,0.6), transparent)` }} />
        
        {/* Línea de color en el borde inferior */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {/* Título sobre la imagen */}
        <div className="fade-up" style={{ position: "absolute", bottom: "48px", left: 0, right: 0, maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ background: color, color: "#080810", padding: "4px 14px", borderRadius: "2px", fontSize: "11px", letterSpacing: "3px", fontFamily: "sans-serif", fontWeight: 700 }}>
              {noticia.categoria}
            </span>
            <span style={{ width: "40px", height: "1px", background: color }} />
            <span style={{ fontSize: "12px", color: "#aaa", fontFamily: "sans-serif", letterSpacing: "1px" }}>
              {new Date(noticia.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.15, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
            {noticia.titulo}
          </h1>
        </div>
      </div>

      {/* Contenido principal */}
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Meta info */}
        <div className="fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px", paddingBottom: "24px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `linear-gradient(135deg, ${color}, #1a1a2e)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
              ✍
            </div>
            <div>
              <p style={{ fontFamily: "sans-serif", fontSize: "14px", fontWeight: 600, color: "#e8e8f0" }}>{noticia.autor || "Redacción"}</p>
              <p style={{ fontFamily: "sans-serif", fontSize: "11px", color: "#666", letterSpacing: "1px", marginTop: "2px" }}>
                {new Date(noticia.created_at).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Botones compartir */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["𝕏", "f", "in"].map((red, i) => (
              <button key={i} className="share-btn" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                {red}
              </button>
            ))}
          </div>
        </div>

        {/* Resumen destacado */}
        {noticia.resumen && (
          <div className="fade-up" style={{ position: "relative", padding: "24px 28px", marginBottom: "40px", background: "rgba(255,255,255,0.03)", borderRadius: "4px", borderLeft: `4px solid ${color}` }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontStyle: "italic", color: "#ccc", lineHeight: 1.7 }}>
              "{noticia.resumen}"
            </p>
          </div>
        )}

        {/* Contenido */}
        <div className="fade-up" style={{ fontSize: "17px", color: "#c8c8d8", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.95, whiteSpace: "pre-wrap" }}>
          {noticia.contenido}
        </div>

        {/* Tags */}
        <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[noticia.categoria, "NexusMedia", "Noticias"].map((tag, i) => (
            <span key={i} style={{ padding: "6px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", fontSize: "12px", color: "#888", fontFamily: "sans-serif" }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Ad banner */}
        <div style={{ marginTop: "48px", height: "100px", background: "linear-gradient(135deg, #0f0f1a, #1a1a2e)", border: "1px dashed #333", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: "12px", fontFamily: "sans-serif", letterSpacing: "1px" }}>
          📢 Google AdSense 728×90
        </div>
      </main>

      {/* Noticias relacionadas */}
      {relacionadas.length > 0 && (
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "4px", height: "24px", background: color, borderRadius: "2px" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700 }}>Más de {noticia.categoria}</h2>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {relacionadas.map(rel => (
              <div key={rel.id} className="rel-card" style={{ background: "#0f0f1a", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }} onClick={() => { navigate("/noticia/" + rel.id); window.scrollTo(0, 0); }}>
                {rel.imagen_url
                  ? <img src={rel.imagen_url} alt={rel.titulo} style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }} />
                  : <div style={{ height: "160px", background: "#1a1a2e" }} />
                }
                <div style={{ padding: "16px" }}>
                  <span style={{ background: color, color: "#080810", padding: "2px 8px", borderRadius: "2px", fontSize: "9px", letterSpacing: "2px", fontFamily: "sans-serif", fontWeight: 700 }}>
                    {rel.categoria}
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, marginTop: "10px", lineHeight: 1.4, color: "#e8e8f0" }}>
                    {rel.titulo}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#666", marginTop: "6px", fontFamily: "sans-serif" }}>
                    {rel.created_at?.slice(0, 10)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px", textAlign: "center" }}>
        <span onClick={() => navigate("/")} style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 900, background: `linear-gradient(90deg, ${color}, #ffe66d)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" }}>
          NEXUSMEDIA
        </span>
        <p style={{ fontSize: "11px", color: "#444", marginTop: "8px", fontFamily: "sans-serif", letterSpacing: "1px" }}>
          © {new Date().getFullYear()} NexusMedia
        </p>
      </footer>
    </div>
  );
}

function ProgressBar({ color }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(pct);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="progress-bar" style={{ width: `${progress}%` }} />;
}