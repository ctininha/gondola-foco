function Router() {
  return (
    <Layout>
      <Switch>
        {/* T01 - Autenticação / Entrar */}
        <Route path="/login" component={Login} />

        {/* T02 - Início / Dashboard principal do funcionário */}
        <Route path="/" exact component={Dashboard} />

        {/* T03 - Nova Auditoria (Escolher corredor e gôndola) */}
        <Route path="/analyses/new" component={NewAnalysis} />

        {/* T04 - Câmera Guiada */}
        <Route path="/analyses/camera" component={GuidedCamera} />

        {/* T05 - Revisar Foto */}
        <Route path="/analyses/review" component={ReviewPhoto} />

        {/* T06 - Analisando (Processamento IA) */}
        <Route path="/analyses/processing" component={AnalyzingProcess} />

        {/* T07 - Resultado (Nota e Indicadores gerais) */}
        <Route path="/analyses/:id/result" component={AnalysisResult} />

        {/* T08 - Ocorrências (Listar o que corrigir) */}
        <Route path="/analyses/:id/occurrences" component={OccurrencesList} />

        {/* T09 - Detalhe da Ocorrência (Esperado x Encontrado / Preço divergente) */}
        <Route path="/analyses/occurrences/:occurrenceId" component={OccurrenceDetail} />

        {/* T10 - Conclusão (Corredor concluído) */}
        <Route path="/analyses/:id/success" component={AnalysisSuccess} />

        {/* T11 - Histórico (Consultar auditorias anteriores) */}
        <Route path="/history" component={History} />

        {/* T12 - Perfil (Conta, fila de envio, LGPD, preferências) */}
        <Route path="/profile" component={Profile} />

        {/* Rota padrão para páginas não encontradas */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default Router;
