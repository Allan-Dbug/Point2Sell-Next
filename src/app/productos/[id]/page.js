"use client";

import { useParams, useRouter } from "next/navigation";

export default function ProductoDetalle() {
  const router = useRouter();
  const params = useParams();

  const productos = {
    "1": {
      nombre: "Auriculares Inalámbricos Premium",
      precio: "$899.99",
      imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    "2": {
      nombre: "Chaqueta de Cuero Elegante",
      precio: "$1599.99",
      imagen: "https://images.unsplash.com/photo-1520975954732-35dd22299614",
    },
    "3": {
      nombre: "Sofá Minimalista Moderno",
      precio: "$5999.99",
      imagen: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    },
  };

  const producto = productos[params.id];

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carritoActual.find((item) => item.nombre === producto.nombre);

    let nuevoCarrito;

    if (existe) {
      nuevoCarrito = carritoActual.map((item) =>
        item.nombre === producto.nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    alert("Producto agregado al carrito");
  };

  if (!producto) {
    return <h1 style={{ padding: "40px" }}>Producto no encontrado</h1>;
  }

  return (
    <main style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>
      <button onClick={() => router.push("/productos")} style={btnBack}>
        Volver a productos
      </button>

      <div style={card}>
        <img src={producto.imagen} alt={producto.nombre} style={img} />

        <div>
          <h1 style={{ fontSize: "45px" }}>{producto.nombre}</h1>

          <h2 style={{ color: "#2563eb", fontSize: "35px", marginTop: "20px" }}>
            {producto.precio}
          </h2>

          <p style={{ marginTop: "20px", color: "#555" }}>
            Producto premium disponible en Point2Sell.
          </p>

          <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
            <button style={btnBuy}>Comprar ahora</button>

            <button style={btnCart} onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>

          <button style={btnGoCart} onClick={() => router.push("/carrito")}>
            Ver carrito
          </button>
        </div>
      </div>
    </main>
  );
}

const btnBack = {
  marginBottom: "30px",
  background: "#1F3A5F",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};

const card = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  background: "white",
  padding: "30px",
  borderRadius: "20px",
};

const img = {
  width: "100%",
  height: "520px",
  objectFit: "cover",
  borderRadius: "15px",
};

const btnBuy = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "15px 25px",
  borderRadius: "10px",
  cursor: "pointer",
};

const btnCart = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "15px 25px",
  borderRadius: "10px",
  cursor: "pointer",
};

const btnGoCart = {
  marginTop: "18px",
  background: "transparent",
  color: "#1F3A5F",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};