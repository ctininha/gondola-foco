import { useState } from "react";
import { Switch, Route, Link } from "wouter";
import { OCORRENCIAS_EXEMPLO } from "./data/mockData";
import { Login, Dashboard, NewAnalysis, GuidedCamera, ReviewPhoto, AnalyzingProcess } from "./pages/CaptureFlow";
import { AnalysisResult, OccurrencesList, OccurrenceDetail, AnalysisSuccess, History, Profile } from "./pages/ResultAndProfile";

function NotFound() {
  return (
    <div className="screen-no-nav" style={{ textAlign: "center", justifyContent: "center" }}>
      <h2>404 - Página não encontrada</h2>
      <Link href="/" style={{ color: "var(--primary)", marginTop: "12px" }}>Voltar ao Início</Link>
    </div>
  );
}

export default function Router() {
  const [ocorrencias, setOcorrencias] = useState(OCORRENCIAS_EXEMPLO);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route path="/analyses/new" component={NewAnalysis} />
      <Route path="/analyses/camera" component={GuidedCamera} />
      <Route path="/analyses/review" component={ReviewPhoto} />
      <Route path="/analyses/processing" component={AnalyzingProcess} />
      <Route path="/analyses/:id/result" component={AnalysisResult} />
      <Route path="/analyses/:id/occurrences">
        {() => <OccurrencesList ocorrencias={ocorrencias} setOcorrencias={setOcorrencias} />}
      </Route>
      <Route path="/analyses/occurrences/:occurrenceId">
        {() => <OccurrenceDetail ocorrencias={ocorrencias} setOcorrencias={setOcorrencias} />}
      </Route>
      <Route path="/analyses/:id/success" component={AnalysisSuccess} />
      <Route path="/history" component={History} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}
