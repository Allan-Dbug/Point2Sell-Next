"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function Perfil() {
  const router = useRouter();

  const [perfil, setPerfil] = useState(null);
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const obtenerPerfil = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/login");
      return;
    }

    const usuario = sessionData.session.user;

    const { data } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", usuario.id)
      .single();

    const { data: comprasData } = await supabase
      .from("compras")
      .select("*")
      .eq("usuario_id", usuario.id)
      .order("id", { ascending: false });

    setPerfil(data);
    setCompras(comprasData || []);
    setCargando(false);
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (cargando) {
    return <h1 style={{ padding: "40px" }}>Cargando perfil...</h1>;
  }

  const iniciales = `${perfil.nombre?.[0] || ""}${perfil.apellidos?.[0] || ""}`;

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={btnLight} onClick={() => router.push("/productos")}>
            Productos
          </button>

          <button style={btnDark} onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main style={container}>
        <section style={profileCard}>
          <div style={avatar}>{iniciales.toUpperCase()}</div>

          <h1 style={name}>
            {perfil.nombre} {perfil.apellidos}
          </h1>

          <p style={email}>{perfil.correo}</p>

          <span style={badge}>Usuario {perfil.rol}</span>

          <button
            style={editButton}
            onClick={() => router.push("/editar-perfil")}
          >
            Editar perfil
          </button>
        </section>

        <section style={content}>
          <div style={box}>
            <h2>Información personal</h2>

            <div style={infoGrid}>
              <div>
                <strong>Nombre</strong>
                <p>{perfil.nombre}</p>
              </div>

              <div>
                <strong>Apellidos</strong>
                <p>{perfil.apellidos}</p>
              </div>

              <div>
                <strong>Correo</strong>
                <p>{perfil.correo}</p>
              </div>

              <div>
                <strong>Teléfono</strong>
                <p>{perfil.telefono}</p>
              </div>

              <div>
                <strong>Dirección</strong>
                <p>{perfil.direccion}</p>
              </div>
            </div>
          </div>

          <div style={box}>
            <h2>Resumen</h2>

            <div style={stats}>
              <div style={statCard}>
                <h3>{compras.length}</h3>
                <p>Compras</p>
              </div>

              <div style={statCard}>
                <h3>0</h3>
                <p>Favoritos</p>
              </div>

              <div style={statCard}>
                <h3>{compras.length}</h3>
                <p>Pedidos</p>
              </div>
            </div>
          </div>

          <div style={box}>
            <h2>Mis compras recientes</h2>

            {compras.length === 0 ? (
              <p style={{ marginTop: "15px", color: "#666" }}>
                Aún no tienes compras.
              </p>
            ) : (
              compras.map((item) => (
                <div key={item.id} style={order}>
                  <div>
                    <strong>{item.producto_nombre}</strong>
                    <p>${item.precio}</p>
                  </div>

                  <span style={statusDone}>Comprado</span>
                </div>
              ))
            )}
          </div>
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
};

const btnLight = {
  background: "white",
  color: "#1F3A5F",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnDark = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const container = {
  display: "grid",
  gridTemplateColumns: "320px 1fr",
  gap: "35px",
  padding: "50px 70px",
};

const profileCard = {
  background: "white",
  padding: "35px",
  borderRadius: "18px",
  textAlign: "center",
};

const avatar = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  background: "linear-gradient(90deg,#2563eb,#38bdf8)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "36px",
  fontWeight: "bold",
  margin: "0 auto 20px",
};

const name = { marginBottom: "8px" };
const email = { color: "#666", marginBottom: "15px" };

const badge = {
  background: "#E8F1FF",
  color: "#2563eb",
  padding: "8px 14px",
  borderRadius: "20px",
};

const editButton = {
  width: "100%",
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "20px",
};

const content = {
  display: "flex",
  flexDirection: "column",
  gap: "25px",
};

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: "25px",
  marginTop: "25px",
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "20px",
  marginTop: "25px",
};

const statCard = {
  background: "#F2F2F2",
  padding: "22px",
  borderRadius: "14px",
  textAlign: "center",
};

const order = {
  marginTop: "20px",
  padding: "18px",
  borderRadius: "12px",
  background: "#F8FAFC",
  display: "flex",
  justifyContent: "space-between",
};

const statusDone = {
  background: "#DCFCE7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: "20px",
};