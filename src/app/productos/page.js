"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function Productos() {
  const router = useRouter();

  const [productos, setProductos] = useState([]);
  const [menu, setMenu] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setProductos(data || []);
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const productosFiltrados =
    categoriaFiltro === "Todas"
      ? productos
      : productos.filter((item) => item.categoria === categoriaFiltro);

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <div style={{ position: "relative" }}>
          <button style={menuBtn} onClick={() => setMenu(!menu)}>
            ☰
          </button>

          {menu && (
            <div style={dropdown}>
              <button style={item} onClick={() => router.push("/perfil")}>
                Mi perfil
              </button>

              <button style={item} onClick={() => router.push("/publicar")}>
                Publicar producto
              </button>

              <button style={item} onClick={() => router.push("/mis-productos")}>
                Mis productos
              </button>

              <button style={item} onClick={() => router.push("/carrito")}>
                Carrito
              </button>

              <button style={itemRed} onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </nav>

      <h1 style={titulo}>Productos</h1>

      <div style={filtros}>
        <label style={filtroLabel}>Filtrar por categoría:</label>

        <select
          style={selectFiltro}
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Muebles">Muebles</option>
          <option value="Ropa">Ropa</option>
          <option value="Hogar">Hogar</option>
          <option value="Deportes">Deportes</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      {productosFiltrados.length === 0 ? (
        <p style={emptyText}>No hay productos en esta categoría.</p>
      ) : (
        <div style={grid}>
          {productosFiltrados.map((producto) => (
            <div key={producto.id} style={card}>
              <img src={producto.imagen} alt={producto.nombre} style={img} />

              <span style={badge}>{producto.categoria || "Sin categoría"}</span>

              <h2>{producto.nombre}</h2>

              <p style={descripcion}>{producto.descripcion}</p>

              <p style={price}>${producto.precio}</p>

              <button
                style={btnDark}
                onClick={() => router.push(`/productos/${producto.id}`)}
              >
                Ver producto
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
};

const navbar = {
  background: "#1F3A5F",
  color: "white",
  padding: "20px 40px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const menuBtn = {
  background: "white",
  color: "#1F3A5F",
  border: "none",
  width: "45px",
  height: "45px",
  borderRadius: "10px",
  fontSize: "25px",
  cursor: "pointer",
};

const dropdown = {
  position: "absolute",
  right: "0",
  top: "55px",
  background: "white",
  width: "220px",
  borderRadius: "12px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  overflow: "hidden",
  zIndex: 10,
};

const item = {
  width: "100%",
  padding: "14px",
  border: "none",
  background: "white",
  textAlign: "left",
  cursor: "pointer",
};

const itemRed = {
  ...item,
  color: "#DC2626",
  fontWeight: "bold",
};

const titulo = {
  textAlign: "center",
  fontSize: "55px",
  marginTop: "40px",
  marginBottom: "25px",
};

const filtros = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
  marginBottom: "35px",
};

const filtroLabel = {
  fontWeight: "bold",
  color: "#1F3A5F",
};

const selectFiltro = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "15px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "25px",
  padding: "0 35px 50px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
};

const img = {
  width: "100%",
  height: "250px",
  objectFit: "contain",
  objectPosition: "center",
  background: "#fff",
  borderRadius: "14px",
  padding: "10px",
};

const badge = {
  display: "inline-block",
  marginTop: "15px",
  background: "#E8F1FF",
  color: "#2563eb",
  padding: "6px 10px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "bold",
};

const descripcion = {
  color: "#555",
  marginTop: "10px",
};

const price = {
  color: "#2563eb",
  fontWeight: "bold",
  fontSize: "22px",
  margin: "12px 0",
};

const btnDark = {
  width: "100%",
  background: "#111827",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
};

const emptyText = {
  textAlign: "center",
  color: "#555",
  fontSize: "18px",
  marginTop: "30px",
};