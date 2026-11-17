import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { USER_DATA, CORREDORES_INICIAIS, PLANOGRAMA_EXEMPLO } from "../data/mockData";
import { BottomNav, PlanogramaVisual } from "../components/SharedUI";

// T01 · Entrar
export function Login() {
  const [, setLocation] = useLocation();
  const [matricula, setMatricula] = useState("104532");
  const [senha, setSenha] = useState("••••••••");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [manterConectado, setManterConectado] = useState(true);
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!matricula.trim() || !senha.trim()) {
      setErro("Matrícula ou senha incorretas.");
      return;
    }
    setLocation("/");
  };

  return (
    <div className="screen-no-nav" style={{ justifyContent: "space-between", paddingTop: "48px" }}>
      <div>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "76px", height: "76px", background: "var(--primary)", borderRadius: "20px",
            margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: "36px", fontWeight: "bold", boxShadow: "0 8px 20px rgba(19,102,229,0.25)"
          }}>
            ⛶
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>GôndolaFoco</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px", marginTop: "4px" }}>
            De olho na gôndola,<br />foco no resultado
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Matrícula</label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              placeholder="Ex.: 104532"
              style={{
                width: "100%", height: "50px", padding: "0 16px", borderRadius: "12px",
                border: "1.5px solid var(--border)", fontSize: "16px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Senha</label>
            <div style={{ position: "relative" }}>
              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{
                  width: "100%", height: "50px", padding: "0 46px 0 16px", borderRadius: "12px",
                  border: "1.5px solid var(--border)", fontSize: "16px"
                }}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", fontSize: "18px", cursor: "pointer"
                }}
              >
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {erro && (
            <div style={{ background: "var(--danger-bg)", color: "var(--danger-text)", padding: "10px 14px", borderRadius: "10px", fontSize: "14px" }}>
              {erro}
            </div>
          )}

          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", cursor: "pointer", margin: "4px 0" }}>
            <input
              type="checkbox"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }}
            />
            Manter conectado neste turno
          </label>

          <button type="submit" className="btn-primary" style={{ marginTop: "8px" }}>
            Entrar
          </button>

          <button
            type="button"
            onClick={() => alert("Solicite a redefinição de senha ao gerente da loja.")}
            style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "15px", fontWeight: "600", marginTop: "8px", cursor: "pointer" }}
          >
            Esqueci minha senha
          </button>
        </form>
      </div>

      <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
        Versão 1.0 · dados de exemplo
      </p>
    </div>
  );
}

// T02 · Início
export function Dashboard() {
  const [, setLocation] = useLocation();
  const [corredores] = useState(CORREDORES_INICIAIS);

  // Ordenação conforme regra de negócio: Pendentes -> Ocorrências -> Concluídos
  const ordemStatus = { "Pendente": 1, "Ocorrências": 2, "Concluído": 3 };
  const listaOrdenada = [...corredores].sort((a, b) => ordemStatus[a.status] - ordemStatus[b.status]);

  const handleCardClick = (c) => {
    if (c.status === "Pendente") setLocation("/analyses/new");
    else if (c.status === "Ocorrências") setLocation("/analyses/3/result");
    else setLocation("/analyses/1/result");
  };

  return (
    <div className="screen">
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800" }}>Olá, {USER_DATA.nome}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{USER_DATA.loja} · {USER_DATA.turno}</p>
        </div>
        <div
          onClick={() => setLocation("/profile")}
          style={{
            width: "44px", height: "44px", borderRadius: "50%", background: "var(--primary-light)",
            color: "var(--primary)", fontWeight: "700", fontSize: "18px",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
          }}
        >
          {USER_DATA.iniciais}
        </div>
      </div>

      {/* Cartão de progresso */}
      <div style={{
        background: "var(--primary-light)", borderRadius: "18px", padding: "18px 20px", marginBottom: "24px"
      }}>
        <span style={{ color: "var(--primary)", fontWeight: "700", fontSize: "13px" }}>Hoje</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", margin: "6px 0 12px" }}>
          <span style={{ fontSize: "32px", fontWeight: "800", color: "var(--text-main)" }}>3 de 8</span>
          <span style={{ color: "var(--text-muted)", fontSize: "15px" }}>corredores auditados</span>
        </div>
        <div style={{ width: "100%", height: "8px", background: "white", borderRadius: "99px", overflow: "hidden" }}>
          <div style={{ width: "37.5%", height: "100%", background: "var(--primary)", borderRadius: "99px" }} />
        </div>
      </div>

      {/* Lista de Corredores */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>Corredores</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "24px" }}>
        {listaOrdenada.map((c) => (
          <div
            key={c.id}
            onClick={() => handleCardClick(c)}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 4px", borderBottom: "1px solid var(--border)", cursor: "pointer"
            }}
          >
            <div>
              <div style={{ fontWeight: "700", fontSize: "16px", marginBottom: "3px" }}>{c.nome}</div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {c.status === "Concluído" && `Auditado às ${c.horario} · nota ${c.nota}`}
                {c.status === "Ocorrências" && `Auditado às ${c.horario} · ${c.ocorrencias} ocorrências`}
                {c.status === "Pendente" && (c.proximo ? "Próximo da sua lista" : "Pendente")}
              </div>
            </div>
            <div>
              {c.status === "Concluído" && <span className="badge badge-success">Concluído</span>}
              {c.status === "Ocorrências" && <span className="badge badge-warning">Ocorrências</span>}
              {c.status === "Pendente" && <span className="badge badge-neutral">Pendente</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Ação principal na zona do polegar */}
      <div style={{ marginTop: "auto" }}>
        <button className="btn-primary" onClick={() => setLocation("/analyses/new")}>
          <span>📷</span> Nova auditoria
        </button>
      </div>

      <BottomNav active="inicio" />
    </div>
  );
}

// T03 · Nova auditoria
export function NewAnalysis() {
  const [, setLocation] = useLocation();
  const [corredor, setCorredor] = useState("Corredor 4 · Laticínios");
  const [modulo, setModulo] = useState("Módulo B · início");

  return (
    <div className="screen-no-nav">
      <div className="top-bar">
        <button className="back-btn" onClick={() => setLocation("/")}>‹</button>
        <h1 style={{ fontSize: "20px", fontWeight: "700" }}>Nova auditoria</h1>
      </div>

      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--primary)", letterSpacing: "0.5px" }}>
        PASSO 1 DE 2
      </span>
      <h2 style={{ fontSize: "24px", fontWeight: "800", margin: "4px 0 20px" }}>Escolha a gôndola</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "14px", color: "var(--text-muted)", marginBottom: "6px" }}>Corredor</label>
          <select
            value={corredor}
            onChange={(e) => setCorredor(e.target.value)}
            style={{
              width: "100%", height: "50px", padding: "0 14px", borderRadius: "12px",
              border: "1.5px solid var(--border)", fontSize: "16px", background: "white"
            }}
          >
            <option>Corredor 4 · Laticínios</option>
            <option>Corredor 5 · Hortifrúti</option>
            <option>Corredor 3 · Limpeza</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "14px", color: "var(--text-muted)", marginBottom: "6px" }}>Gôndola ou módulo</label>
          <select
            value={modulo}
            onChange={(e) => setModulo(e.target.value)}
            style={{
              width: "100%", height: "50px", padding: "0 14px", borderRadius: "12px",
              border: "1.5px solid var(--border)", fontSize: "16px", background: "white"
            }}
          >
            <option>Módulo B · início</option>
            <option>Módulo B · meio</option>
            <option>Módulo B · ponta de gôndola</option>
          </select>
        </div>
      </div>

      {/* Cartão O que deve estar aqui */}
      <div style={{ background: "#F1F5F9", borderRadius: "16px", padding: "16px", marginBottom: "24px" }}>
        <div style={{ fontWeight: "700", fontSize: "16px" }}>O que deve estar aqui</div>
        <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "12px" }}>
          {PLANOGRAMA_EXEMPLO.versao} · {PLANOGRAMA_EXEMPLO.totalProdutos} produtos esperados
        </div>
        <PlanogramaVisual height={155} />
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px" }}>
          Fotografe a gôndola inteira, de frente e sem pessoas.
        </p>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="btn-primary" onClick={() => setLocation("/analyses/camera")}>
          <span>📷</span> Abrir câmera
        </button>
      </div>
    </div>
  );
}

// T04 · Câmera guiada
export function GuidedCamera() {
  const [, setLocation] = useLocation();
  const [flash, setFlash] = useState(false);

  return (
    <div style={{
      flex: 1, background: "#1E293B", color: "white", display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: "20px", position: "relative"
    }}>
      {/* Topo com controles e pílulas de orientação em tempo real */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <button
            onClick={() => setLocation("/analyses/new")}
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", color: "white", fontSize: "18px", cursor: "pointer" }}
          >
            ✕
          </button>
          <button
            onClick={() => setFlash(!flash)}
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: flash ? "#FACC15" : "rgba(0,0,0,0.5)", border: "none",
              color: flash ? "#0F172A" : "#FACC15", fontSize: "18px", cursor: "pointer"
            }}
          >
            ⚡
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span className="badge badge-success">Luz boa</span>
          <span className="badge badge-success">Nitidez boa</span>
          <span className="badge badge-warning">Aproxime-se</span>
        </div>
      </div>

      {/* Visor simulado da gôndola com grade de terços e cantoneiras */}
      <div style={{
        position: "relative", margin: "16px 0", border: "2px solid rgba(255,255,255,0.6)",
        borderRadius: "12px", padding: "12px", background: "#334155"
      }}>
        {/* Linhas da grade de terços */}
        <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", pointerEvents: "none" }}>
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.35)" }} />
          <div style={{ borderRight: "1px solid rgba(255,255,255,0.35)" }} />
          <div />
        </div>
        <PlanogramaVisual height={320} />
      </div>

      {/* Dica fixa + Controles inferiores */}
      <div>
        <div style={{
          background: "rgba(0,0,0,0.65)", textAlign: "center", padding: "8px 12px",
          borderRadius: "10px", fontSize: "13px", marginBottom: "18px"
        }}>
          Enquadre a gôndola inteira · evite pessoas
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px" }}>
          <span style={{ fontSize: "14px", fontWeight: "600" }}>Foto 1 de 1</span>

          {/* Botão grande de captura (68px - zona do polegar) */}
          <button
            onClick={() => setLocation("/analyses/review")}
            aria-label="Capturar foto"
            style={{
              width: "72px", height: "72px", borderRadius: "50%", background: "white",
              border: "5px solid rgba(255,255,255,0.4)", cursor: "pointer",
              boxShadow: "0 0 0 3px #1E293B inset"
            }}
          />

          <button
            onClick={() => alert("Dica: Mantenha o celular paralelo à gôndola e evite reflexos diretos nas etiquetas.")}
            style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer" }}
          >
            💡
          </button>
        </div>
      </div>
    </div>
  );
}

// T05 · Revisar foto
export function ReviewPhoto() {
  const [, setLocation] = useLocation();

  return (
    <div className="screen-no-nav">
      <div className="top-bar">
        <button className="back-btn" onClick={() => setLocation("/analyses/camera")}>‹</button>
        <h1 style={{ fontSize: "20px", fontWeight: "700" }}>Revisar foto</h1>
      </div>

      <div style={{ background: "#F1F5F9", padding: "10px", borderRadius: "16px", marginBottom: "20px" }}>
        <PlanogramaVisual height={200} />
      </div>

      <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "12px" }}>Checagem da foto</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px" }}>
          <span style={{ color: "var(--success)", fontSize: "18px" }}>✅</span>
          <span>Nítida</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px" }}>
          <span style={{ color: "var(--success)", fontSize: "18px" }}>✅</span>
          <span>Boa iluminação</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px" }}>
          <span style={{ color: "var(--success)", fontSize: "18px" }}>✅</span>
          <span>Gôndola inteira no quadro</span>
        </div>

        <div style={{
          background: "var(--warning-bg)", color: "var(--warning-text)",
          padding: "12px 14px", borderRadius: "12px", fontSize: "14px",
          display: "flex", alignItems: "center", gap: "10px"
        }}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          <span>Reflexo leve na prateleira 2: pode afetar a leitura</span>
        </div>
      </div>

      <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "12px" }}>
        <button className="btn-outline" onClick={() => setLocation("/analyses/camera")}>
          Refazer
        </button>
        <button className="btn-primary" onClick={() => setLocation("/analyses/processing")}>
          Enviar para análise
        </button>
      </div>
    </div>
  );
}

// T06 · Analisando
export function AnalyzingProcess() {
  const [, setLocation] = useLocation();
  const [etapa, setEtapa] = useState(2);

  useEffect(() => {
    const t1 = setTimeout(() => setEtapa(3), 1200);
    const t2 = setTimeout(() => setEtapa(4), 2400);
    const t3 = setTimeout(() => setLocation("/analyses/4/result"), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [setLocation]);

  const passos = [
    { id: 1, texto: "Foto enviada" },
    { id: 2, texto: "Comparando com o planograma" },
    { id: 3, texto: "Lendo os preços das etiquetas" },
    { id: 4, texto: "Calculando os índices" }
  ];

  return (
    <div className="screen-no-nav">
      <div className="top-bar">
        <button className="back-btn" onClick={() => setLocation("/")}>‹</button>
        <h1 style={{ fontSize: "20px", fontWeight: "700" }}>Analisando</h1>
      </div>

      {/* Anel de progresso */}
      <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}>
        <div style={{
          width: "150px", height: "150px", borderRadius: "50%",
          border: "12px solid #E2E8F0", borderTopColor: "var(--primary)",
          borderRightColor: etapa >= 2 ? "var(--primary)" : "#E2E8F0",
          borderBottomColor: etapa >= 3 ? "var(--primary)" : "#E2E8F0",
          borderLeftColor: etapa >= 4 ? "var(--primary)" : "#E2E8F0",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
        }}>
          <span style={{ fontSize: "26px", fontWeight: "800" }}>{etapa} de 4</span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>etapas</span>
        </div>
      </div>

      <h2 style={{ textAlign: "center", fontSize: "20px", fontWeight: "800", marginBottom: "24px" }}>
        Analisando a sua gôndola
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "0 12px", marginBottom: "24px" }}>
        {passos.map((p) => {
          const concluido = etapa > p.id;
          const ativo = etapa === p.id;
          return (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "24px", height: "24px", borderRadius: "50%",
                background: concluido ? "var(--success)" : ativo ? "var(--primary-light)" : "white",
                border: concluido ? "none" : ativo ? "2px solid var(--primary)" : "2px solid #CBD5E1",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px"
              }}>
                {concluido ? "✓" : ativo ? "●" : ""}
              </div>
              <span style={{
                fontSize: "15px",
                fontWeight: ativo ? "700" : "400",
                color: concluido || ativo ? "var(--text-main)" : "var(--text-muted)"
              }}>
                {p.texto}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        background: "var(--primary-light)", color: "var(--primary-dark)",
        padding: "14px 16px", borderRadius: "12px", fontSize: "14px",
        display: "flex", alignItems: "center", gap: "10px"
      }}>
        <span style={{ fontSize: "20px" }}>💡</span>
        <span>Pode continuar repondo. Avisaremos quando o resultado estiver pronto.</span>
      </div>

      <div style={{ marginTop: "auto" }}>
        <button className="btn-outline" onClick={() => setLocation("/")}>
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
