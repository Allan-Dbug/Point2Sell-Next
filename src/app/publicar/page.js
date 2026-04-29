"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function PublicarProducto() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [cargando, setCargando] = useState(false);

  const publicarProducto = async (e) => {
    e.preventDefault();
    setCargando(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Debes iniciar sesión para publicar productos");
      router.push("/login");
      setCargando(false);
      return;
    }

    const { error } = await supabase.from("productos").insert([
      {
        nombre,
        descripcion,
        precio: Number(precio),
        categoria,
        imagen,
        stock: Number(stock),
        vendedor_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message);
      setCargando(false);
      return;
    }

    alert("Producto publicado correctamente");
    router.push("/productos");
    setCargando(false);
  };

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={btnLight} onClick={() => router.push("/productos")}>
            Ver productos
          </button>

          <button style={btnDark} onClick={() => router.push("/mis-productos")}>
            Mis productos
          </button>
        </div>
      </nav>

      <main style={container}>
        <section style={card}>
          <h1 style={title}>Publicar producto</h1>
          <p style={subtitle}>Agrega un producto nuevo al marketplace</p>

          <form style={form} onSubmit={publicarProducto}>
            <label style={label}>Nombre del producto</label>
            <input
              style={input}
              type="text"
              placeholder="Ej. Audífonos inalámbricos"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label style={label}>Descripción</label>
            <textarea
              style={textarea}
              placeholder="Describe las características del producto"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />

            <label style={label}>Precio</label>
            <input
              style={input}
              type="number"
              placeholder="899.99"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />

            <label style={label}>Categoría</label>
            <select
              style={input}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Muebles">Muebles</option>
              <option value="Ropa">Ropa</option>
              <option value="Hogar">Hogar</option>
              <option value="Deportes">Deportes</option>
              <option value="Juguetes">Juguetes</option>
              <option value="Otros">Otros</option>
            </select>

            <label style={label}>URL de imagen</label>
            <input
              style={input}
              type="text"
              placeholder="https://..."
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />

            <label style={label}>Stock</label>
            <input
              style={input}
              type="number"
              placeholder="10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />

            <button style={button} type="submit" disabled={cargando}>
              {cargando ? "Publicando..." : "Publicar producto"}
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

const btnDark = {
  background: "#111827",
  color: "white",
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
  width: "600px",
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

const textarea = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "18px",
  minHeight: "100px",
  fontSize: "15px",
  resize: "vertical",
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