import React, { useState } from "react";
import { Link, useLocation } from "wouter";

// --- T01 · ENTRAR ---
export const Login = () => {
  const [, setLocation] = useLocation();
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");
    if (!matricula || !senha) {
      setErro("Matrícula ou senha incorretas.");
      return;
    }
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setLocation("/dashboard");
    }, 800);
  };

  return (
    <div className="screen-no-nav" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#FFFFFF" }}>
      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#1366E5", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "16px", boxShadow: "0 8px 20px rgba(19, 102, 229, 0.25)" }}>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginBottom: "4px", textAlign: "center", letterSpacing: "-0.5px" }}>GôndolaFoco</h1>
        <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", marginBottom: "28px", lineHeight: "1.4" }}>
          De olho na gôndola, foco no resultado
        </p>

        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Matrícula</label>
            <input type="text" placeholder="Ex.: 104532" value={matricula} onChange={(e) => setMatricula(e.target.value)} style={{ width: "100%", padding: "12px 16px", fontSize: "15px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Senha</label>
            <div style={{ position: "relative" }}>
              <input type={mostrarSenha ? "text" : "password"} placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} style={{ width: "100%", padding: "12px 16px", fontSize: "15px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A", paddingRight: "70px" }} />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748B", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {erro && <div style={{ padding: "12px", backgroundColor: "#FEE2E2", border: "1px solid #FECACA", color: "#DC2626", fontSize: "13px", borderRadius: "10px", textAlign: "center", fontWeight: "600" }}>{erro}</div>}

          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0" }}>
            <input type="checkbox" id="manter" checked={manterConectado} onChange={(e) => setManterConectado(e.target.checked)} style={{ width: "18px", height: "18px", accentColor: "#1366E5", cursor: "pointer", borderRadius: "4px" }} />
            <label htmlFor="manter" style={{ fontSize: "13px", color: "#475569", cursor: "pointer", userSelect: "none" }}>Manter conectado neste turno</label>
          </div>

          <button type="submit" disabled={carregando} className="btn-primary" style={{ marginTop: "4px" }}>
            {carregando ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a href="#esqueci" onClick={(e) => { e.preventDefault(); alert("Contacte o administrador da loja."); }} style={{ fontSize: "13px", color: "#1366E5", textDecoration: "none", fontWeight: "600" }}>Esqueci minha senha</a>
        </div>
        <div style={{ marginTop: "32px", textAlign: "center", color: "#94A3B8", fontSize: "11px" }}>Versão 1.0 · dados de exemplo</div>
      </div>
    </div>
  );
};

// --- T02 · INÍCIO ---
export const Dashboard = () => {
  const [corredores] = useState([
    { id: 1, nome: "Corredor 1 · Mercearia", status: "Concluído", info: "Auditado às 08:12 · nota 98", badgeClass: "badge-success", rota: "/dashboard" },
    { id: 2, nome: "Corredor 2 · Bebidas", status: "Concluído", info: "Auditado às 09:03 · nota 100", badgeClass: "badge-success", rota: "/dashboard" },
    { id: 3, nome: "Corredor 3 · Limpeza", status: "Ocorrências", info: "Auditado às 10:41 · 2 ocorrências", badgeClass: "badge-warning", rota: "/analyses/occurrences/1" },
    { id: 4, nome: "Corredor 4 · Laticínios", status: "Pendente", info: "Próximo da sua lista", badgeClass: "badge-neutral", rota: "/analyses/new", destaque: true },
    { id: 5, nome: "Corredor 5 · Hortifrúti", status: "Pendente", info: "Pendente", badgeClass: "badge-neutral", rota: "/analyses/new" },
  ]);

  return (
    <div className="screen" style={{ paddingBottom: "100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A" }}>Olá, Ana</h2>
          <p style={{ fontSize: "13px", color: "#64748B" }}>Mercado Bom Preço · turno da manhã</p>
        </div>
        <div style={{ width: "40px", height: "40px", backgroundColor: "#EBF3FE", color: "#1366E5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }}>A</div>
      </div>

      <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "4px" }}>Hoje</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "10px" }}>3 de 8 <span style={{ fontSize: "14px", fontWeight: "500", color: "#64748B" }}>corredores auditados</span></div>
        <div style={{ width: "100%", height: "8px", backgroundColor: "#E2E8F0", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: "37.5%", height: "100%", backgroundColor: "#1366E5", borderRadius: "4px" }}></div>
        </div>
      </div>

      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>Corredores</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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

      <div style={{ position: "fixed", bottom: "75px", left: "20px", right: "20px", maxWidth: "390px", margin: "0 auto", zIndex: 40 }}>
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
export const NewAnalysis = () => (
  <div className="screen">
    <div className="top-bar">
      <Link href="/dashboard"><button className="back-btn">‹</button></Link>
      <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Nova auditoria</h2>
    </div>

    <div style={{ fontSize: "11px", fontWeight: "700", color: "#1366E5", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Passo 1 de 2</div>
    <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "20px" }}>Escolha a gôndola</h3>

    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Corredor</label>
      <select style={{ width: "100%", padding: "12px 16px", fontSize: "14px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A", fontWeight: "600" }}>
        <option>Corredor 4 · Laticínios</option>
        <option>Corredor 5 · Hortifrúti</option>
      </select>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Gôndola ou módulo</label>
      <select style={{ width: "100%", padding: "12px 16px", fontSize: "14px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A", fontWeight: "600" }}>
        <option>Módulo B · início</option>
        <option>Módulo B · fim</option>
      </select>
    </div>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "16px", marginBottom: "24px" }}>
      <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>O que deve estar aqui</div>
      <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "12px" }}>Planograma v12 · 42 produtos esperados</div>
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: "12px", fontWeight: "600" }}>
        [ Esquema visual do Planograma ]
      </div>
      <div style={{ fontSize: "11px", color: "#64748B", textAlign: "center", marginTop: "10px" }}>Fotografe a gôndola inteira, de frente e sem pessoas.</div>
    </div>

    <Link href="/analyses/camera" style={{ textDecoration: "none" }}>
      <button className="btn-primary">📸 Abrir câmara</button>
    </Link>
  </div>
);

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
      <div style={{ fontSize: "12px", color: "#94A3B8" }}>Foto 1 de 1</div>
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
      <div style={{ padding: "10px 12px", backgroundColor: "#FEF3C7", border: "1.5px solid #FDE68A", borderRadius: "10px", fontSize: "12px", color: "#B45309", fontWeight: "600" }}>
        ⚠ Reflexo leve na prateleira 2: pode afetar a leitura
      </div>
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
    
    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "8px" }}>Analisando a sua gôndola</h2>
    <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>2 de 4 etapas concluídas</p>

    <div style={{ width: "100%", textAlign: "left", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#16A34A", fontWeight: "600" }}>✓ Foto enviada</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#1366E5", fontWeight: "700" }}>⏳ Comparando com o planograma</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>○ Lendo os preços das etiquetas</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#94A3B8", fontWeight: "600" }}>○ Calculando os índices</div>
    </div>

    <Link href="/analyses/123/result" style={{ width: "100%", textDecoration: "none" }}>
      <button className="btn-outline">Ver resultado (simular término)</button>
    </Link>
  </div>
);

// --- T07 · RESULTADO ---
export const AnalysisResult = () => (
  <div className="screen">
    <div className="top-bar">
      <Link href="/dashboard"><button className="back-btn">‹</button></Link>
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Resultado</h2>
        <p style={{ fontSize: "11px", color: "#64748B" }}>Corredor 4 · Módulo B</p>
      </div>
    </div>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "20px", textAlign: "center", marginBottom: "16px" }}>
      <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: "8px solid #16A34A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
        <span style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", lineHeight: "1" }}>94</span>
        <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "600" }}>de 100</span>
      </div>
      <div style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>Índice geral de execução</div>
      <span className="badge badge-success">Bom</span>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "16px" }}>
      <div style={{ backgroundColor: "#DCFCE7", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#15803D", fontWeight: "700", marginBottom: "2px" }}>Ruptura</div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#15803D" }}>4%</div>
      </div>
      <div style={{ backgroundColor: "#DCFCE7", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#15803D", fontWeight: "700", marginBottom: "2px" }}>Planograma</div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#15803D" }}>92%</div>
      </div>
      <div style={{ backgroundColor: "#FEF3C7", padding: "12px", borderRadius: "12px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#B45309", fontWeight: "700", marginBottom: "2px" }}>Preço</div>
        <div style={{ fontSize: "16px", fontWeight: "800", color: "#B45309" }}>1 item</div>
      </div>
    </div>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "14px", padding: "14px", marginBottom: "20px" }}>
      <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>3 ocorrências para tratar</div>
      <div style={{ fontSize: "12px", color: "#64748B" }}>1 ruptura · 1 fora de posição · 1 preço divergente</div>
    </div>

    <Link href="/analyses/occurrences/1" style={{ textDecoration: "none", marginBottom: "8px" }}>
      <button className="btn-primary">Ver ocorrências</button>
    </Link>
  </div>
);

// --- T08 · OCORRÊNCIAS ---
export const OccurrencesList = () => (
  <div className="screen">
    <div className="top-bar">
      <Link href="/analyses/123/result"><button className="back-btn">‹</button></Link>
      <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Ocorrências</h2>
    </div>

    <div style={{ display: "flex", gap: "8px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px" }}>
      <span className="badge badge-success" style={{ padding: "6px 12px", cursor: "pointer" }}>Todas 3</span>
      <span className="badge badge-neutral" style={{ padding: "6px 12px", cursor: "pointer" }}>Ruptura 1</span>
      <span className="badge badge-neutral" style={{ padding: "6px 12px", cursor: "pointer" }}>Posição 1</span>
      <span className="badge badge-neutral" style={{ padding: "6px 12px", cursor: "pointer" }}>Preço 1</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
      <Link href="/analyses/occurrences/detail" style={{ textDecoration: "none" }}>
        <div style={{ padding: "14px", backgroundColor: "white", border: "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>Leite integral 1L</div>
            <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px" }}>Ausente na gôndola · Prateleira 2</div>
            <span className="badge badge-danger">Ruptura</span>
          </div>
          <span style={{ fontSize: "18px", color: "#94A3B8" }}>›</span>
        </div>
      </Link>

      <Link href="/analyses/occurrences/detail" style={{ textDecoration: "none" }}>
        <div style={{ padding: "14px", backgroundColor: "white", border: "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>Achocolatado em pó 400g</div>
            <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px" }}>Etiqueta R$ 7,49 · Sistema R$ 7,99</div>
            <span className="badge badge-warning">Preço divergente</span>
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
      <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Preço divergente</h2>
    </div>

    <div style={{ backgroundColor: "#0F172A", borderRadius: "14px", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "16px" }}>
      [ Recorte da etiqueta lida: R$ 7,49 ]
    </div>

    <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", marginBottom: "2px" }}>Achocolatado em pó 400g</div>
    <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "16px" }}>Prateleira 2 · Posição 4 · SKU 7891234</div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
      <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "12px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#64748B", fontWeight: "600", marginBottom: "2px" }}>Na etiqueta (foto)</div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#DC2626" }}>R$ 7,49</div>
      </div>
      <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", padding: "12px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#64748B", fontWeight: "600", marginBottom: "2px" }}>No sistema</div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#16A34A" }}>R$ 7,99</div>
      </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "auto" }}>
      <Link href="/analyses/123/success" style={{ textDecoration: "none" }}>
        <button className="btn-primary">Marcar como resolvido</button>
      </Link>
      <Link href="/analyses/occurrences/1" style={{ textDecoration: "none" }}>
        <button className="btn-outline">Não consegui resolver</button>
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

    <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>Corredor 4 concluído</h2>
    <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>Módulo B · 3 de 3 ocorrências resolvidas</p>

    <div style={{ width: "100%", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "32px" }}>
      <div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A" }}>94</div>
        <div style={{ fontSize: "11px", color: "#64748B" }}>nota atual</div>
      </div>
      <div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#16A34A" }}>3</div>
        <div style={{ fontSize: "11px", color: "#64748B" }}>resolvidas</div>
      </div>
      <div>
        <div style={{ fontSize: "18px", fontWeight: "800", color: "#1366E5" }}>12 min</div>
        <div style={{ fontSize: "11px", color: "#64748B" }}>de trabalho</div>
      </div>
    </div>

    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <button className="btn-primary">Voltar ao início</button>
      </Link>
    </div>
  </div>
);

// --- T11 · HISTÓRICO ---
export const History = () => (
  <div className="screen" style={{ paddingBottom: "100px" }}>
    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Histórico</h2>

    <div style={{ backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "16px", padding: "16px", marginBottom: "20px" }}>
      <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "2px" }}>Nota média da semana</div>
      <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A", marginBottom: "12px" }}>93</div>
      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "10px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: "12px" }}>
        [ Gráfico de evolução diária ]
      </div>
    </div>

    <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>Hoje</h3>
    <div style={{ padding: "14px", backgroundColor: "white", border: "1.5px solid #E2E8F0", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>Corredor 4 · Módulo B</div>
        <div style={{ fontSize: "12px", color: "#64748B" }}>14:32 · 3 ocorrências</div>
      </div>
      <span className="badge badge-success">94</span>
    </div>

    <BottomNav active="historico" />
  </div>
);

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

// --- BARRA DE NAVEGAÇÃO INFERIOR ---
const BottomNav = ({ active }) => (
  <div className="bottom-nav">
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
