"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function MisProductos() {
  const router = useRouter();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerMisProductos();
  }, []);

  const obtenerMisProductos = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión");
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("vendedor_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setProductos(data);
    }

    setCargando(false);
  };

  const eliminarProducto = async (id) => {
    const confirmar = confirm("¿Seguro que quieres eliminar este producto?");

    if (!confirmar) return;

    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Producto eliminado");
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  if (cargando) {
    return <h1 style={{ padding: "40px" }}>Cargando productos...</h1>;
  }

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={btnLight} onClick={() => router.push("/publicar")}>
            Publicar producto
          </button>

          <button style={btnDark} onClick={() => router.push("/productos")}>
            Ver catálogo
          </button>
        </div>
      </nav>

      <main style={container}>
        <h1 style={title}>Mis productos publicados</h1>

        {productos.length === 0 ? (
          <div style={emptyBox}>
            <h2>No tienes productos publicados</h2>
            <button style={btnDark} onClick={() => router.push("/publicar")}>
              Publicar ahora
            </button>
          </div>
        ) : (
          <div style={grid}>
            {productos.map((producto) => (
              <div style={card} key={producto.id}>
                <img src={producto.imagen} alt={producto.nombre} style={img} />

                <h2>{producto.nombre}</h2>
                <p style={description}>{producto.descripcion}</p>
                <p style={price}>${producto.precio}</p>
                <p>Stock: {producto.stock}</p>

                <button
                  style={deleteButton}
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar producto
                </button>
              </div>
            ))}
          </div>
        )}
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

const btnDark = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const container = {
  padding: "50px 70px",
};

const title = {
  textAlign: "center",
  fontSize: "45px",
  marginBottom: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "25px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const img = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "14px",
  marginBottom: "15px",
};

const description = {
  color: "#555",
  marginTop: "10px",
};

const price = {
  color: "#2563eb",
  fontSize: "22px",
  fontWeight: "bold",
  margin: "12px 0",
};

const deleteButton = {
  width: "100%",
  background: "#DC2626",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  marginTop: "15px",
  fontWeight: "bold",
};

const emptyBox = {
  background: "white",
  padding: "50px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};