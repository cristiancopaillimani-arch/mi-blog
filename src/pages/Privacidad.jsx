import { useNavigate } from "react-router-dom";

export default function Privacidad() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#07070f", minHeight: "100vh", color: "#e8e8f0", fontFamily: "sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        h2 { font-family: 'Playfair Display', serif; font-size: 22px; color: #ff6b35; margin: 32px 0 12px; }
        p, li { font-family: 'Inter', sans-serif; font-size: 15px; color: #aaa; line-height: 1.8; margin-bottom: 12px; }
        ul { padding-left: 20px; }
        a { color: #ff6b35; }
      `}</style>

      {/* Header */}
      <header style={{ background: "rgba(7,7,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #ff6b35, #f7c948)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "15px", color: "#07070f" }}>N</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "18px" }}>NEXUS<span style={{ fontWeight: 300, color: "#666" }}>MEDIA</span></span>
        </div>
        <button onClick={() => navigate("/")} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", letterSpacing: "1px" }}>
          ← VOLVER
        </button>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 900, marginBottom: "8px" }}>Política de Privacidad</h1>
        <p style={{ color: "#555", fontSize: "13px", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "24px" }}>
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <p>En <strong style={{ color: "#e8e8f0" }}>NexusMedia</strong> nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando visitas nuestro sitio web <strong style={{ color: "#e8e8f0" }}>mi-blog-eex.pages.dev</strong>.</p>

        <h2>1. Información que recopilamos</h2>
        <p>No recopilamos información personal identificable de nuestros visitantes. Sin embargo, podemos recopilar información de forma automática como:</p>
        <ul>
          <li>Tipo de navegador y sistema operativo</li>
          <li>Páginas visitadas y tiempo de permanencia</li>
          <li>Dirección IP (de forma anónima)</li>
          <li>Fuente de referencia (cómo llegaste al sitio)</li>
        </ul>

        <h2>2. Uso de Cookies</h2>
        <p>Utilizamos cookies para mejorar tu experiencia de navegación. Las cookies son pequeños archivos que se almacenan en tu dispositivo. Puedes configurar tu navegador para rechazarlas, aunque esto puede afectar algunas funciones del sitio.</p>

        <h2>3. Google AdSense</h2>
        <p>Utilizamos Google AdSense para mostrar anuncios en nuestro sitio. Google puede usar cookies para mostrar anuncios relevantes basados en tus visitas anteriores a este y otros sitios web.</p>
        <p>Puedes optar por no recibir publicidad personalizada visitando <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">Configuración de anuncios de Google</a>.</p>

        <h2>4. Servicios de terceros</h2>
        <p>Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad de esos sitios y te recomendamos leer sus políticas de privacidad.</p>

        <h2>5. Seguridad</h2>
        <p>Tomamos medidas razonables para proteger la información recopilada. Sin embargo, ningún método de transmisión por Internet es 100% seguro.</p>

        <h2>6. Cambios en esta política</h2>
        <p>Podemos actualizar esta política de privacidad periódicamente. Te notificaremos de cualquier cambio publicando la nueva política en esta página.</p>

        <h2>7. Contacto</h2>
        <p>Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de nuestro sitio web.</p>

        <div style={{ marginTop: "48px", padding: "24px", background: "#0f0f1c", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "#555", fontSize: "13px", textAlign: "center" }}>
            © {new Date().getFullYear()} NexusMedia — Todos los derechos reservados
          </p>
        </div>
      </main>
    </div>
  );
}