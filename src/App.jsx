import { useState } from "react";

const NOTICIAS = [
  {
    id: 1,
    categoria: "ANIME",
    titulo: "Dragon Ball DAIMA supera los 10 millones de espectadores en su estreno",
    resumen: "La nueva serie de Akira Toriyama rompe récords en streaming y se convierte en el anime más visto del año en Latinoamérica.",
    imagen: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
    autor: "Redacción Otaku",
    fecha: "3 Mar 2026",
    destacado: true,
  },
  {
    id: 2,
    categoria: "CINE",
    titulo: "Avengers: Doomsday ya tiene tráiler oficial y el mundo explota en redes",
    resumen: "Marvel Studios sorprendió a todos con un tráiler cargado de referencias y el regreso de personajes icónicos del MCU.",
    imagen: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80",
    autor: "CineFreak",
    fecha: "2 Mar 2026",
    destacado: true,
  },
  {
    id: 3,
    categoria: "ANIME",
    titulo: "Demon Slayer anuncia su arco final: fecha de estreno confirmada",
    resumen: "Ufotable revela que la adaptación del arco final llegará en verano 2026 con una calidad visual sin precedentes.",
    imagen: "https://images.unsplash.com/photo-1541562232579-512a21360020?w=600&q=80",
    autor: "AnimeWorld",
    fecha: "1 Mar 2026",
    destacado: false,
  },
  {
    id: 4,
    categoria: "ESPECTÁCULO",
    titulo: "Taylor Swift anuncia gira latinoamericana para finales de 2026",
    resumen: "La superestrella del pop confirma 12 fechas en América Latina, incluyendo Argentina, México, Brasil y Colombia.",
    imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    autor: "ShowBiz",
    fecha: "28 Feb 2026",
    destacado: false,
  },
  {
    id: 5,
    categoria: "GAMING",
    titulo: "GTA VI podría llegar antes de lo esperado según filtraciones internas",
    resumen: "Fuentes cercanas a Rockstar Games sugieren que el lanzamiento podría adelantarse al tercer trimestre de 2026.",
    imagen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
    autor: "GameZone",
    fecha: "27 Feb 2026",
    destacado: false,
  },
  {
    id: 6,
    categoria: "SERIES",
    titulo: "The Last of Us Temporada 3: HBO confirma producción y regreso del elenco",
    resumen: "Pedro Pascal y Bella Ramsey vuelven para continuar la historia post-apocalíptica más aclamada de la televisión.",
    imagen: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    autor: "SeriesMania",
    fecha: "26 Feb 2026",
    destacado: false,
  },
];

const CATEGORIAS = ["TODAS", "ANIME", "CINE", "ESPECTÁCULO", "GAMING", "SERIES"];

const CATEGORIA_COLORS = {
  ANIME: "#ff6b35",
  CINE: "#4ecdc4",
  ESPECTÁCULO: "#ffe66d",
  GAMING: "#a8ff78",
  SERIES: "#ff6b9d",
};

export default function BlogNoticias() {
  const [categoriaActiva, setCategoriaActiva] = useState("TODAS");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const noticiasFiltradas =
    categoriaActiva === "TODAS"
      ? NOTICIAS
      : NOTICIAS.filter((n) => n.categoria === categoriaActiva);

  const destacadas = noticiasFiltradas.filter((n) => n.destacado);
  const normales = noticiasFiltradas.filter((n) => !n.destacado);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0a0a0f", minHeight: "100vh", color: "#e8e8f0" }}>
      
      {/* Estilos globales */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #ff6b35; border-radius: 3px; }
        
        .nav-link { color: #aaa; text-decoration: none; font-size: 13px; letter-spacing: 2px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #ff6b35; }
        
        .cat-btn { background: none; border: 1px solid #333; color: #888; padding: 6px 16px; border-radius: 2px; cursor: pointer; font-size: 11px; letter-spacing: 2px; font-family: 'Source Sans 3', sans-serif; font-weight: 600; transition: all 0.2s; }
        .cat-btn:hover { border-color: #ff6b35; color: #ff6b35; }
        .cat-btn.active { background: #ff6b35; border-color: #ff6b35; color: #0a0a0f; }
        
        .card-principal { cursor: pointer; position: relative; overflow: hidden; border-radius: 4px; }
        .card-principal img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
        .card-principal:hover img { transform: scale(1.04); }
        
        .card-small { cursor: pointer; display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid #1a1a2e; transition: all 0.2s; }
        .card-small:hover { padding-left: 6px; }
        .card-small:last-child { border-bottom: none; }
        
        .noticia-grid { cursor: pointer; overflow: hidden; border-radius: 4px; background: #0f0f1a; transition: transform 0.2s; }
        .noticia-grid:hover { transform: translateY(-4px); }
        .noticia-grid img { width: 100%; height: 180px; object-fit: cover; display: block; transition: transform 0.4s; }
        .noticia-grid:hover img { transform: scale(1.05); }
        
        .tag-cat { display: inline-block; padding: 3px 10px; font-size: 10px; letter-spacing: 2px; font-family: 'Source Sans 3', sans-serif; font-weight: 700; border-radius: 2px; }
        
        .ad-banner { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border: 1px dashed #333; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #555; font-size: 12px; font-family: 'Source Sans 3', sans-serif; letter-spacing: 1px; }
        
        .ticker-item { white-space: nowrap; padding: 0 40px; font-size: 13px; color: #ccc; font-family: 'Source Sans 3', sans-serif; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-wrap { overflow: hidden; }
        .ticker-inner { display: flex; animation: ticker 30s linear infinite; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: "1px solid #1a1a2e", position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,0.96)", backdropFilter: "blur(10px)" }}>
        
        {/* Top bar */}
        <div style={{ borderBottom: "1px solid #111", padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#555", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "1px" }}>
            MARTES 3 DE MARZO, 2026
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["INICIO", "CONTACTO", "ADMIN"].map(link => (
              <span key={link} className="nav-link">{link}</span>
            ))}
          </div>
        </div>

        {/* Logo */}
        <div style={{ padding: "16px 24px", textAlign: "center", borderBottom: "1px solid #1a1a2e" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 900,
            letterSpacing: "-1px",
            background: "linear-gradient(90deg, #ff6b35, #ffe66d, #4ecdc4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
          }}>
            NEXUS<span style={{ WebkitTextFillColor: "#e8e8f0", background: "none", fontWeight: 300 }}>MEDIA</span>
          </h1>
          <p style={{ fontSize: "11px", color: "#555", letterSpacing: "4px", fontFamily: "'Source Sans 3', sans-serif", marginTop: "4px" }}>
            ANIME · CINE · ESPECTÁCULO · GAMING · SERIES
          </p>
        </div>

        {/* Nav categorías */}
        <div style={{ padding: "12px 24px", display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${categoriaActiva === cat ? "active" : ""}`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Ticker de noticias */}
      <div style={{ background: "#ff6b35", padding: "8px 0", overflow: "hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...NOTICIAS, ...NOTICIAS].map((n, i) => (
              <span key={i} className="ticker-item" style={{ color: "#0a0a0f", fontWeight: 600 }}>
                ◆ {n.titulo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Banner publicitario superior */}
        <div className="ad-banner" style={{ height: "90px", marginBottom: "32px" }}>
          📢 ESPACIO PUBLICITARIO — Google AdSense 728×90
        </div>

        {/* Noticias destacadas */}
        {destacadas.length > 0 && (
          <section style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#e8e8f0" }}>
                Destacadas
              </h2>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #ff6b35, transparent)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: destacadas.length > 1 ? "2fr 1fr" : "1fr", gap: "4px" }}>
              
              {/* Noticia principal grande */}
              {destacadas[0] && (
                <div className="card-principal fade-in" style={{ height: "420px" }}>
                  <img src={destacadas[0].imagen} alt={destacadas[0].titulo} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px" }}>
                    <span className="tag-cat" style={{ background: CATEGORIA_COLORS[destacadas[0].categoria] || "#ff6b35", color: "#0a0a0f", marginBottom: "10px" }}>
                      {destacadas[0].categoria}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 700, lineHeight: 1.2, marginTop: "8px", color: "#fff" }}>
                      {destacadas[0].titulo}
                    </h3>
                    <p style={{ fontSize: "13px", color: "#bbb", marginTop: "8px", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.5 }}>
                      {destacadas[0].resumen}
                    </p>
                    <div style={{ display: "flex", gap: "12px", marginTop: "12px", fontSize: "11px", color: "#888", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <span>✍ {destacadas[0].autor}</span>
                      <span>📅 {destacadas[0].fecha}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Segunda noticia destacada */}
              {destacadas[1] && (
                <div className="card-principal fade-in" style={{ height: "420px" }}>
                  <img src={destacadas[1].imagen} alt={destacadas[1].titulo} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                    <span className="tag-cat" style={{ background: CATEGORIA_COLORS[destacadas[1].categoria] || "#4ecdc4", color: "#0a0a0f", marginBottom: "8px" }}>
                      {destacadas[1].categoria}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, lineHeight: 1.3, marginTop: "8px", color: "#fff" }}>
                      {destacadas[1].titulo}
                    </h3>
                    <div style={{ display: "flex", gap: "12px", marginTop: "10px", fontSize: "11px", color: "#888", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <span>✍ {destacadas[1].autor}</span>
                      <span>📅 {destacadas[1].fecha}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Layout de 3 columnas: noticias + sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 300px", gap: "32px" }}>
          
          {/* Grid de noticias */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700 }}>
                Últimas Noticias
              </h2>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #333, transparent)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {normales.map((noticia, i) => (
                <div key={noticia.id} className="noticia-grid fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <img src={noticia.imagen} alt={noticia.titulo} />
                  <div style={{ padding: "16px" }}>
                    <span className="tag-cat" style={{ background: CATEGORIA_COLORS[noticia.categoria] || "#888", color: "#0a0a0f", fontSize: "9px" }}>
                      {noticia.categoria}
                    </span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, marginTop: "10px", lineHeight: 1.3, color: "#e8e8f0" }}>
                      {noticia.titulo}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#888", marginTop: "8px", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.5 }}>
                      {noticia.resumen}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", fontSize: "11px", color: "#666", fontFamily: "'Source Sans 3', sans-serif" }}>
                      <span>{noticia.autor}</span>
                      <span>{noticia.fecha}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ad entre noticias */}
            <div className="ad-banner" style={{ height: "250px", marginTop: "32px" }}>
              📢 Google AdSense 300×250 — Rectangle
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Ad sidebar */}
            <div className="ad-banner" style={{ height: "250px", marginBottom: "24px" }}>
              📢 AdSense<br />300×250
            </div>

            {/* Más leídas */}
            <div style={{ background: "#0f0f1a", borderRadius: "4px", padding: "20px" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, marginBottom: "16px", paddingBottom: "12px", borderBottom: "2px solid #ff6b35" }}>
                Más Leídas
              </h3>
              {NOTICIAS.slice(0, 5).map((n, i) => (
                <div key={n.id} className="card-small">
                  <span style={{ fontSize: "28px", fontFamily: "'Playfair Display', serif", fontWeight: 900, color: i === 0 ? "#ff6b35" : "#333", minWidth: "32px", lineHeight: 1 }}>
                    {i + 1}
                  </span>
                  <div>
                    <span className="tag-cat" style={{ background: CATEGORIA_COLORS[n.categoria] || "#888", color: "#0a0a0f", fontSize: "8px" }}>
                      {n.categoria}
                    </span>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "13px", fontWeight: 600, color: "#ccc", lineHeight: 1.4, marginTop: "6px" }}>
                      {n.titulo}
                    </p>
                    <span style={{ fontSize: "11px", color: "#555", fontFamily: "'Source Sans 3', sans-serif" }}>{n.fecha}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ad sticky */}
            <div className="ad-banner" style={{ height: "600px", marginTop: "24px" }}>
              📢 AdSense<br />160×600<br />(Skyscraper)
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a2e", marginTop: "64px", padding: "40px 24px", background: "#07070f" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 900, background: "linear-gradient(90deg, #ff6b35, #ffe66d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            NEXUSMEDIA
          </h2>
          <p style={{ fontSize: "12px", color: "#444", marginTop: "16px", fontFamily: "'Source Sans 3', sans-serif", letterSpacing: "1px" }}>
            © 2026 NexusMedia — Tu portal de noticias de anime, cine, espectáculo y más
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "16px" }}>
            {["Privacidad", "Términos", "Contacto", "Anunciarse"].map(link => (
              <span key={link} style={{ fontSize: "11px", color: "#555", cursor: "pointer", letterSpacing: "1px", fontFamily: "'Source Sans 3', sans-serif" }}>
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}