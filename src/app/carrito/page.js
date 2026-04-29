"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Carrito() {
  const router = useRouter();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const guardarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarProducto = (nombre) => {
    const nuevoCarrito = carrito.filter((item) => item.nombre !== nombre);
    guardarCarrito(nuevoCarrito);
  };

  const aumentarCantidad = (nombre) => {
    const nuevoCarrito = carrito.map((item) =>
      item.nombre === nombre
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (nombre) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item.nombre === nombre
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);

    guardarCarrito(nuevoCarrito);
  };

  const obtenerPrecio = (precio) => {
    return Number(precio.replace("$", "").replace(",", ""));
  };

  const total = carrito.reduce(
    (suma, item) => suma + obtenerPrecio(item.precio) * item.cantidad,
    0
  );

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <button style={btnLight} onClick={() => router.push("/productos")}>
          Seguir comprando
        </button>
      </nav>

      <main style={container}>
        <section style={cartBox}>
          <h1 style={title}>Carrito de compras</h1>

          {carrito.length === 0 ? (
            <div style={emptyBox}>
              <h2>Tu carrito está vacío</h2>
              <p>Agrega productos desde el catálogo.</p>
              <button style={btnDark} onClick={() => router.push("/productos")}>
                Ir a productos
              </button>
            </div>
          ) : (
            carrito.map((producto) => (
              <div style={item} key={producto.nombre}>
                <img src={producto.imagen} alt={producto.nombre} style={img} />

                <div style={{ flex: 1 }}>
                  <h3>{producto.nombre}</h3>
                  <p style={price}>{producto.precio}</p>

                  <div style={quantityBox}>
                    <button
                      style={qtyButton}
                      onClick={() => disminuirCantidad(producto.nombre)}
                    >
                      -
                    </button>

                    <span>{producto.cantidad}</span>

                    <button
                      style={qtyButton}
                      onClick={() => aumentarCantidad(producto.nombre)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  style={deleteButton}
                  onClick={() => eliminarProducto(producto.nombre)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </section>

        <aside style={summaryBox}>
          <h2>Resumen</h2>

          <div style={summaryLine}>
            <span>Productos</span>
            <strong>{carrito.length}</strong>
          </div>

          <div style={summaryLine}>
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <div style={summaryLine}>
            <span>Envío</span>
            <strong>Gratis</strong>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <div style={summaryLine}>
            <span>Total</span>
            <strong style={{ color: "#2563eb", fontSize: "24px" }}>
              ${total.toFixed(2)}
            </strong>
          </div>
<button style={payButton} onClick={() => router.push("/checkout")}>
  Proceder al pago
</button>
        </aside>
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
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  gap: "35px",
  padding: "50px 70px",
};

const cartBox = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const title = {
  fontSize: "40px",
  marginBottom: "30px",
};

const item = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "20px 0",
  borderBottom: "1px solid #eee",
};

const img = {
  width: "120px",
  height: "100px",
  objectFit: "cover",
  borderRadius: "12px",
};

const price = {
  color: "#2563eb",
  fontWeight: "bold",
  margin: "8px 0",
};

const quantityBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginTop: "10px",
};

const qtyButton = {
  width: "32px",
  height: "32px",
  border: "none",
  borderRadius: "8px",
  background: "#1F3A5F",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const deleteButton = {
  background: "#DC2626",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};

const summaryBox = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  height: "fit-content",
};

const summaryLine = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "18px",
};

const payButton = {
  width: "100%",
  marginTop: "30px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "15px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const emptyBox = {
  textAlign: "center",
  padding: "50px",
  background: "#F8FAFC",
  borderRadius: "16px",
};

const btnDark = {
  marginTop: "20px",
  background: "#111827",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
};