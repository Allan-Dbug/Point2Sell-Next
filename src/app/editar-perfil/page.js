"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function EditarPerfil() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [correo, setCorreo] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/login");
      return;
    }

    const usuario = sessionData.session.user;

    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", usuario.id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setNombre(data.nombre || "");
    setApellidos(data.apellidos || "");
    setTelefono(data.telefono || "");
    setDireccion(data.direccion || "");
    setCorreo(data.correo || "");
    setCargando(false);
  };

  const actualizarPerfil = async (e) => {
    e.preventDefault();

    const { data: sessionData } = await supabase.auth.getSession();
    const usuario = sessionData.session.user;

    const { error } = await supabase
      .from("perfiles")
      .update({
        nombre,
        apellidos,
        telefono,
        direccion,
      })
      .eq("id", usuario.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Perfil actualizado correctamente");
    router.push("/perfil");
  };

  if (cargando) {
    return <h1 style={{ padding: "40px" }}>Cargando datos...</h1>;
  }

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <button style={btnLight} onClick={() => router.push("/perfil")}>
          Volver al perfil
        </button>
      </nav>

      <main style={container}>
        <section style={card}>
          <h1 style={title}>Editar perfil</h1>
          <p style={subtitle}>Actualiza tu información personal</p>

          <form style={form} onSubmit={actualizarPerfil}>
            <label style={label}>Nombre</label>
            <input
              style={input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label style={label}>Apellidos</label>
            <input
              style={input}
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />

            <label style={label}>Correo electrónico</label>
            <input style={inputDisabled} value={correo} disabled />

            <label style={label}>Teléfono</label>
            <input
              style={input}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />

            <label style={label}>Dirección</label>
            <input
              style={input}
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />

            <button style={button} type="submit">
              Guardar cambios
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#F8FAFC",
};

const navbar = {
  background: "#1F3A5F",
  color: "white",
  padding: "18px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const btnLight = {
  background: "white",
  color: "#1F3A5F",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const container = {
  display: "flex",
  justifyContent: "center",
  padding: "50px",
};

const card = {
  width: "520px",
  background: "white",
  padding: "40px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const title = {
  fontSize: "38px",
  marginBottom: "10px",
};

const subtitle = {
  color: "#666",
  marginBottom: "30px",
};

const form = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  fontWeight: "bold",
  color: "#1F3A5F",
  marginBottom: "8px",
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "18px",
  fontSize: "15px",
};

const inputDisabled = {
  ...input,
  background: "#F2F2F2",
  color: "#777",
};

const button = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};