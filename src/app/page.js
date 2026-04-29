"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "./supabase";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerSesion();
    obtenerProductos();
  }, []);

  const obtenerSesion = async () => {
    const { data } = await supabase.auth.getSession();
    setUsuario(data.session?.user || null);
  };

  const obtenerProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: false })
      .limit(3);

    if (!error) {
      setProductos(data || []);
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  return (
    <main>
      <nav style={navbar}>
        <h1>Point2Sell</h1>

        <div style={{ display: "flex", gap: "15px" }}>
          {usuario ? (
            <>
              <Link href="/perfil">
                <button style={btnWhite}>Mi perfil</button>
              </Link>

              <button style={btnDark} onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button style={btnWhite}>Iniciar Sesión</button>
              </Link>

              <Link href="/registro">
                <button style={btnDark}>Registrarse</button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <section style={hero}>
        <h2 style={heroTitle}>Compra y vende fácilmente</h2>

        <p style={heroText}>
          Marketplace moderno para vendedores y compradores
        </p>

        <Link href="/productos">
          <button style={btnWhiteBig}>Explorar Productos</button>
        </Link>
      </section>

      <section style={productsSection}>
        <h2 style={sectionTitle}>Productos Destacados</h2>

        {productos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>
            Aún no hay productos publicados.
          </p>
        ) : (
          <div style={grid}>
            {productos.map((item) => (
              <div style={card} key={item.id}>
                <img src={item.imagen} alt={item.nombre} style={img} />

                <h3>{item.nombre}</h3>
                <p style={price}>${item.precio}</p>

                <Link href={`/productos/${item.id}`}>
                  <button style={btnDark}>Ver producto</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const navbar = {
  background: "#1F3A5F",
  color: "white",
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const hero = {
  background: "linear-gradient(90deg,#2563eb,#38bdf8)",
  color: "white",
  textAlign: "center",
  padding: "100px 20px",
};

const heroTitle = {
  fontSize: "60px",
  marginBottom: "20px",
};

const heroText = {
  fontSize: "24px",
  marginBottom: "30px",
};

const productsSection = {
  padding: "60px 40px",
  background: "#f5f5f5",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "45px",
  marginBottom: "50px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "25px",
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "15px",
};

const price = {
  color: "#2563eb",
  fontWeight: "bold",
  margin: "12px 0",
};

const btnWhite = {
  background: "white",
  color: "#1F3A5F",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnDark = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnWhiteBig = {
  background: "white",
  color: "#2563eb",
  border: "none",
  padding: "16px 30px",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
};