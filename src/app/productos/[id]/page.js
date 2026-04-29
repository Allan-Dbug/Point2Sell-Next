"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../supabase";

export default function ProductoDetalle() {
  const router = useRouter();
  const params = useParams();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    obtenerProducto();
  }, []);

  const obtenerProducto = async () => {
    const { data } = await supabase
      .from("productos")
      .select("*")
      .eq("id", params.id)
      .single();

    setProducto(data);
  };

  if (!producto) {
    return <h1 style={{ padding: "40px" }}>Cargando producto...</h1>;
  }

  return (
    <main style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>
      <button
        onClick={() => router.push("/productos")}
        style={{
          marginBottom: "30px",
          background: "#1F3A5F",
          color: "white",
          border: "none",
          padding: "12px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Volver
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <img
          src={producto.imagen}
          alt={producto.nombre}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "contain",
            background: "#fff",
            borderRadius: "15px",
          }}
        />

        <div>
          <h1 style={{ fontSize: "45px" }}>{producto.nombre}</h1>

          <h2 style={{ color: "#2563eb", marginTop: "20px" }}>
            ${producto.precio}
          </h2>

          <p style={{ marginTop: "20px", color: "#555" }}>
            {producto.descripcion}
          </p>

          <p style={{ marginTop: "15px" }}>
            <strong>Categoría:</strong> {producto.categoria}
          </p>

          <button
            style={{
              marginTop: "30px",
              background: "#111827",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </main>
  );
}