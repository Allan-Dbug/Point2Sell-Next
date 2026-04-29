"use client";

import { useRouter } from "next/navigation";

export default function Vendedor() {
  const router = useRouter();

  const productosVendedor = [
    {
      id: 1,
      nombre: "Auriculares Inalámbricos Premium",
      precio: "$899.99",
    },
    {
      id: 4,
      nombre: "Teclado Mecánico RGB",
      precio: "$1,299.99",
    },
    {
      id: 5,
      nombre: "Mouse Gamer Pro",
      precio: "$499.99",
    },
  ];

  return (
    <div style={page}>
      <nav style={navbar}>
        <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          Point2Sell
        </h2>

        <button style={btnLight} onClick={() => router.push("/productos")}>
          Ver productos
        </button>
      </nav>

      <section style={banner}>
        <div style={sellerHeader}>
          <div style={logo}>TS</div>

          <div>
            <h1 style={title}>Tech Store</h1>
            <p style={subtitle}>Vendedor verificado · Electrónica</p>
            <p style={rating}>⭐ 4.8 | 320 ventas realizadas</p>
          </div>
        </div>
      </section>

      <main style={container}>
        <section style={infoBox}>
          <h2>Sobre el vendedor</h2>

          <p style={text}>
            Tech Store es una tienda especializada en productos tecnológicos,
            accesorios para computadora, audio y dispositivos electrónicos.
            Ofrece productos de calidad, atención rápida y entregas confiables.
          </p>

          <div style={stats}>
            <div style={statCard}>
              <h3>320</h3>
              <p>Ventas</p>
            </div>

            <div style={statCard}>
              <h3>4.8</h3>
              <p>Calificación</p>
            </div>

            <div style={statCard}>
              <h3>24h</h3>
              <p>Respuesta</p>
            </div>
          </div>

          <button style={followButton}>Seguir vendedor</button>
          <button style={contactButton}>Contactar vendedor</button>
        </section>

        <section style={productsBox}>
          <h2>Productos publicados</h2>

          <div style={grid}>
            {productosVendedor.map((producto) => (
              <div style={card} key={producto.id}>
                <div style={imagePlaceholder}>📦</div>
                <h3>{producto.nombre}</h3>
                <p style={price}>{producto.precio}</p>

                <button
                  style={btnDark}
                  onClick={() => router.push(`/productos/${producto.id}`)}
                >
                  Ver producto
                </button>
              </div>
            ))}
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

const banner = {
  background: "linear-gradient(90deg,#2563eb,#38bdf8)",
  padding: "60px 70px",
  color: "white",
};

const sellerHeader = {
  display: "flex",
  alignItems: "center",
  gap: "25px",
};

const logo = {
  width: "110px",
  height: "110px",
  borderRadius: "50%",
  background: "white",
  color: "#1F3A5F",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "36px",
  fontWeight: "bold",
};

const title = {
  fontSize: "42px",
  marginBottom: "8px",
};

const subtitle = {
  fontSize: "18px",
  opacity: 0.9,
};

const rating = {
  marginTop: "10px",
  fontWeight: "bold",
};

const container = {
  display: "grid",
  gridTemplateColumns: "360px 1fr",
  gap: "35px",
  padding: "45px 70px",
};

const infoBox = {
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
  height: "fit-content",
};

const text = {
  color: "#555",
  lineHeight: "1.6",
  marginTop: "15px",
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "10px",
  marginTop: "25px",
};

const statCard = {
  background: "#F2F2F2",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
};

const followButton = {
  width: "100%",
  marginTop: "25px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const contactButton = {
  width: "100%",
  marginTop: "12px",
  background: "#1F3A5F",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const productsBox = {
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "22px",
  marginTop: "25px",
};

const card = {
  background: "#F8FAFC",
  padding: "18px",
  borderRadius: "14px",
  textAlign: "center",
};

const imagePlaceholder = {
  height: "150px",
  background: "#E8F1FF",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "45px",
  marginBottom: "15px",
};

const price = {
  color: "#2563eb",
  fontWeight: "bold",
  margin: "12px 0",
};

const btnDark = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};