"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Ticket() {
  const router = useRouter();

  const [folio, setFolio] = useState("");

  useEffect(() => {
    const numero =
      "P2S-" + Math.floor(Math.random() * 999999).toString().padStart(6, "0");

    setFolio(numero);
  }, []);

  return (
    <div style={page}>
      <div style={card}>
        <div style={check}>✓</div>

        <h1 style={title}>Compra realizada</h1>

        <p style={subtitle}>
          Gracias por comprar en Point2Sell
        </p>

        <div style={ticketBox}>
          <p><strong>Folio:</strong> {folio}</p>
          <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {new Date().toLocaleTimeString()}</p>
          <p><strong>Estado:</strong> Pagado</p>
        </div>

        <button
          style={btnDark}
          onClick={() => router.push("/perfil")}
        >
          Ver mis compras
        </button>

        <button
          style={btnLight}
          onClick={() => router.push("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "500px",
  background: "white",
  padding: "45px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const check = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "#22c55e",
  color: "white",
  fontSize: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 20px",
};

const title = {
  fontSize: "42px",
};

const subtitle = {
  color: "#666",
  marginBottom: "30px",
};

const ticketBox = {
  background: "#f8fafc",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "left",
  lineHeight: "2",
  marginBottom: "30px",
};

const btnDark = {
  width: "100%",
  background: "#111827",
  color: "white",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer",
  marginBottom: "12px",
};

const btnLight = {
  width: "100%",
  background: "#e5e7eb",
  color: "#111827",
  border: "none",
  padding: "14px",
  borderRadius: "10px",
  cursor: "pointer",
};