"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function Login() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setCargando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: password,
    });

    if (error) {
      alert(error.message);
      setCargando(false);
      return;
    }

    alert("Inicio de sesión correcto");
    router.push("/perfil");
    setCargando(false);
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={logo}>🏪</div>

        <h1 style={title}>Iniciar Sesión</h1>
        <p style={subtitle}>Ingresa a tu cuenta de Point2Sell</p>

        <form style={form} onSubmit={iniciarSesion}>
          <label style={label}>Correo electrónico</label>
          <input
            style={input}
            type="email"
            placeholder="tu@email.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label style={label}>Contraseña</label>
          <input
            style={input}
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div style={options}>
            <label>
              <input type="checkbox" /> Recordarme
            </label>

            <span style={link}>¿Olvidaste tu contraseña?</span>
          </div>

          <button type="submit" style={button} disabled={cargando}>
            {cargando ? "Entrando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p style={registerText}>
          ¿No tienes cuenta?{" "}
          <span style={link} onClick={() => router.push("/registro")}>
            Regístrate aquí
          </span>
        </p>

        <button style={backButton} onClick={() => router.push("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#F2F2F2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "420px",
  background: "white",
  padding: "40px",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const logo = {
  width: "65px",
  height: "65px",
  borderRadius: "50%",
  background: "#E8F1FF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "32px",
  margin: "0 auto 20px",
};

const title = {
  color: "#1F3A5F",
  marginBottom: "8px",
};

const subtitle = {
  color: "#666",
  marginBottom: "30px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
};

const label = {
  fontWeight: "bold",
  marginBottom: "8px",
  color: "#1F3A5F",
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "18px",
  fontSize: "15px",
};

const options = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "14px",
  marginBottom: "22px",
};

const link = {
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "bold",
};

const button = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const registerText = {
  marginTop: "25px",
  color: "#555",
};

const backButton = {
  marginTop: "15px",
  background: "transparent",
  border: "none",
  color: "#1F3A5F",
  cursor: "pointer",
  fontWeight: "bold",
};