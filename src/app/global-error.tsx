"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <div style={{ maxWidth: 480, margin: "6rem auto", textAlign: "center", padding: "0 1rem" }}>
          <p style={{ color: "#dc2626", fontWeight: 600, fontSize: 14 }}>Error</p>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>Algo salió mal</h1>
          <p style={{ color: "#475569", marginTop: 16 }}>
            Ha ocurrido un error grave al cargar el sitio. Inténtalo de nuevo en unos segundos.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: 32,
              padding: "10px 20px",
              borderRadius: 8,
              background: "#059669",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
