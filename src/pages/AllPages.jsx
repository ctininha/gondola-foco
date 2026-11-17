import React, { useState } from "react";
import { Link, useLocation } from "wouter";

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
    }, 1000);
  };

  return (
    <div className="screen-no-nav" style={{ justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Ícone institucional T01 */}
        <div style={{ width: "64px", height: "64px", backgroundColor: "#1366E5", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "16px", boxShadow: "0 8px 20px rgba(19, 102, 229, 0.25)" }}>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", marginBottom: "4px", textAlign: "center", letterSpacing: "-0.5px" }}>GôndolaFoco</h1>
        <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", marginBottom: "32px", lineHeight: "1.4" }}>
          De olho na gôndola,<br />foco no resultado
        </p>

        <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
              Matrícula
            </label>
            <input
              type="text"
              placeholder="Ex.: 104532"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", fontSize: "15px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", fontSize: "15px", backgroundColor: "#F8FAFC", border: "1.5px solid #E2E8F0", borderRadius: "12px", outline: "none", color: "#0F172A", paddingRight: "70px" }}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#64748B", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {erro && (
            <div style={{ padding: "12px", backgroundColor: "#FEE2E2", border: "1px solid #FECACA", color: "#DC2626", fontSize: "13px", borderRadius: "10px", textAlign: "center", fontWeight: "600" }}>
              {erro}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0" }}>
            <input
              type="checkbox"
              id="manter"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: "#1366E5", cursor: "pointer", borderRadius: "4px" }}
            />
            <label htmlFor="manter" style={{ fontSize: "13px", color: "#475569", cursor: "pointer", userSelect: "none" }}>
              Manter conectado neste turno
            </label>
          </div>

          <button type="submit" disabled={carregando} className="btn-primary">
            {carregando ? "A entrar..." : "Entrar"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <a href="#esqueci" onClick={(e) => { e.preventDefault(); alert("Contacte o administrador da loja."); }} style={{ fontSize: "13px", color: "#1366E5", textDecoration: "none", fontWeight: "600" }}>
            Esqueci minha senha
          </a>
        </div>

        <div style={{ marginTop: "40px", textAlign: "center", color: "#94A3B8", fontSize: "11px" }}>
          Versão 1.0 · dados de exemplo
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => (
  <div className="screen">
    <h2>T02 - Dashboard do Funcionário</h2>
    <ul>
      <li><Link href="/analyses/new">T03 - Nova Auditoria</Link></li>
      <li><Link href="/history">T11 - Histórico</Link></li>
      <li><Link href="/profile">T12 - Perfil</Link></li>
    </ul>
  </div>
);
export const NewAnalysis = () => <div className="screen"><h2>T03 - Escolher Corredor</h2><Link href="/analyses/camera">Abrir Câmara</Link></div>;
export const GuidedCamera = () => <div className="screen"><h2>T04 - Câmara Guiada</h2><Link href="/analyses/review">Capturar Foto</Link></div>;
export const ReviewPhoto = () => <div className="screen"><h2>T05 - Revisar Foto</h2><Link href="/analyses/processing">Enviar para IA</Link></div>;
export const AnalyzingProcess = () => <div className="screen"><h2>T06 - A processar IA...</h2><Link href="/analyses/123/result">Ver Resultado</Link></div>;
export const AnalysisResult = () => <div className="screen"><h2>T07 - Nota da Gôndola: 92%</h2><Link href="/analyses/123/occurrences">Ver Ocorrências</Link></div>;
export const OccurrencesList = () => <div className="screen"><h2>T08 - Lista de Ocorrências</h2><Link href="/analyses/occurrences/1">Detalhe do Item</Link></div>;
export const OccurrenceDetail = () => <div className="screen"><h2>T09 - Esperado x Encontrado</h2><Link href="/analyses/123/success">Concluir Corredor</h2></Link></div>; // Ajustado link
export const AnalysisSuccess = () => <div className="screen"><h2>T10 - Auditoria Concluída!</h2><Link href="/">Voltar ao Início</Link></div>;
export const History = () => <div className="screen"><h2>T11 - Histórico</h2><Link href="/">Voltar</Link></div>;
export const Profile = () => <div className="screen"><h2>T12 - Perfil e LGPD</h2><Link href="/">Voltar</Link></div>;
export const NotFound = () => <div className="screen"><h2>404 - Página não encontrada</h2><Link href="/">Início</Link></div>;
