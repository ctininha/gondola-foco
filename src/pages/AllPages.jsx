import { Link } from "wouter";

export const Login = () => <div><h2>T01 - Login</h2><Link href="/">Entrar no Sistema</Link></div>;
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
