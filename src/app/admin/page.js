"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function Admin() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const iniciar = async () => {
      const esAdmin = await verificarAdmin();

      if (esAdmin) {
        cargarDatos();
      }
    };

    iniciar();
  }, []);

  const verificarAdmin = async () => {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/login");
      return false;
    }

    const usuario = sessionData.session.user;

    const { data: perfil } = await supabase
      .from("perfiles")
      .select("rol")
      .eq("id", usuario.id)
      .single();

    if (!perfil || perfil.rol !== "admin") {
      alert("No tienes permiso para entrar al panel admin");
      router.push("/");
      return false;
    }

    return true;
  };

  const cargarDatos = async () => {
    const { data: perfilesData } = await supabase
      .from("perfiles")
      .select("*")
      .order("creado_en", { ascending: false });

    const { data: productosData } = await supabase
      .from("productos")
      .select("*")
      .order("id", { ascending: false });

    const { data: comprasData } = await supabase
      .from("compras")
      .select("*")
      .order("id", { ascending: false });

    setUsuarios(perfilesData || []);
    setProductos(productosData || []);
    setCompras(comprasData || []);
    setCargando(false);
  };

  const eliminarProducto = async (id) => {
    const confirmar = confirm("¿Eliminar este producto?");
    if (!confirmar) return;

    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setProductos(productos.filter((producto) => producto.id !== id));
    alert("Producto eliminado");
  };

  if (cargando) {
    return <h1 style={{ padding: "40px" }}>Cargando panel admin...</h1>;
  }

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell Admin
        </h2>

        <button style={btnLight} onClick={() => router.push("/productos")}>
          Ver tienda
        </button>
      </nav>

      <main style={container}>
        <h1 style={title}>Panel de administración</h1>

        <section style={stats}>
          <div style={statCard}>
            <h2>{usuarios.length}</h2>
            <p>Usuarios</p>
          </div>

          <div style={statCard}>
            <h2>{productos.length}</h2>
            <p>Productos</p>
          </div>

          <div style={statCard}>
            <h2>{compras.length}</h2>
            <p>Compras</p>
          </div>
        </section>

        <section style={box}>
          <h2>Usuarios registrados</h2>

          {usuarios.length === 0 ? (
            <p>No hay usuarios.</p>
          ) : (
            usuarios.map((user) => (
              <div style={row} key={user.id}>
                <div>
                  <strong>
                    {user.nombre} {user.apellidos}
                  </strong>
                  <p>{user.correo}</p>
                  <p>{user.telefono}</p>
                </div>

                <span style={badge}>{user.rol}</span>
              </div>
            ))
          )}
        </section>

        <section style={box}>
          <h2>Productos publicados</h2>

          {productos.length === 0 ? (
            <p>No hay productos.</p>
          ) : (
            productos.map((producto) => (
              <div style={row} key={producto.id}>
                <div
                  style={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <img src={producto.imagen} alt={producto.nombre} style={img} />

                  <div>
                    <strong>{producto.nombre}</strong>
                    <p>{producto.categoria}</p>
                    <p>${producto.precio}</p>
                  </div>
                </div>

                <button
                  style={deleteButton}
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </section>

        <section style={box}>
          <h2>Compras realizadas</h2>

          {compras.length === 0 ? (
            <p>No hay compras.</p>
          ) : (
            compras.map((compra) => (
              <div style={row} key={compra.id}>
                <div>
                  <strong>{compra.producto_nombre}</strong>
                  <p>Usuario ID: {compra.usuario_id}</p>
                  <p>${compra.precio}</p>
                </div>

                <span style={status}>Completada</span>
              </div>
            ))
          )}
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
  padding: "45px 70px",
};

const title = {
  textAlign: "center",
  fontSize: "45px",
  marginBottom: "35px",
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "25px",
  marginBottom: "35px",
};

const statCard = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const box = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  marginBottom: "30px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const row = {
  marginTop: "18px",
  padding: "18px",
  borderRadius: "12px",
  background: "#F8FAFC",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const badge = {
  background: "#E8F1FF",
  color: "#2563eb",
  padding: "8px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
};

const status = {
  background: "#DCFCE7",
  color: "#166534",
  padding: "8px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
};

const img = {
  width: "80px",
  height: "70px",
  objectFit: "contain",
  background: "white",
  borderRadius: "10px",
};

const deleteButton = {
  background: "#DC2626",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};