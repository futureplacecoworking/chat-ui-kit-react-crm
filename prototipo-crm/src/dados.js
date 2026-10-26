// Dados INVENTADOS só para o protótipo (nenhum cliente nem pessoa de verdade além dos nomes de quem usa a Central).

export const PESSOAS = {
  recepcao: { id: "recepcao", nome: "Recepção", papel: "Recepção", cor: "#003a6c" },
  luiz: { id: "luiz", nome: "Luiz", papel: "Administrador", cor: "#ae0001" },
  fernanda: { id: "fernanda", nome: "Fernanda", papel: "Administrador", cor: "#7a3e9d" },
  isabela: { id: "isabela", nome: "Isabela", papel: "Administrativo", cor: "#0f7b6c" },
  luciene: { id: "luciene", nome: "Luciene", papel: "Operacional", cor: "#b86e00" },
};

// Quem pode "ver como" no protótipo.
export const VER_COMO = ["recepcao", "luiz", "fernanda", "isabela", "luciene"];

export const CANAIS = [
  {
    id: "geral",
    nome: "Recepção e gestão",
    descricao: "Conversa geral do dia a dia",
    icone: "💬",
    participantes: ["recepcao", "luiz", "fernanda", "isabela", "luciene"],
  },
  {
    id: "turno",
    nome: "Passagem de turno",
    descricao: "O que ficou pendente de um turno para o outro",
    icone: "🔁",
    participantes: ["recepcao", "luiz", "fernanda"],
  },
  {
    id: "manutencao",
    nome: "Manutenção",
    descricao: "Problemas e chamados do espaço",
    icone: "🛠️",
    participantes: ["recepcao", "luiz", "fernanda", "luciene"],
  },
  {
    id: "limpeza",
    nome: "Limpeza e copa",
    descricao: "Luciene, Rosangela e a recepção",
    icone: "🧹",
    participantes: ["recepcao", "luiz", "fernanda", "luciene"],
  },
  {
    id: "financeiro",
    nome: "Administrativo",
    descricao: "Faturas, contratos e cobranças (a recepção não vê)",
    icone: "🔒",
    participantes: ["luiz", "fernanda", "isabela"],
  },
];

// Cartões que dá para anexar a um recado (nada disso é lido do banco no protótipo).
export const CARTOES = {
  chamado: [
    { titulo: "Ar-condicionado da sala 2 pingando", detalhe: "Chamado · Em andamento" },
    { titulo: "Lâmpada queimada no corredor da Milão", detalhe: "Chamado · Aberto" },
    { titulo: "Impressora sem papel A4", detalhe: "Chamado · Aberto" },
  ],
  cliente: [
    { titulo: "Studio Aurora", detalhe: "Cliente · Contrato ativo · Sala 5" },
    { titulo: "Contábil Horizonte", detalhe: "Cliente · Contrato ativo · Sala 3" },
  ],
  sala: [
    { titulo: "Sala Milão", detalhe: "Sala de reunião · 8 lugares" },
    { titulo: "Sala 3", detalhe: "Sala privativa · 4 mesas" },
  ],
};

export const MENSAGENS_INICIAIS = [
  { id: 1, canal: "geral", autor: "luiz", hora: "08:02", texto: "Bom dia, pessoal! Hoje a sala Milão está reservada o dia todo para a Studio Aurora.", cartao: { tipo: "sala", titulo: "Sala Milão", detalhe: "Sala de reunião · 8 lugares" }, lidoPor: ["luiz", "recepcao", "fernanda", "isabela", "luciene"] },
  { id: 2, canal: "geral", autor: "recepcao", hora: "08:20", texto: "Bom dia! Alguém sabe se a Contábil Horizonte vai usar a sala 3 hoje? Não achei a reserva.", cartao: { tipo: "cliente", titulo: "Contábil Horizonte", detalhe: "Cliente · Contrato ativo · Sala 3" }, pedeConfirmacao: true, confirmadoPor: [{ id: "fernanda", hora: "08:41" }], lidoPor: ["recepcao", "luiz", "fernanda", "isabela"] },
  { id: 3, canal: "geral", autor: "fernanda", hora: "08:41", texto: "Conferi no Conexa: eles usam a sala 3 normalmente, só não tem reserva porque é fixa. Pode liberar a entrada.", lidoPor: ["fernanda", "luiz"] },
  { id: 4, canal: "turno", autor: "recepcao", hora: "12:58", texto: "Passagem de turno (manhã → tarde):\n1) Ar-condicionado da sala 2 pingando.\n2) Visitante da Studio Aurora chega às 14h.\n3) Falta papel A4 na impressora.", cartao: { tipo: "chamado", titulo: "Ar-condicionado da sala 2 pingando", detalhe: "Chamado · Em andamento" }, pedeConfirmacao: true, confirmadoPor: [], lidoPor: ["recepcao"] },
  { id: 5, canal: "manutencao", autor: "recepcao", hora: "10:15", texto: "Lâmpada queimada no corredor da Milão. A reunião de hoje é lá, dá para trocar antes?", urgente: true, cartao: { tipo: "chamado", titulo: "Lâmpada queimada no corredor da Milão", detalhe: "Chamado · Aberto" }, lidoPor: ["recepcao", "luiz", "luciene"] },
  { id: 6, canal: "manutencao", autor: "luiz", hora: "10:40", texto: "Já chamei o eletricista. Ele vem amanhã cedo; hoje a gente deixa a luz de apoio ligada.", lidoPor: ["luiz"] },
  { id: 7, canal: "limpeza", autor: "luciene", hora: "07:30", texto: "Terminei o 6º andar. Faltou detergente na copa.", lidoPor: ["luciene", "recepcao", "luiz"] },
  { id: 8, canal: "limpeza", autor: "recepcao", hora: "07:48", texto: "Anotei na lista de compras. Obrigada, Luciene!", lidoPor: ["recepcao", "luciene", "luiz"] },
  { id: 9, canal: "financeiro", autor: "isabela", hora: "09:00", texto: "Fechei a conferência das faturas de outubro. Só faltam duas para o Luiz aprovar.", lidoPor: ["isabela", "fernanda"] },
];

// Mural: avisos que TODOS veem (dados inventados).
export const TIPOS_AVISO = {
  importante: { nome: "Importante", cor: "#ae0001" },
  aviso: { nome: "Aviso", cor: "#003a6c" },
  lembrete: { nome: "Lembrete", cor: "#b86e00" },
  info: { nome: "Informativo", cor: "#4f5764" },
};

export const AVISOS_INICIAIS = [
  { id: 101, autor: "luiz", hora: "26/10 08:00", tipo: "aviso", fixado: true, titulo: "Reunião geral da equipe", texto: "Sexta-feira, às 16h, na sala Milão. Recepção, limpeza, administrativo e gestão. Quem não puder, avise no canal Recepção e gestão.", vistoPor: ["luiz", "fernanda", "recepcao"], arquivado: false, relacionados: [107] },
  { id: 102, autor: "fernanda", hora: "26/10 08:45", tipo: "importante", fixado: false, titulo: "Eletricista amanhã cedo", texto: "Ele vem trocar as lâmpadas do corredor da Milão. Avisem os clientes que usam a sala para chegar com calma.", vistoPor: ["fernanda"], arquivado: false, relacionados: [106, 110] },
  { id: 103, autor: "recepcao", hora: "26/10 08:20", tipo: "lembrete", fixado: false, titulo: "Encomenda da Studio Aurora", texto: "Está no armário da recepção. Quem atender o cliente entrega e anota no canal.", vistoPor: ["recepcao", "luiz"], arquivado: false, relacionados: [] },
  { id: 104, autor: "luciene", hora: "26/10 07:30", tipo: "info", fixado: false, titulo: "Detergente da copa acabou", texto: "Já está na lista de compras. Até chegar, usem o da limpeza (armário de baixo).", vistoPor: ["luciene", "recepcao", "luiz", "isabela"], arquivado: false, relacionados: [108] },
  { id: 105, autor: "isabela", hora: "23/10 17:10", tipo: "info", fixado: false, titulo: "Conferência de faturas de outubro", texto: "Concluída. Esse aviso já foi resolvido e está arquivado.", vistoPor: ["isabela", "luiz", "fernanda"], arquivado: true, relacionados: [] },
  { id: 106, autor: "recepcao", hora: "26/10 09:10", tipo: "lembrete", fixado: false, titulo: "Sala Milão: Studio Aurora às 14h", texto: "A reunião é na Milão, no mesmo corredor onde o eletricista vai trabalhar amanhã. Deixar a luz de apoio ligada.", vistoPor: ["recepcao"], arquivado: false, relacionados: [102, 107] },
  { id: 107, autor: "maya", hora: "26/10 07:55", tipo: "lembrete", fixado: false, titulo: "Resumo do dia da Maya", texto: "Hoje: Studio Aurora na sala Milão às 14h, eletricista amanhã cedo e reunião geral na sexta às 16h. Nenhuma cobrança vence hoje.", vistoPor: ["recepcao"], arquivado: false, relacionados: [101, 106] },
  { id: 108, autor: "maya", hora: "26/10 09:30", tipo: "info", fixado: false, titulo: "O detergente chega na quinta", texto: "O fornecedor confirmou a entrega para quinta-feira de manhã.", para: "luciene", vistoPor: [], arquivado: false, relacionados: [104] },
  { id: 109, autor: "debora", hora: "26/10 09:40", tipo: "importante", fixado: false, titulo: "Folha de ponto até sexta", texto: "Isabela, falta conferir a folha de ponto de outubro. Preciso dela até sexta.", para: "isabela", vistoPor: [], arquivado: false, relacionados: [] },
  { id: 110, autor: "luiz", hora: "26/10 09:50", tipo: "importante", fixado: false, titulo: "Se o eletricista não aparecer", texto: "Recepção, se ele não chegar até as 9h de amanhã, me liga antes de abrir a Milão.", para: "recepcao", vistoPor: ["luiz"], arquivado: false, relacionados: [102] },
];

// Agentes de IA (Hermes e Claude) que também publicam no mural. Dados inventados.
export const AGENTES = {
  maya: { id: "maya", nome: "Maya", papel: "Secretária", cor: "#c2185b", agente: true },
  debora: { id: "debora", nome: "Débora", papel: "RH e DP", cor: "#00838f", agente: true },
  luisa: { id: "luisa", nome: "Luísa", papel: "Financeiro", cor: "#6a4fb3", agente: true },
};

export const quem = (id) => PESSOAS[id] || AGENTES[id];

// Aviso aberto: todos veem. Aviso direcionado: só quem recebeu e quem escreveu.
export const visivel = (aviso, euId) => !aviso.para || aviso.para === euId || aviso.autor === euId;
