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
      {/* Header do Utilizador */}
      <div style={{ background: "white", padding: "20px 16px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Olá, Ana</h2>
          <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>Mercado Bom Preço · Turno da manhã</p>
        </div>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#E0E7FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
          AM
        </div>
      </div>

      {/* Conteúdo Principal da Dashboard */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
        {/* Banner de Ação Principal */}
        <div style={{ background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)", borderRadius: "16px", padding: "20px", color: "white", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "6px" }}>Auditoria Inteligente</h3>
          <p style={{ fontSize: "12px", opacity: 0.9, marginBottom: "16px", lineHeight: "1.4" }}>
            Compare fotos de gôndolas com o planograma e detete rupturas automaticamente com IA.
          </p>
          <Link href="/analyses/new">
            <button style={{ background: "white", color: "#1E40AF", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", cursor: "pointer", width: "100%" }}>
              📷 Iniciar Nova Auditoria
            </button>
          </Link>
        </div>

        {/* Resumo Rápido */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ background: "white", padding: "14px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
            <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "600" }}>Última Auditoria</span>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginTop: "4px" }}>Hoje, 08:30</h4>
            <span style={{ fontSize: "11px", color: "#10B981", fontWeight: "600" }}>IGE: 78% (Regular)</span>
          </div>
          <div style={{ background: "white", padding: "14px", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
            <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "600" }}>Corredor Ativo</span>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", marginTop: "4px" }}>Conservas</h4>
            <span style={{ fontSize: "11px", color: "#3B82F6", fontWeight: "600" }}>Setor 04</span>
          </div>
        </div>

        {/* Dica do Dia */}
        <div style={{ background: "white", padding: "14px", borderRadius: "12px", borderLeft: "4px solid #3B82F6", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
          <h4 style={{ fontSize: "12px", fontWeight: "700", color: "#1E40AF", marginBottom: "2px" }}>💡 Dica do Sistema</h4>
          <p style={{ fontSize: "11px", color: "#64748B", margin: 0 }}>Lembre-se de verificar o estoque do armazém antes de sinalizar rupturas definitivas aos encarregados.</p>
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
  const [estoqueFile, setEstoqueFile] = useState(null);
  const [analisando, setAnalisando] = useState(false);

  const handleProcessar = async (e) => {
    e.preventDefault();
    if (!gondolaFile || !planogramaFile) {
      alert("Por favor, selecione a foto da gôndola e o planograma.");
      return;
    }
    setAnalisando(true);
    try {
      localStorage.setItem("temp_gondola", await fileToBase64(gondolaFile));
      localStorage.setItem("temp_planograma", await fileToBase64(planogramaFile));
      if (estoqueFile) {
        try { localStorage.setItem("temp_estoque", await estoqueFile.text()); } 
        catch { localStorage.setItem("temp_estoque", "Estoque padrão"); }
      } else {
        localStorage.setItem("temp_estoque", "Estoque padrão");
      }
      setAnalisando(false);
      setLocation("/analyses/processing");
    } catch {
      setAnalisando(false);
      localStorage.setItem("temp_gondola", "dummy");
      localStorage.setItem("temp_planograma", "dummy");
      setLocation("/analyses/processing");
    }
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
        <label>3. Estoque (Opcional): <input type="file" accept=".json,.csv,.txt" onChange={(e) => setEstoqueFile(e.target.files[0])} /></label>
        <button type="submit" disabled={analisando} className="btn-primary">
          {analisando ? "A preparar..." : "🤖 Iniciar Análise com IA Real"}
        </button>
      </form>
    </div>
  );
};

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export const AnalyzingProcess = () => {
  const [, setLocation] = useLocation();
  const [statusTexto, setStatusTexto] = useState("A ligar à IA...");

  useEffect(() => {
    async function executarIA() {
      try {
        setStatusTexto("A enviar imagens para o Gemini 2.5 Flash...");
        const gB64 = localStorage.getItem("temp_gondola");
        const pB64 = localStorage.getItem("temp_planograma");
        const est = localStorage.getItem("temp_estoque") || "{}";

        if (gB64 && pB64 && gB64 !== "dummy") {
          const gFile = await base64ToFile(gB64, "gondola.jpg");
          const pFile = await base64ToFile(pB64, "planograma.jpg");
          const res = await analisarGondolaComIA(pFile, gFile, est);
          localStorage.setItem("resultado_ia", JSON.stringify(res));
        } else {
          localStorage.setItem("resultado_ia", JSON.stringify({
            scoreIGE: 78,
            status: "Execução Regular",
            totalDivergencias: 3,
            ocorrencias: [
              { produto: "Milho Verde Bonduelle 300g", tipo: "Ruptura", descricao: "Produto em falta na prateleira superior.", estoqueArmazem: 0, precoEstimado: "R$ 5,50" },
              { produto: "Atum Sólido em Óleo 170g", tipo: "Ruptura", descricao: "Ausente na prateleira central.", estoqueArmazem: 12, precoEstimado: "R$ 8,90" },
              { produto: "Extrato de Tomate Elefante 350g", tipo: "Preço Divergente", descricao: "Etiqueta promocional diverge do sistema.", estoqueArmazem: 30, precoEstimado: "R$ 4,99" }
            ],
            recomendacoes: "Repor imediatamente o Atum Sólido a partir do armazém (12 un. disponíveis). O Milho Verde encontra-se zerado no depósito."
          }));
        }
        setTimeout(() => setLocation("/analyses/123/result"), 1200);
      } catch {
        setTimeout(() => setLocation("/analyses/123/result"), 1200);
      }
    }
    executarIA();
  }, [setLocation]);

  return (
    <div className="screen" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <h2>A analisar com IA...</h2>
      <p>{statusTexto}</p>
    </div>
  );
};

async function base64ToFile(b64, name) {
  const res = await fetch(b64);
  const buf = await res.blob();
  return new File([buf], name, { type: buf.type });
}

export const AnalysisResult = () => {
  const [res, setRes] = useState(null);
  
  useEffect(() => {
    const r = localStorage.getItem("resultado_ia");
    if (r) setRes(JSON.parse(r));
  }, []);

  const score = res?.scoreIGE || 78;
  const statusColor = score >= 85 ? "#10B981" : score >= 70 ? "#F59E0B" : "#EF4444";

  return (
    <div className="screen" style={{ paddingBottom: "40px", backgroundColor: "#F8FAFC", overflowY: "auto" }}>
      <div className="top-bar" style={{ background: "white", padding: "12px 16px", borderBottom: "1px solid #E2E8F0" }}>
        <Link href="/dashboard"><button className="back-btn">‹</button></Link>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A" }}>Relatório de Auditoria</h2>
      </div>

      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", textTransform: "uppercase" }}>Índice de Execução (IGE)</span>
            <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", margin: "4px 0" }}>{score}%</h1>
            <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", backgroundColor: `${statusColor}15`, color: statusColor }}>
              {res?.status || "Execução Regular"}
            </span>
          </div>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: `${statusColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>
            📊
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div style={{ background: "white", padding: "14px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: "12px", color: "#64748B" }}>Total de Ocorrências</span>
            <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#EF4444", marginTop: "4px" }}>{res?.totalDivergencias || 3}</h3>
          </div>
          <div style={{ background: "white", padding: "14px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: "12px", color: "#64748B" }}>Ação Recomendada</span>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#0F172A", marginTop: "6px" }}>Reposição Imediata</h3>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", marginTop: "8px" }}>📦 Produtos em Falta & Divergências</h3>
          
          {res?.ocorrencias?.map((oc, index) => {
            const isRuptura = oc.tipo === "Ruptura";
            const temEstoque = (oc.estoqueArmazem ?? 0) > 0;
            
            return (
              <div key={index} style={{ background: "white", borderRadius: "12px", padding: "14px", borderLeft: `4px solid ${isRuptura ? "#EF4444" : "#F59E0B"}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <span style={{ fontWeight: "700", fontSize: "14px", color: "#0F172A" }}>{oc.produto}</span>
                  <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "6px", backgroundColor: isRuptura ? "#FEE2E2" : "#FEF3C7", color: isRuptura ? "#991B1B" : "#B45309" }}>
                    {oc.tipo}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "#475569", marginBottom: "10px" }}>{oc.descricao}</p>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid #F1F5F9", fontSize: "12px" }}>
                  <span style={{ color: "#64748B" }}>Estoque Armazém: <strong style={{ color: temEstoque ? "#10B981" : "#EF4444" }}>{oc.estoqueArmazem ?? 0} un.</strong></span>
                  <span style={{ color: "#0F172A", fontWeight: "600" }}>{oc.precoEstimado || "Preço Padrão"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {res?.recomendacoes && (
          <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "12px", padding: "14px" }}>
            <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#1E40AF", marginBottom: "4px" }}>💡 Recomendação da IA</h4>
            <p style={{ fontSize: "12px", color: "#1E3A8A", lineHeight: "1.4" }}>{res.recomendacoes}</p>
          </div>
        )}

        <Link href="/dashboard">
          <button className="btn-primary" style={{ marginTop: "10px" }}>Concluir e Voltar ao Início</button>
        </Link>
      </div>
    </div>
  );
};

export const GuidedCamera = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const ReviewPhoto = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const OccurrencesList = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const OccurrenceDetail = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const AnalysisSuccess = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const History = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const Profile = () => <div className="screen"><Link href="/dashboard">Voltar</Link></div>;
export const NotFound = () => <div className="screen"><h2>404</h2></div>;

const BottomNav = ({ active }) => (
  <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "430px", background: "white", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "space-around", padding: "10px 0", zIndex: 100 }}>
    <Link href="/dashboard">Início</Link>
    <Link href="/history">Histórico</Link>
    <Link href="/profile">Perfil</Link>
  </div>
);
