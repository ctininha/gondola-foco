import React, { useState } from "react";
import { Link, useLocation } from "wouter";

// --- T01 · ENTRAR (LOGIN FAKE) ---
export const Login = () => {
  const [, setLocation] = useLocation();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");
    if (!matricula || !senha) {
      setErro("Insira qualquer matrícula e senha para entrar.");
      return;
    }
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      localStorage.setItem("logado", "true"); // Guarda a sessão no navegador
      setLocation("/dashboard");
    }, 600);
  };

  return (
    <div className="screen-no-nav" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#FFFFFF", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#1366E5", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "16px", boxShadow: "0 8px 20px rgba(19, 102, 229, 0.25)" }}>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginBottom: "4px", textAlign: "center" }}>GôndolaFoco</h1>
        <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", marginBottom: "24px" }}>
          De olho na gôndola, foco no resultado
        </p>

        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", marginBottom: "6px" }}>Matrícula</label>
            <input type="text" placeholder="Ex.: 104532" value={matricula} onChange={(e) => setMatricula(e.target.value)} style={{ width: "100%", padding: "12px 16px", fontSize: "15px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", marginBottom: "6px" }}>Senha</label>
            <div style={{ position: "relative" }}>
              <input type={mostrarSenha ? "text" : "password"} placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} style={{ width: "100%", padding: "12px 16px", fontSize: "15px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A", paddingRight: "70px" }} />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748B", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {erro && <div style={{ padding: "10px", backgroundColor: "#FEE2E2", border: "1px solid #FECACA", color: "#DC2626", fontSize: "12px", borderRadius: "8px", textAlign: "center", fontWeight: "600" }}>{erro}</div>}

          <button type="submit" disabled={carregando} className="btn-primary" style={{ marginTop: "6px" }}>
            {carregando ? "A entrar..." : "Entrar no Sistema"}
          </button>
        </form>
        <div style={{ marginTop: "24px", color: "#94A3B8", fontSize: "11px" }}>TCC · Simulação Funcional</div>
      </div>
    </div>
  );
};

// --- T02 · INÍCIO (DASHBOARD) ---
export const Dashboard = () => {
  const [, setLocation] = useLocation();

  // Segurança: se não estiver logado, redireciona para o login na raiz
  if (!localStorage.getItem("logado")) {
    setLocation("/");
    return null;
  }

  const [corredores] = useState([
    { id: 1, nome: "Corredor 1 · Mercearia", status: "Concluído", info: "Auditado às 08:12 · nota 98", badgeClass: "badge-success", rota: "/dashboard" },
    { id: 2, nome: "Corredor 2 · Bebidas", status: "Concluído", info: "Auditado às 09:03 · nota 100", badgeClass: "badge-success", rota: "/dashboard" },
    { id: 3, nome: "Corredor 3 · Limpeza", status: "Ocorrências", info: "Auditado às 10:41 · 2 ocorrências", badgeClass: "badge-warning", rota: "/analyses/occurrences/1" },
    { id: 4, nome: "Corredor 4 · Laticínios", status: "Pendente", info: "Próximo da sua lista", badgeClass: "badge-neutral", rota: "/analyses/new", destaque: true },
    { id: 5, nome: "Corredor 5 · Hortifrúti", status: "Pendente", info: "Pendente na fila", badgeClass: "badge-neutral", rota: "/analyses/new" },
  ]);

  return (
    <div className="screen" style={{ paddingBottom: "140px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A" }}>Olá, Ana</h2>
          <p style={{ fontSize: "13px", color: "#64748B" }}>Mercado Bom Preço · Turno da manhã</p>
        </div>
        <div style={{ width: "40px", height: "40px", backgroundColor: "#EBF3FE", color: "#1366E5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }}>A</div>
      </div>

      <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "4px" }}>Hoje</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "10px" }}>3 de 5 <span style={{ fontSize: "14px", fontWeight: "500", color: "#64748B" }}>corredores auditados</span></div>
        <div style={{ width: "100%", height: "8px", backgroundColor: "#E2E8F0", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: "60%", height: "100%", backgroundColor: "#1366E5", borderRadius: "4px" }}></div>
        </div>
      </div>

      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>Corredores</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "70px" }}>
        {corredores.map((c) => (
          <Link key={c.id} href={c.rota} style={{ textDecoration: "none" }}>
            <div style={{ padding: "14px 16px", backgroundColor: c.destaque ? "#F8FAFC" : "#FFFFFF", border: c.destaque ? "2px solid #1366E5" : "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>{c.nome}</div>
                <div style={{ fontSize: "12px", color: "#64748B" }}>{c.info}</div>
              </div>
              <span className={`badge ${c.badgeClass}`}>{c.status}</span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ position: "fixed", bottom: "72px", left: "0", right: "0", maxWidth: "430px", margin: "0 auto", padding: "0 20px", zIndex: 45 }}>
        <Link href="/analyses/new" style={{ textDecoration: "none" }}>
          <button className="btn-primary" style={{ boxShadow: "0 10px 25px rgba(19, 102, 229, 0.3)" }}>
            📷 Nova auditoria
          </button>
        </Link>
      </div>

      <BottomNav active="inicio" />
    </div>
  );
};

// --- T03 · NOVA AUDITORIA ---
export const NewAnalysis = () => {
  const [, setLocation] = useLocation();
  const [gondolaFile, setGondolaFile] = useState(null);
  const [planogramaFile, setPlanogramaFile] = useState(null);
  const [estoqueFile, setEstoqueFile] = useState(null);
  const [analisando, setAnalisando] = useState(false);

  const handleProcessar = (e) => {
    e.preventDefault();
    setAnalisando(true);
    setTimeout(() => {
      setAnalisando(false);
      setLocation("/analyses/processing");
    }, 1000);
  };

  return (
    <div className="screen" style={{ paddingBottom: "100px" }}>
      <div className="top-bar">
        <Link href="/dashboard"><button className="back-btn">‹</button></Link>
        <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Nova auditoria</h2>
      </div>

      <div style={{ fontSize: "11px", fontWeight: "700", color: "#1366E5", textTransform: "uppercase", marginBottom: "4px" }}>Passo 1 de 2 · TCC</div>
      <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Carregar Fotos e Base Local</h3>

      <form onSubmit={handleProcessar} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "12px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>1. Foto real da gôndola</label>
          <input type="file" accept="image/*" onChange={(e) => setGondolaFile(e.target.files[0])} style={{ fontSize: "11px", width: "100%" }} />
          {gondolaFile && <div style={{ fontSize: "11px", color: "#16A34A", marginTop: "4px" }}>✓ {gondolaFile.name}</div>}
        </div>

        <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "12px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>2. Foto do Planograma</label>
          <input type="file" accept="image/*" onChange={(e) => setPlanogramaFile(e.target.files[0])} style={{ fontSize: "11px", width: "100%" }} />
          {planogramaFile && <div style={{ fontSize: "11px", color: "#16A34A", marginTop: "4px" }}>✓ {planogramaFile.name}</div>}
        </div>

        <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "12px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>3. Base de Estoque & Preços (.json/.csv)</label>
          <input type="file" accept=".json,.csv,.txt" onChange={(e) => setEstoqueFile(e.target.files[0])} style={{ fontSize: "11px", width: "100%" }} />
          {estoqueFile && <div style={{ fontSize: "11px", color: "#16A34A", marginTop: "4px" }}>✓ {estoqueFile.name}</div>}
        </div>

        <button type="submit" disabled={analisando} className="btn-primary" style={{ marginTop: "6px" }}>
          {analisando ? "A preparar..." : "📸 Avançar para câmara / revisão"}
        </button>
      </form>
    </div>
  );
};

// --- T04 · CÂMERA GUIADA ---
export const GuidedCamera = () => (
  <div className="screen-no-nav" style={{ backgroundColor: "#0F172A", color: "white", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link href="/analyses/new"><button style={{ background: "none", border: "none", color: "white", fontSize: "24px", cursor: "pointer" }}>✕</button></Link>
      <div style={{ display: "flex", gap: "8px" }}>
        <span style={{ backgroundColor: "#16A34A", color: "white", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px" }}>Luz boa</span>
        <span style={{ backgroundColor: "#16A34A", color: "white", fontSize: "11px", fontWeight: "700", padding: "4px 8px", borderRadius: "6px" }}>Nitidez boa</span>
      </div>
      <button style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>⚡</button>
    </div>

    <div style={{ border: "2px dashed rgba(255,255,255,0.4)", borderRadius: "16px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", margin: "20px 0" }}>
      <span style={{ fontSize: "36px" }}>📷</span>
      <p style={{ fontSize: "13px", color: "#94A3B8", textAlign: "center", padding: "0 20px" }}>Enquadre a gôndola inteira · evite pessoas</p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ fontSize: "12px", color: "#94A3B8" }}>Simulação de Captura</div>
      <Link href="/analyses/review" style={{ textDecoration: "none", width: "100%", display: "flex", justifyContent: "center" }}>
        <button style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "white", border: "4px solid #1366E5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#1366E5" }}></div>
        </button>
      </Link>
    </div>
  </div>
);

// --- T05 · REVISAR FOTO ---
export const ReviewPhoto = () => (
  <div className="screen">
    <div className="top-bar">
      <Link href="/analyses/camera"><button className="back-btn">‹</button></Link>
      <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Revisar foto</h2>
    </div>

    <div style={{ backgroundColor: "#0F172A", borderRadius: "14px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "16px" }}>
      [ Pré-visualização da foto da gôndola ]
    </div>

    <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>Checagem da foto</h3>
    
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#16A34A", fontWeight: "600" }}>✓ Nítida</div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#16A34A", fontWeight: "600" }}>✓ Boa iluminação</div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#16A34A", fontWeight: "600" }}>✓ Gôndola inteira no quadro</div>
    </div>

    <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
      <Link href="/analyses/camera" style={{ flex: 1, textDecoration: "none" }}>
        <button className="btn-outline">Refazer</button>
      </Link>
      <Link href="/analyses/processing" style={{ flex: 1, textDecoration: "none" }}>
        <button className="btn-primary">Enviar para análise</button>
      </Link>
    </div>
  </div>
);

// --- T06 · ANALISANDO ---
export const AnalyzingProcess = () => (
  <div className="screen" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    <div style={{ width: "100px", height: "100px", borderRadius: "50%", border: "6px solid #E2E8F0", borderTopColor: "#1366E5", margin: "0 auto 20px" }}></div>
    
    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "8px" }}>Analisando gôndola e cruzando estoque</h2>
    <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>A processar IA e ficheiro local...</p>

    <div style={{ width: "100%", textAlign: "left", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#16A34A", fontWeight: "600" }}>✓ Fotos carregadas</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#1366E5", fontWeight: "700" }}>⏳ Comparando com o planograma</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#1366E5", fontWeight: "700" }}>⏳ Cruzando preços com arquivo local</div>
    </div>

    <Link href="/analyses/123/result" style={{ width: "100%", textDecoration: "none" }}>
      <button className="btn-primary">Ver Relatório de Divergências</button>
    </Link>
  </div>
);

// --- T07 · RESULTADO ---
export const AnalysisResult = () => (
  <div className="screen" style={{ paddingBottom: "100px" }}>
    <div className="top-bar">
      <Link href="/dashboard"><button className="back-btn">‹</button></Link>
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Resultado da Análise</h2>
        <p style={{ fontSize: "11px", color: "#64748B" }}>Corredor 4 · Cruzado com base local</p>
      </div>
    </div>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "18px", textAlign: "center", marginBottom: "16px" }}>
      <div style={{ width: "90px", height: "90px", borderRadius: "50%", border: "6px solid #16A34A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
        <span style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A", lineHeight: "1" }}>88</span>
        <span style={{ fontSize: "10px", color: "#64748B", fontWeight: "600" }}>IGE</span>
      </div>
      <div style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A" }}>Execução Regular · 2 Divergências</div>
    </div>

    <Link href="/analyses/occurrences/1" style={{ textDecoration: "none" }}>
      <button className="btn-primary">Ver Ocorrências Detalhadas e Estoque</button>
    </Link>
  </div>
);

// --- T08 · OCORRÊNCIAS ---
export const OccurrencesList = () => (
  <div className="screen" style={{ paddingBottom: "100px" }}>
    <div className="top-bar">
      <Link href="/analyses/123/result"><button className="back-btn">‹</button></Link>
      <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Ocorrências</h2>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
      <Link href="/analyses/occurrences/detail" style={{ textDecoration: "none" }}>
        <div style={{ padding: "14px", backgroundColor: "white", border: "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>Leite Integral 1L</div>
            <div style={{ fontSize: "12px", color: "#166534", marginBottom: "4px" }}>📦 Estoque: 12 un no armazém (Repor)</div>
            <span className="badge badge-danger">Ruptura</span>
          </div>
          <span style={{ fontSize: "18px", color: "#94A3B8" }}>›</span>
        </div>
      </Link>

      <Link href="/analyses/occurrences/detail" style={{ textDecoration: "none" }}>
        <div style={{ padding: "14px", backgroundColor: "white", border: "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>Achocolatado 400g</div>
            <div style={{ fontSize: "12px", color: "#B45309", marginBottom: "4px" }}>⚠️ Etiqueta R$ 7,49 | Sistema R$ 7,99</div>
            <span className="badge badge-warning">Preço Divergente</span>
          </div>
          <span style={{ fontSize: "18px", color: "#94A3B8" }}>›</span>
        </div>
      </Link>
    </div>

    <Link href="/analyses/123/success" style={{ textDecoration: "none" }}>
      <button className="btn-primary">Concluir tratativa</button>
    </Link>
  </div>
);

// --- T09 · DETALHE DA OCORRÊNCIA ---
export const OccurrenceDetail = () => (
  <div className="screen">
    <div className="top-bar">
      <Link href="/analyses/occurrences/1"><button className="back-btn">‹</button></Link>
      <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Detalhe da Ocorrência</h2>
    </div>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "16px", marginBottom: "16px" }}>
      <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", marginBottom: "4px" }}>Achocolatado em pó 400g</div>
      <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "12px" }}>Prateleira 2 · Posição 4</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid #E2E8F0", textAlign: "center" }}>
          <div style={{ fontSize: "10px", color: "#64748B" }}>Na Etiqueta</div>
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#DC2626" }}>R$ 7,49</div>
        </div>
        <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px", border: "1px solid #E2E8F0", textAlign: "center" }}>
          <div style={{ fontSize: "10px", color: "#64748B" }}>No Sistema/Arquivo</div>
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#16A34A" }}>R$ 7,99</div>
        </div>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
      <Link href="/analyses/123/success" style={{ textDecoration: "none" }}>
        <button className="btn-primary">Marcar como resolvido</button>
      </Link>
    </div>
  </div>
);

// --- T10 · CONCLUSÃO ---
export const AnalysisSuccess = () => (
  <div className="screen" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    <div style={{ width: "80px", height: "80px", backgroundColor: "#DCFCE7", color: "#16A34A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", margin: "0 auto 16px" }}>
      ✓
    </div>

    <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>Corredor 4 Concluído</h2>
    <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>Ocorrências tratadas e reportadas com sucesso!</p>

    <Link href="/dashboard" style={{ textDecoration: "none", width: "100%" }}>
      <button className="btn-primary">Voltar ao Início</button>
    </Link>
  </div>
);

// --- T11 · HISTÓRICO / DASHBOARD GERENCIAL ---
export const History = () => (
  <div className="screen" style={{ paddingBottom: "100px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>Dashboard Gerencial</h2>
    <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "16px" }}>Visão do Dono · Histórico de Divergências</p>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
      <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "2px" }}>Nota Média Geral da Loja</div>
      <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A", marginBottom: "6px" }}>93 / 100</div>
      <div style={{ fontSize: "11px", color: "#16A34A", fontWeight: "700" }}>✓ Sem rupturas críticas hoje</div>
    </div>

    <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>Auditorias Hoje</h3>
    
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
      <div style={{ padding: "14px", backgroundColor: "white", border: "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>Corredor 4 · Laticínios</div>
          <div style={{ fontSize: "12px", color: "#64748B" }}>14:32 · 2 divergências tratadas</div>
        </div>
        <span className="badge badge-success">88</span>
      </div>
    </div>

    <BottomNav active="historico" />
  </div>
);

// --- T12 · PERFIL ---
export const Profile = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="screen" style={{ paddingBottom: "100px", alignItems: "center", textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", backgroundColor: "#EBF3FE", color: "#1366E5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "24px", margin: "16px auto 12px" }}>A</div>
      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>Ana · Repositora</h2>
      <p style={{ fontSize: "12px", color: "#64748B", marginBottom: "24px" }}>Mercado Bom Preço</p>

      <div style={{ width: "100%", marginTop: "20px" }}>
        <button 
          onClick={() => { 
            localStorage.removeItem("logado"); // Limpa a sessão ao sair
            setLocation("/"); 
          }} 
          style={{ width: "100%", minHeight: "50px", backgroundColor: "white", color: "#DC2626", border: "1.5px solid #DC2626", borderRadius: "14px", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}
        >
          Sair da Conta
        </button>
      </div>

      <BottomNav active="perfil" />
    </div>
  );
};

// --- BARRA DE NAVEGAÇÃO INFERIOR ---
const BottomNav = ({ active }) => (
  <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "430px", background: "white", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-around", padding: "10px 0 14px", zIndex: 50 }}>
    <Link href="/dashboard" style={{ textDecoration: "none" }}>
      <button className={`nav-item ${active === 'inicio' ? 'active' : ''}`}>
        <span>🏠</span>
        <span>Início</span>
      </button>
    </Link>
    <Link href="/history" style={{ textDecoration: "none" }}>
      <button className={`nav-item ${active === 'historico' ? 'active' : ''}`}>
        <span>📊</span>
        <span>Histórico</span>
      </button>
    </Link>
    <Link href="/profile" style={{ textDecoration: "none" }}>
      <button className={`nav-item ${active === 'perfil' ? 'active' : ''}`}>
        <span>👤</span>
        <span>Perfil</span>
      </button>
    </Link>
  </div>
);

export const NotFound = () => <div className="screen"><h2>404 - Página não encontrada</h2><Link href="/">Início</Link></div>;
