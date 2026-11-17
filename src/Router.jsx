import { Switch, Route } from "wouter";

// Importação conjunta de todas as telas a partir do ficheiro AllPages
import { 
  Login, 
  Dashboard, 
  NewAnalysis, 
  GuidedCamera, 
  ReviewPhoto, 
  AnalyzingProcess, 
  AnalysisResult, 
  OccurrencesList, 
  OccurrenceDetail, 
  AnalysisSuccess, 
  History, 
  Profile, 
  NotFound 
} from "./pages/AllPages";

function Router() {
  return (
    <Switch>
      {/* T01 - Autenticação / Entrar (Início do app) */}
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />

      {/* T02 - Início / Dashboard principal do funcionário */}
      <Route path="/dashboard" component={Dashboard} />

      {/* T03 - Nova Auditoria */}
      <Route path="/analyses/new" component={NewAnalysis} />

      {/* T04 - Câmera Guiada */}
      <Route path="/analyses/camera" component={GuidedCamera} />

      {/* T05 - Revisar Foto */}
      <Route path="/analyses/review" component={ReviewPhoto} />

      {/* T06 - Analisando (Processamento IA) */}
      <Route path="/analyses/processing" component={AnalyzingProcess} />

      {/* T07 - Resultado */}
      <Route path="/analyses/:id/result" component={AnalysisResult} />

      {/* T08 - Ocorrências */}
      <Route path="/analyses/:id/occurrences" component={OccurrencesList} />

      {/* T09 - Detalhe da Ocorrência */}
      <Route path="/analyses/occurrences/:occurrenceId" component={OccurrenceDetail} />

      {/* T10 - Conclusão */}
      <Route path="/analyses/:id/success" component={AnalysisSuccess} />

      {/* T11 - Histórico */}
      <Route path="/history" component={History} />

      {/* T12 - Perfil */}
      <Route path="/profile" component={Profile} />

      {/* Rota padrão para páginas não encontradas */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default Router;
