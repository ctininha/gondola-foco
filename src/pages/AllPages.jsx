import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { analisarGondolaComIA } from "../services/aiAuditor";

export const Login = () => {
  const [, setLocation] = useLocation();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("logado", "true");
    setLocation("/dashboard");
  };

  return (
    <div className="screen-no-nav" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#FFFFFF", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>GôndolaFoco</h1>
        <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>De olho na gôndola, foco no resultado</p>
        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
          <input type="text" placeholder="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px" }} />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px" }} />
          <button type="submit" className="btn-primary">Entrar no Sistema</button>
        </form>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [, setLocation] = useLocation();
  if (!localStorage.getItem("logado")) { setLocation("/"); return null; }

  return (
    <div className="screen" style={{ paddingBottom: "90px", backgroundColor: "#F8FAFC", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "white", padding: "20px 16px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Olá, Ana</h2>
          <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>Mercado Bom Preço · Turno da manhã</p>
        </div>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#E0E7FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
          AM
        </div>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
        <div style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)", borderRadius: "16px", padding: "20px", color: "white", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px" }}>Auditoria Inteligente</h3>
          <p style={{ fontSize: "12px", opacity: 0.9, marginBottom: "16px", lineHeight: "1.4" }}>
            Compare fotos de gôndolas com o planograma e detete rupturas automaticamente com IA.
          </p>
          <Link href="/analyses/new" style={{ textDecoration: "none" }}>
            <button style={{ background: "white", color: "#1E40AF", border: "none", padding: "12px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              📷 Iniciar Nova Auditoria
            </button>
          </Link>
        </div>
      </div>

      <BottomNav active="inicio" />
    </div>
  );
};

export const NewAnalysis = () => {
  const [, setLocation] = useLocation();
  const [gondolaFile, setGondolaFile] = useState(null);
  const [planogramaFile, setPlanogramaFile] = useState(null);

  const handleProcessar = async (e) => {
    e.preventDefault();
    if (!gondolaFile || !planogramaFile) {
      alert("Por favor, selecione a foto da gôndola e o planograma.");
      return;
    }
    setLocation("/analyses/processing");
  };

  return (
    <div className="screen">
      <div className="top-bar">
        <Link href="/dashboard"><button className="back-btn">‹</button></Link>
        <h2>Nova auditoria</h2>
      </div>
      <form onSubmit={handleProcessar} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <label>1. Foto da gôndola: <input type="file" accept="image/*" onChange={(e) => setGondolaFile(e.target.files[0])} /></label>
        <label>2. Planograma: <input type="file" accept="image/*" onChange={(e) => setPlanogramaFile(e.target.files[0])} /></label>
        <button type="submit" className="btn-primary">🤖 Iniciar Análise com IA Real</button>
      </form>
    </div>
  );
};

export const AnalyzingProcess = () => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const t = setTimeout(() => setLocation("/analyses/123/result"), 1200);
    return () => clearTimeout(t);
  }, [setLocation]);

  return (
    <div className="screen" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <h2>A analisar com IA...</h2>
    </div>
  );
};

export const AnalysisResult = () => (
  <div className="screen" style={{ paddingBottom: "40px", backgroundColor: "#F8FAFC", overflowY: "auto" }}>
    <div className="top-bar" style={{ background: "white", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>
      <Link href="/dashboard"><button className="back-btn">‹</button></Link>
      <h2>Relatório de Auditoria</h2>
    </div>
    <div style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A" }}>78%</h1>
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <button className="btn-primary" style={{ marginTop: "10px" }}>Concluir e Voltar ao Início</button>
      </Link>
    </div>
  </div>
);

export const History = () => (
  <div className="screen" style={{ paddingBottom: "90px", backgroundColor: "#F8FAFC" }}>
    <div style={{ background: "white", padding: "16px", borderBottom: "1px solid #E2E8F0" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Histórico de Auditorias</h2>
    </div>
    <div style={{ padding: "16px" }}>
      <div style={{ background: "white", padding: "14px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", margin: 0 }}>Corredor 04 · Conservas</h4>
        <span style={{ fontSize: "12px", color: "#64748B" }}>Hoje, 08:30 · IGE 78%</span>
      </div>
    </div>
    <BottomNav active="historico" />
  </div>
);

export const Profile = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="screen" style={{ paddingBottom: "90px", backgroundColor: "#F8FAFC" }}>
      <div style={{ background: "white", padding: "24px 16px", borderBottom: "1px solid #E2E8F0", textAlign: "center" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Ana Martins</h2>
        <span style={{ fontSize: "12px", color: "#64748B" }}>Matrícula #4029</span>
      </div>
      <div style={{ padding: "16px" }}>
        <button onClick={() => { localStorage.removeItem("logado"); setLocation("/"); }} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "700", width: "100%", cursor: "pointer" }}>
          Sair da Conta
        </button>
      </div>
      <BottomNav active="perfil" />
    </div>
  );
};

export const GuidedCamera = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const ReviewPhoto = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const OccurrencesList = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const OccurrenceDetail = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const AnalysisSuccess = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const NotFound = () => <div className="screen"><h2>404</h2></div>;

const BottomNav = ({ active }) => {
  const navItems = [
    {
      id: "inicio",
      label: "Início",
      path: "/dashboard",
      svg: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={isActive ? "#1E40AF" : "none"} stroke={isActive ? "#1E40AF" : "#64748B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      id: "historico",
      label: "Histórico",
      path: "/history",
      svg: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#1E40AF" : "#64748B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1.05 12A11 11 0 1 1 3.2 18.9L1 21"></path>
          <polyline points="1 13 1 21 9 21"></polyline>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      id: "perfil",
      label: "Perfil",
      path: "/profile",
      svg: (isActive) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#1E40AF" : "#64748B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "430px", background: "white", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", padding: "10px 0", zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,0.03)" }}>
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <Link key={item.id} href={item.path} style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "4px 16px", borderRadius: "10px" }}>
            {item.svg(isActive)}
            <span style={{ fontSize: "11px", fontWeight: isActive ? "700" : "500", color: isActive ? "#1E40AF" : "#64748B" }}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};
