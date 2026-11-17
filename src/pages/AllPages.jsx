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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-center">GôndolaFoco</h1>
        <p className="text-xs text-slate-500 text-center mt-1 mb-8">De olho na gôndola, foco no resultado</p>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Matrícula</label>
            <input type="text" placeholder="Ex.: 104532" value={matricula} onChange={(e) => setMatricula(e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Senha</label>
            <div className="relative">
              <input type={mostrarSenha ? "text" : "password"} placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all pr-10" />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-medium">{mostrarSenha ? "Ocultar" : "Mostrar"}</button>
            </div>
          </div>
          {erro && <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg text-center font-medium">{erro}</div>}
          <div className="flex items-center text-sm py-1">
            <label className="flex items-center text-slate-600 text-xs cursor-pointer select-none">
              <input type="checkbox" checked={manterConectado} onChange={(e) => setManterConectado(e.target.checked)} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mr-2" />
              Manter conectado neste turno
            </label>
          </div>
          <button type="submit" disabled={carregando} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors flex items-center justify-center mt-2 cursor-pointer">
            {carregando ? <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : "Entrar"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#esqueci-senha" onClick={(e) => { e.preventDefault(); alert("Contacte o administrador da loja."); }} className="text-xs text-blue-600 hover:underline font-medium">Esqueci minha senha</a>
        </div>
      </div>
      <div className="mt-8 text-center text-slate-400 text-[11px]">Versão 1.0 · dados de exemplo</div>
    </div>
  );
};

export const Dashboard = () => (
  <div>
    <h2>T02 - Dashboard do Funcionário</h2>
    <ul>
      <li><Link href="/analyses/new">T03 - Nova Auditoria</Link></li>
      <li><Link href="/history">T11 - Histórico</Link></li>
      <li><Link href="/profile">T12 - Perfil</Link></li>
    </ul>
  </div>
);
export const NewAnalysis = () => <div><h2>T03 - Escolher Corredor</h2><Link href="/analyses/camera">Abrir Câmara</Link></div>;
export const GuidedCamera = () => <div><h2>T04 - Câmara Guiada</h2><Link href="/analyses/review">Capturar Foto</Link></div>;
export const ReviewPhoto = () => <div><h2>T05 - Revisar Foto</h2><Link href="/analyses/processing">Enviar para IA</Link></div>;
export const AnalyzingProcess = () => <div><h2>T06 - A processar IA...</h2><Link href="/analyses/123/result">Ver Resultado</Link></div>;
export const AnalysisResult = () => <div><h2>T07 - Nota da Gôndola: 92%</h2><Link href="/analyses/123/occurrences">Ver Ocorrências</Link></div>;
export const OccurrencesList = () => <div><h2>T08 - Lista de Ocorrências</h2><Link href="/analyses/occurrences/1">Detalhe do Item</Link></div>;
export const OccurrenceDetail = () => <div><h2>T09 - Esperado x Encontrado</h2><Link href="/analyses/123/success">Concluir Corredor</Link></div>;
export const AnalysisSuccess = () => <div><h2>T10 - Auditoria Concluída!</h2><Link href="/">Voltar ao Início</Link></div>;
export const History = () => <div><h2>T11 - Histórico</h2><Link href="/">Voltar</Link></div>;
export const Profile = () => <div><h2>T12 - Perfil e LGPD</h2><Link href="/">Voltar</Link></div>;
export const NotFound = () => <div><h2>404 - Página não encontrada</h2><Link href="/">Início</Link></div>;
