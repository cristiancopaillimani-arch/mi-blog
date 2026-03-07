import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

const CATEGORIAS = ["TODAS", "ANIME", "CINE", "ESPECTÁCULO", "GAMING", "SERIES"];

const CAT_COLORS = {
  ANIME: "#ff6b35",
  CINE: "#4ecdc4",
  "ESPECTÁCULO": "#f7c948",
  GAMING: "#7bed9f",
  SERIES: "#ff6b9d",
};

export default function App() {
  const [noticias, setNoticias] = useState([]);
  const [categoria, setCategoria] = useState("TODAS");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("noticias")
        .select("*")
        .eq("publicado", true)
        .order("created_at", { ascending: false });
      setNoticias(data || []);
      setCargando(false);
    };
    cargar();
  }, []);

  const ir = (id) => navigate("/noticia/" + id);

  const filtradas = noticias.filter(n => {
    const matchCat = categoria === "TODAS" || n.categoria === categoria;
    const matchBus = n.titulo?.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBus;
  });

  const destacadas = filtradas.filter(n => n.destacado);
  const normales = filtradas.filter(n => !n.destacado);
  const hero = destacadas[0] || noticias[0];

  return (
    <div style={{ background: "#07070f", minHeight: "100vh", color: "#e8e8f0", fontFamily: "sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #ff6b35; border-radius: 5px; }

        /* NAV */
        .nav-item { color: #aaa; font-size: 13px; letter-spacing: 1.5px; cursor: pointer; font-weight: 500; transition: color 0.2s; text-decoration: none; }
        .nav-item:hover { color: #fff; }

        /* HERO */
        .hero-section { position: relative; height: 92vh; min-height: 500px; overflow: hidden; }
        .hero-img { width: 100%; height: 100%; object-fit: cover; object-position: center; transform: scale(1.04); transition: transform 8s ease; }
        .hero-img:hover { transform: scale(1); }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(7,7,15,0.92) 0%, rgba(7,7,15,0.6) 50%, rgba(7,7,15,0.2) 100%); }
        .hero-overlay2 { position: absolute; inset: 0; background: linear-gradient(to top, rgba(7,7,15,1) 0%, transparent 50%); }

        /* SEARCH BAR */
        .search-bar { display: flex; gap: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .search-input { flex: 1; padding: 14px 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; font-size: 14px; outline: none; backdrop-filter: blur(10px); font-family: 'Inter', sans-serif; }
        .search-input::placeholder { color: rgba(255,255,255,0.4); }
        .search-btn { padding: 14px 24px; background: #ff6b35; border: none; color: #fff; cursor: pointer; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; letter-spacing: 1px; transition: background 0.2s; }
        .search-btn:hover { background: #ff8555; }

        /* CATEGORY PILLS */
        .cat-pill { padding: 8px 18px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.05); color: #aaa; font-size: 12px; font-weight: 600; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; white-space: nowrap; font-family: 'Inter', sans-serif; }
        .cat-pill:hover { border-color: #ff6b35; color: #ff6b35; }
        .cat-pill.active { background: #ff6b35; border-color: #ff6b35; color: #fff; }

        /* CARDS */
        .card { background: #0f0f1c; border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.25s, box-shadow 0.25s; border: 1px solid rgba(255,255,255,0.06); }
        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .card img { width: 100%; height: 200px; object-fit: cover; display: block; transition: transform 0.4s; }
        .card:hover img { transform: scale(1.05); }

        /* CARD GRANDE */
        .card-lg { background: #0f0f1c; border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.25s, box-shadow 0.25s; border: 1px solid rgba(255,255,255,0.06); }
        .card-lg:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .card-lg img { width: 100%; height: 340px; object-fit: cover; display: block; transition: transform 0.4s; }
        .card-lg:hover img { transform: scale(1.03); }

        /* TICKER */
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-inner { display: flex; animation: ticker 35s linear infinite; white-space: nowrap; }
        .ticker-inner:hover { animation-play-state: paused; }

        /* TAG */
        .tag { display: inline-block; padding: 4px 12px; border-radius: 50px; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; font-family: 'Inter', sans-serif; }

        /* MOBILE MENU */
        .mobile-menu { position: fixed; inset: 0; background: rgba(7,7,15,0.98); z-index: 200; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 32px; }

        /* SHIMMER */
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .shimmer { background: linear-gradient(90deg, #0f0f1c 25%, #1a1a2e 50%, #0f0f1c 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 12px; }

        /* FADE */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero-overlay { background: linear-gradient(to top, rgba(7,7,15,1) 0%, rgba(7,7,15,0.7) 50%, rgba(7,7,15,0.3) 100%); }
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hero-content { bottom: 80px !important; }
          .hero-title { font-size: 28px !important; }
        }
        @media (min-width: 769px) {
          .mobile-btn { display: none !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 150, padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(7,7,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        
        {/* Logo */}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg, #ff6b35, #f7c948)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "16px", color: "#07070f" }}>N</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "20px", letterSpacing: "-0.5px" }}>
            NEXUS<span style={{ fontWeight: 300, color: "#666" }}>MEDIA</span>
          </span>
        </div>

        {/* Nav desktop */}
        <div className="desktop-nav" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {CATEGORIAS.slice(1).map(cat => (
            <span key={cat} className="nav-item" onClick={() => { setCategoria(cat); document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" }); }}>
              {cat}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span className="nav-item desktop-nav" onClick={() => navigate("/admin")} style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", padding: "8px 16px", borderRadius: "6px", color: "#ff6b35" }}>
            ADMIN
          </span>
          {/* Botón menú móvil */}
          <button className="mobile-btn" onClick={() => setMenuAbierto(!menuAbierto)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "22px", display: "none" }}>
            {menuAbierto ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="mobile-menu" onClick={() => setMenuAbierto(false)}>
          {CATEGORIAS.map(cat => (
            <span key={cat} style={{ color: "#fff", fontSize: "20px", fontWeight: 600, letterSpacing: "2px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
              onClick={() => { setCategoria(cat); setMenuAbierto(false); }}>
              {cat}
            </span>
          ))}
          <span style={{ color: "#ff6b35", fontSize: "16px", letterSpacing: "2px", cursor: "pointer" }} onClick={() => navigate("/admin")}>ADMIN</span>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero-section">
        <img src="/cya.jpg" alt="Hero" className="hero-img" />
        <div className="hero-overlay" />
        <div className="hero-overlay2" />

        {/* Contenido hero */}
        <div className="hero-content fade-up" style={{ position: "absolute", bottom: "120px", left: 0, right: 0, maxWidth: "680px", padding: "0 32px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ width: "32px", height: "2px", background: "#ff6b35" }} />
            <span style={{ fontSize: "11px", color: "#ff6b35", letterSpacing: "3px", fontWeight: 600 }}>BIENVENIDO A NEXUSMEDIA</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900, lineHeight: 1.15, color: "#fff", textShadow: "0 4px 30px rgba(0,0,0,0.6)", marginBottom: "20px" }}>
            Tu portal de <span style={{ color: "#ff6b35" }}>Anime</span>, Cine<br />& Entretenimiento
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "32px", fontFamily: "'Inter', sans-serif" }}>
            Las últimas noticias del mundo del entretenimiento, directas y sin filtros.
          </p>

          {/* Search bar */}
          <div className="search-bar" style={{ maxWidth: "520px" }}>
            <input
              className="search-input"
              placeholder="Buscar noticias, anime, películas..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              onKeyDown={e => e.key === "Enter" && document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" })}
            />
            <button className="search-btn" onClick={() => document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" })}>
              BUSCAR
            </button>
          </div>
        </div>

        {/* Flecha scroll */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer", opacity: 0.6 }}
          onClick={() => document.getElementById("noticias")?.scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontSize: "11px", color: "#fff", letterSpacing: "2px", fontFamily: "'Inter', sans-serif" }}>EXPLORAR</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ── TICKER ── */}
      {noticias.length > 0 && (
        <div style={{ background: "linear-gradient(90deg, #ff6b35, #f7c948)", padding: "10px 0", overflow: "hidden" }}>
          <div className="ticker-inner">
            {[...noticias, ...noticias].map((n, i) => (
              <span key={i} onClick={() => ir(n.id)} style={{ padding: "0 40px", fontSize: "13px", fontWeight: 600, color: "#07070f", cursor: "pointer", fontFamily: "'Inter', sans-serif", letterSpacing: "0.5px" }}>
                ◆ {n.titulo}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── NOTICIAS ── */}
      <section id="noticias" style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>

        {/* Filtros de categoría */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "48px", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#555", marginRight: "8px", fontWeight: 600, letterSpacing: "1px" }}>FILTRAR:</span>
          {CATEGORIAS.map(cat => (
            <button key={cat} className={`cat-pill ${categoria === cat ? "active" : ""}`} onClick={() => setCategoria(cat)}>
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {cargando && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {[1,2,3,4,5,6].map(i => <div key={i} className="shimmer" style={{ height: "320px" }} />)}
          </div>
        )}

        {/* Sin resultados */}
        {!cargando && filtradas.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "#444" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p style={{ fontSize: "18px", fontFamily: "'Playfair Display', serif" }}>No se encontraron noticias</p>
            <p style={{ fontSize: "13px", color: "#333", marginTop: "8px" }}>Intenta con otra categoría o búsqueda</p>
          </div>
        )}

        {/* Noticia destacada grande */}
        {!cargando && destacadas.length > 0 && (
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "4px", height: "22px", background: "#ff6b35", borderRadius: "2px" }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>Destacadas</h2>
            </div>
            <div className={`grid-2`} style={{ display: "grid", gridTemplateColumns: destacadas.length >= 2 ? "2fr 1fr" : "1fr", gap: "20px" }}>
              {/* Card principal */}
              <div className="card-lg" onClick={() => ir(destacadas[0].id)}>
                {destacadas[0].imagen_url
                  ? <img src={destacadas[0].imagen_url} alt={destacadas[0].titulo} />
                  : <div style={{ height: "340px", background: "linear-gradient(135deg, #1a1a2e, #0f0f1c)" }} />
                }
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span className="tag" style={{ background: CAT_COLORS[destacadas[0].categoria] + "22", color: CAT_COLORS[destacadas[0].categoria], border: `1px solid ${CAT_COLORS[destacadas[0].categoria]}44` }}>
                      {destacadas[0].categoria}
                    </span>
                    <span style={{ fontSize: "11px", color: "#555" }}>{destacadas[0].created_at?.slice(0, 10)}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, lineHeight: 1.3, marginBottom: "10px" }}>
                    {destacadas[0].titulo}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>{destacadas[0].resumen}</p>
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#ff6b35", fontWeight: 600 }}>Leer más →</span>
                  </div>
                </div>
              </div>

              {/* Segunda destacada */}
              {destacadas[1] && (
                <div className="card-lg" onClick={() => ir(destacadas[1].id)}>
                  {destacadas[1].imagen_url
                    ? <img src={destacadas[1].imagen_url} alt={destacadas[1].titulo} style={{ height: "200px" }} />
                    : <div style={{ height: "200px", background: "linear-gradient(135deg, #1a1a2e, #0f0f1c)" }} />
                  }
                  <div style={{ padding: "20px" }}>
                    <span className="tag" style={{ background: CAT_COLORS[destacadas[1].categoria] + "22", color: CAT_COLORS[destacadas[1].categoria], border: `1px solid ${CAT_COLORS[destacadas[1].categoria]}44`, marginBottom: "10px", display: "inline-block" }}>
                      {destacadas[1].categoria}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, lineHeight: 1.35, marginTop: "8px" }}>
                      {destacadas[1].titulo}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#666", marginTop: "8px", fontFamily: "'Inter', sans-serif" }}>{destacadas[1].resumen?.slice(0, 100)}...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Grid de noticias normales */}
        {!cargando && normales.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "4px", height: "22px", background: "#4ecdc4", borderRadius: "2px" }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>Últimas Noticias</h2>
            </div>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {normales.map((n, i) => (
                <div key={n.id} className="card fade-up" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => ir(n.id)}>
                  {n.imagen_url
                    ? <img src={n.imagen_url} alt={n.titulo} />
                    : <div style={{ height: "200px", background: "linear-gradient(135deg, #1a1a2e, #0f0f1c)" }} />
                  }
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span className="tag" style={{ background: CAT_COLORS[n.categoria] + "22", color: CAT_COLORS[n.categoria], border: `1px solid ${CAT_COLORS[n.categoria]}44` }}>
                        {n.categoria}
                      </span>
                      <span style={{ fontSize: "11px", color: "#444", fontFamily: "'Inter', sans-serif" }}>{n.created_at?.slice(0, 10)}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, lineHeight: 1.35, marginBottom: "8px" }}>
                      {n.titulo}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                      {n.resumen?.slice(0, 100)}{n.resumen?.length > 100 ? "..." : ""}
                    </p>
                    <div style={{ marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "#555", fontFamily: "'Inter', sans-serif" }}>✍ {n.autor}</span>
                      <span style={{ fontSize: "12px", color: "#ff6b35", fontWeight: 600 }}>Leer →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ad banner */}
        <div id="contenedor-7310a52a8a246db3f268fd8b19237e19" style={{ marginTop: "64px" }}></div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#04040a", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "32px", marginBottom: "40px" }}>
            {/* Logo */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg, #ff6b35, #f7c948)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "16px", color: "#07070f" }}>N</div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "20px" }}>NEXUSMEDIA</span>
              </div>
              <p style={{ fontSize: "13px", color: "#444", maxWidth: "240px", lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                Tu portal de noticias de anime, cine, espectáculo y gaming.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: "11px", color: "#ff6b35", letterSpacing: "2px", marginBottom: "16px", fontWeight: 600 }}>CATEGORÍAS</p>
                {CATEGORIAS.slice(1).map(cat => (
                  <p key={cat} onClick={() => setCategoria(cat)} style={{ fontSize: "13px", color: "#555", marginBottom: "8px", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Inter', sans-serif" }}
                    onMouseOver={e => e.target.style.color = "#fff"} onMouseOut={e => e.target.style.color = "#555"}>
                    {cat}
                  </p>
                ))}
              </div>
              <div>
  <p style={{ fontSize: "11px", color: "#ff6b35", letterSpacing: "2px", marginBottom: "16px", fontWeight: 600 }}>LEGAL</p>
  {[
    { label: "Privacidad", ruta: "/privacidad" },
    { label: "Términos", ruta: "/" },
    { label: "Contacto", ruta: "/" },
    { label: "Anunciarse", ruta: "/" },
  ].map(l => (
    <p key={l.label} onClick={() => navigate(l.ruta)} style={{ fontSize: "13px", color: "#555", marginBottom: "8px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
      onMouseOver={e => e.target.style.color = "#fff"} onMouseOut={e => e.target.style.color = "#555"}>
      {l.label}
    </p>
  ))}
</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#333", fontFamily: "'Inter', sans-serif" }}>
              © {new Date().getFullYear()} NexusMedia — Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}