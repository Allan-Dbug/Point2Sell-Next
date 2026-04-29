"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";


export default function Checkout() {
  const router = useRouter();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const obtenerPrecio = (precio) => {
    return Number(precio.replace("$", "").replace(",", ""));
  };

  const subtotal = carrito.reduce(
    (suma, item) => suma + obtenerPrecio(item.precio) * item.cantidad,
    0
  );

  const finalizarCompra = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Debes iniciar sesión");
    router.push("/login");
    return;
  }

  for (const item of carrito) {
    await supabase.from("compras").insert([
      {
        usuario_id: user.id,
        producto_nombre: item.nombre,
        precio: item.precio,
      },
    ]);
  }

  localStorage.removeItem("carrito");
  router.push("/ticket");
};

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <button style={btnLight} onClick={() => router.push("/carrito")}>
          Volver al carrito
        </button>
      </nav>

      <main style={container}>
        <section style={formBox}>
          <h1 style={title}>Finalizar compra</h1>

          <h2 style={subtitle}>Datos de envío</h2>

          <input style={input} type="text" placeholder="Nombre completo" />
          <input style={input} type="text" placeholder="Dirección" />
          <input style={input} type="text" placeholder="Ciudad" />
          <input style={input} type="text" placeholder="Código postal" />
          <input style={input} type="text" placeholder="Teléfono" />

          <h2 style={subtitle}>Método de pago</h2>

          <select style={input}>
            <option>Tarjeta de crédito/débito</option>
            <option>Pago contra entrega</option>
            <option>Transferencia bancaria</option>
          </select>

          <input style={input} type="text" placeholder="Nombre en la tarjeta" />
          <input style={input} type="text" placeholder="Número de tarjeta" />

          <div style={row}>
            <input style={input} type="text" placeholder="MM/AA" />
            <input style={input} type="text" placeholder="CVV" />
          </div>
        </section>

        <aside style={summaryBox}>
          <h2>Resumen del pedido</h2>

          {carrito.length === 0 ? (
            <p style={{ marginTop: "20px" }}>No hay productos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div style={orderItem} key={item.nombre}>
                <div>
                  <strong>{item.nombre}</strong>
                  <p>Cantidad: {item.cantidad}</p>
                </div>

                <span>{item.precio}</span>
              </div>
            ))
          )}

          <hr style={{ margin: "20px 0" }} />

          <div style={summaryLine}>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div style={summaryLine}>
            <span>Envío</span>
            <strong>Gratis</strong>
          </div>

          <div style={summaryLine}>
            <span>Total</span>
            <strong style={{ color: "#2563eb", fontSize: "24px" }}>
              ${subtotal.toFixed(2)}
            </strong>
          </div>

          <button
            style={payButton}
            onClick={finalizarCompra}
            disabled={carrito.length === 0}
          >
            Confirmar compra
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
  gridTemplateColumns: "1fr 380px",
  gap: "35px",
  padding: "50px 70px",
};

const formBox = {
  background: "white",
  padding: "35px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const title = {
  fontSize: "40px",
  marginBottom: "25px",
};

const subtitle = {
  marginTop: "25px",
  marginBottom: "15px",
  color: "#1F3A5F",
};

const input = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  marginBottom: "15px",
  fontSize: "15px",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
};

const summaryBox = {
  background: "white",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  height: "fit-content",
};

const orderItem = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  padding: "15px 0",
  borderBottom: "1px solid #eee",
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