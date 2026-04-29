"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function Registro() {
  const router = useRouter();

  const [cargando, setCargando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");

  const registrar = async () => {
    setCargando(true);

    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password,
      options: {
        data: {
          nombre,
          apellidos,
          telefono,
          direccion,
        },
      },
    });

    if (error) {
      alert(error.message);
      setCargando(false);
      return;
    }

    const user = data.user;

    if (user) {
      const { error: perfilError } = await supabase.from("perfiles").insert([
        {
          id: user.id,
          nombre,
          apellidos,
          correo,
          telefono,
          direccion,
          rol: "comprador",
        },
      ]);

      if (perfilError) {
        alert(perfilError.message);
        setCargando(false);
        return;
      }
    }

    alert("Cuenta creada correctamente");
    router.push("/login");
    setCargando(false);
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={logo}>🛒</div>

        <h1 style={title}>Crear Cuenta</h1>
        <p style={subtitle}>Regístrate para comprar o vender en Point2Sell</p>

        <form
          style={form}
          onSubmit={(e) => {
            e.preventDefault();
            registrar();
          }}
        >
          <label style={label}>Nombre</label>
          <input
            style={input}
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label style={label}>Apellidos</label>
          <input
            style={input}
            type="text"
            placeholder="Tus apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />

          <label style={label}>Correo electrónico</label>
          <input
            style={input}
            type="email"
            placeholder="tu@email.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label style={label}>Teléfono</label>
          <input
            style={input}
            type="tel"
            placeholder="993 000 0000"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <label style={label}>Dirección</label>
          <input
            style={input}
            type="text"
            placeholder="Tu dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />

          <label style={label}>Contraseña</label>
          <input
            style={input}
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={button} disabled={cargando}>
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p style={loginText}>
          ¿Ya tienes cuenta?{" "}
          <span style={link} onClick={() => router.push("/login")}>
            Inicia sesión
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
  padding: "40px 0",
};

const card = {
  width: "460px",
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

const button = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const loginText = {
  marginTop: "25px",
  color: "#555",
};

const link = {
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "bold",
};

const backButton = {
  marginTop: "15px",
  background: "transparent",
  border: "none",
  color: "#1F3A5F",
  cursor: "pointer",
  fontWeight: "bold",
};