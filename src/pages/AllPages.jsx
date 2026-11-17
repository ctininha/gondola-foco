// --- T12 · PERFIL ---
export const Profile = () => (
  <div className="screen" style={{ paddingBottom: "100px", alignItems: "center", textAlign: "center" }}>
    <div style={{ width: "72px", height: "72px", backgroundColor: "#EBF3FE", color: "#1366E5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "24px", margin: "16px auto 12px" }}>A</div>
    <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>Ana · Repositora</h2>
    <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "24px" }}>Mercado Bom Preço · turno da manhã</p>

    <div style={{ width: "100%", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
      <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Fila de envio</span>
      <span className="badge badge-success">0 pendentes</span>
    </div>

    <div style={{ width: "100%", marginTop: "20px" }}>
      <Link href="/" style={{ textDecoration: "none", width: "100%" }}>
        <button style={{ width: "100%", minHeight: "50px", backgroundColor: "white", color: "#DC2626", border: "1.5px solid #DC2626", borderRadius: "14px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
          Sair
        </button>
      </Link>
    </div>

    <BottomNav active="perfil" />
  </div>
);
