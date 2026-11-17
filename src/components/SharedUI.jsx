import { useLocation } from "wouter";
import { PLANOGRAMA_EXEMPLO } from "../data/mockData";

export function BottomNav({ active }) {
  const [, setLocation] = useLocation();

  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${active === "inicio" ? "active" : ""}`} onClick={() => setLocation("/")}>
        <span style={{ fontSize: "20px" }}>🏠</span>
        <span>Início</span>
      </button>
      <button className={`nav-item ${active === "historico" ? "active" : ""}`} onClick={() => setLocation("/history")}>
        <span style={{ fontSize: "20px" }}>🕒</span>
        <span>Histórico</span>
      </button>
      <button className={`nav-item ${active === "perfil" ? "active" : ""}`} onClick={() => setLocation("/profile")}>
        <span style={{ fontSize: "20px" }}>👤</span>
        <span>Perfil</span>
      </button>
    </nav>
  );
}

export function PlanogramaVisual({ height = 160 }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "12px",
      border: "1px solid #E2E8F0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: `${height}px`
    }}>
      {PLANOGRAMA_EXEMPLO.prateleiras.map((prateleira, idx) => (
        <div key={idx} style={{ borderBottom: "4px solid #CBD5E1", paddingBottom: "2px", display: "flex", gap: "4px", alignItems: "flex-end" }}>
          {prateleira.map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: item.cor,
                width: `${item.w}px`,
                height: idx === 0 ? "36px" : "30px",
                borderRadius: "4px 4px 1px 1px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div style={{ width: "65%", height: "10px", background: "rgba(255,255,255,0.85)", borderRadius: "2px" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
