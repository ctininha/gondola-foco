export const USER_DATA = {
  matricula: "104532",
  nome: "Ana",
  cargo: "Repositora",
  loja: "Mercado Bom Preço",
  turno: "turno da manhã",
  iniciais: "A"
};

export const CORREDORES_INICIAIS = [
  { id: 1, nome: "Corredor 1 · Mercearia", modulo: "Módulo A · central", status: "Concluído", horario: "08:12", nota: 98, ocorrencias: 0 },
  { id: 2, nome: "Corredor 2 · Bebidas", modulo: "Módulo C · refrigerados", status: "Concluído", horario: "09:03", nota: 100, ocorrencias: 0 },
  { id: 3, nome: "Corredor 3 · Limpeza", modulo: "Módulo A · início", status: "Ocorrências", horario: "10:41", nota: 91, ocorrencias: 2 },
  { id: 4, nome: "Corredor 4 · Laticínios", modulo: "Módulo B · início", status: "Pendente", horario: null, nota: null, ocorrencias: 3, proximo: true },
  { id: 5, nome: "Corredor 5 · Hortifrúti", modulo: "Módulo D · bancada", status: "Pendente", horario: null, nota: null, ocorrencias: 0 }
];

export const PLANOGRAMA_EXEMPLO = {
  versao: "Planograma v12",
  totalProdutos: 42,
  prateleiras: [
    [
      { cor: "#EC4899", w: 32 }, { cor: "#EF4444", w: 26 }, { cor: "#10B981", w: 26 },
      { cor: "#EF4444", w: 32 }, { cor: "#10B981", w: 38 }, { cor: "#EF4444", w: 26 },
      { cor: "#F59E0B", w: 34 }, { cor: "#10B981", w: 34 }
    ],
    [
      { cor: "#F97316", w: 28 }, { cor: "#3B82F6", w: 28 }, { cor: "#EF4444", w: 26 },
      { cor: "#8B5CF6", w: 28 }, { cor: "#EF4444", w: 32 }, { cor: "#EF4444", w: 28 },
      { cor: "#3B82F6", w: 38 }, { cor: "#F59E0B", w: 28 }, { cor: "#10B981", w: 28 }
    ],
    [
      { cor: "#3B82F6", w: 34 }, { cor: "#8B5CF6", w: 30 }, { cor: "#F97316", w: 32 },
      { cor: "#F97316", w: 32 }, { cor: "#F59E0B", w: 38 }, { cor: "#3B82F6", w: 24 },
      { cor: "#3B82F6", w: 26 }, { cor: "#0EA5E9", w: 38 }
    ]
  ]
};

export const OCORRENCIAS_EXEMPLO = [
  {
    id: 1,
    tipo: "Ruptura",
    produto: "Leite integral 1L",
    sku: "7891000000011",
    localizacao: "Prateleira 2 · posição 3",
    resumo: "Ausente na gôndola",
    esperado: "2 faces na Prateleira 2",
    encontrado: "Espaço vazio (0 faces)",
    confianca: "98%",
    instrucao: "Verifique o estoque no depósito e reponha 2 unidades na posição indicada.",
    status: "Pendente"
  },
  {
    id: 2,
    tipo: "Posição",
    produto: "Iogurte natural 170g (marca B)",
    sku: "7891000000028",
    localizacao: "Prateleira 3 · posição 1",
    resumo: "Fora de posição · Deveria estar na prateleira 3",
    esperado: "Prateleira 3 · posição 1",
    encontrado: "Prateleira 2 · posição 5",
    confianca: "94%",
    instrucao: "Mova os produtos para a Prateleira 3, mantendo 3 faces visíveis.",
    status: "Pendente"
  },
  {
    id: 3,
    tipo: "Preço",
    produto: "Achocolatado em pó 400g",
    sku: "7891234",
    localizacao: "Prateleira 2 · posição 4",
    resumo: "Preço divergente · Etiqueta R$ 7,49 · sistema R$ 7,99",
    precoEtiqueta: "R$ 7,49",
    precoSistema: "R$ 7,99",
    confianca: "alta (96%)",
    instrucao: "Corrija a etiqueta ou avise quem cuida dos preços.",
    status: "Pendente"
  }
];

export const HISTORICO_SEMANA = [
  { dia: "SEG", nota: 88 },
  { dia: "TER", nota: 90 },
  { dia: "QUA", nota: 93 },
  { dia: "QUI", nota: 91 },
  { dia: "SEX", nota: 95 },
  { dia: "SÁB", nota: 97 },
  { dia: "DOM", nota: 94 }
];
