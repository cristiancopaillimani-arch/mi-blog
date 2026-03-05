import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Credenciales incorrectas");
      setLoading(false);
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f0f1a", padding: "40px", borderRadius: "8px", width: "100%", maxWidth: "400px", border: "1px solid #1a1a2e" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "28px", color: "#ff6b35", marginBottom: "8px" }}>NexusMedia</h1>
        <p style={{ color: "#555", fontSize: "13px", marginBottom: "32px", fontFamily: "sans-serif" }}>Panel de Administrador</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", background: "#1a1a2e", border: "1px solid #333", borderRadius: "4px", color: "#fff", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", background: "#1a1a2e", border: "1px solid #333", borderRadius: "4px", color: "#fff", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }}
        />

        {error && <p style={{ color: "#ff4444", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: "12px", background: "#ff6b35", border: "none", borderRadius: "4px", color: "#fff", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}