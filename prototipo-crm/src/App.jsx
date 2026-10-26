import React, { useEffect, useMemo, useState } from "react";
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  MessageList,
  MessageSeparator,
  Message,
  MessageInput,
  InputToolbox,
} from "@kit";
import { AVISOS_INICIAIS, CANAIS, CARTOES, MENSAGENS_INICIAIS, PESSOAS, VER_COMO } from "./dados.js";
import Mural from "./Mural.jsx";
import { avatarDe } from "./avatar.js";

const ICONE_CARTAO = { chamado: "🛠️", cliente: "👤", sala: "🚪" };

function horaAgora() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
}

function Cartao({ cartao }) {
  return (
    <div className={`cartao cartao-${cartao.tipo}`}>
      <span className="cartao-icone">{ICONE_CARTAO[cartao.tipo]}</span>
      <span>
        <strong>{cartao.titulo}</strong>
        <small>{cartao.detalhe}</small>
      </span>
    </div>
  );
}

export default function App() {
  const [euId, setEuId] = useState("recepcao");
  const [mensagens, setMensagens] = useState(MENSAGENS_INICIAIS);
  const [canalId, setCanalId] = useState("geral");
  const [busca, setBusca] = useState("");
  const [chatAberto, setChatAberto] = useState(false); // só importa no celular
  const [urgente, setUrgente] = useState(false);
  const [pedeConfirmacao, setPedeConfirmacao] = useState(false);
  const [anexo, setAnexo] = useState(null);
  const [menuAnexo, setMenuAnexo] = useState(false);
  const [aba, setAba] = useState("mural");
  const [avisos, setAvisos] = useState(AVISOS_INICIAIS);

  const eu = PESSOAS[euId];
  const meusCanais = CANAIS.filter((c) => c.participantes.includes(euId));
  const canal = meusCanais.find((c) => c.id === canalId) || meusCanais[0];

  // Ao trocar de pessoa, se o canal aberto não é dela, vai para o primeiro que ela vê.
  useEffect(() => {
    if (!meusCanais.some((c) => c.id === canalId)) setCanalId(meusCanais[0].id);
  }, [euId]);

  // Abrir um canal marca como lido para quem está olhando.
  useEffect(() => {
    setMensagens((atual) =>
      atual.some((m) => m.canal === canal.id && m.autor !== euId && !m.lidoPor.includes(euId))
        ? atual.map((m) => (m.canal === canal.id && !m.lidoPor.includes(euId) ? { ...m, lidoPor: [...m.lidoPor, euId] } : m))
        : atual
    );
  }, [canal.id, euId, mensagens.length]);

  const naoLidas = (id) => mensagens.filter((m) => m.canal === id && m.autor !== euId && !m.lidoPor.includes(euId)).length;
  const doCanal = mensagens.filter((m) => m.canal === canal.id);
  const pendencias = doCanal.filter((m) => m.pedeConfirmacao && m.confirmadoPor.length === 0);
  const totalNaoLidas = meusCanais.reduce((s, c) => s + naoLidas(c.id), 0);
  const avisosNovos = avisos.filter((a) => !a.arquivado && !a.vistoPor.includes(euId)).length;

  const canaisFiltrados = useMemo(
    () => meusCanais.filter((c) => c.nome.toLowerCase().includes(busca.trim().toLowerCase())),
    [meusCanais, busca]
  );

  function enviar(_html, texto) {
    const limpo = texto.trim();
    if (!limpo && !anexo) return;
    setMensagens((atual) => [
      ...atual,
      {
        id: Date.now(),
        canal: canal.id,
        autor: euId,
        hora: horaAgora(),
        texto: limpo,
        urgente,
        cartao: anexo || undefined,
        pedeConfirmacao,
        confirmadoPor: [],
        lidoPor: [euId],
      },
    ]);
    setUrgente(false);
    setPedeConfirmacao(false);
    setAnexo(null);
    setMenuAnexo(false);
  }

  function confirmar(id) {
    setMensagens((atual) =>
      atual.map((m) => (m.id === id ? { ...m, confirmadoPor: [...m.confirmadoPor, { id: euId, hora: horaAgora() }] } : m))
    );
  }

  const outros = canal.participantes.filter((p) => p !== euId).map((p) => PESSOAS[p]);

  return (
    <div className={`app ${chatAberto ? "chat-aberto" : ""}`}>
      <header className="topo">
        <div className="marca">
          <span className="marca-nome">CENTRAL</span>
          <span className="marca-sep">›</span>
          <span>Recados</span>
        </div>
        <nav className="abas" aria-label="Seções">
          <button type="button" className={aba === "mural" ? "ativa" : ""} onClick={() => setAba("mural")}>
            📌 Mural {avisosNovos > 0 && <span className="selo-topo">{avisosNovos}</span>}
          </button>
          <button type="button" className={aba === "conversas" ? "ativa" : ""} onClick={() => setAba("conversas")}>
            💬 Conversas {totalNaoLidas > 0 && <span className="selo-topo">{totalNaoLidas}</span>}
          </button>
        </nav>
        <label className="ver-como">
          Ver como
          <select value={euId} onChange={(e) => setEuId(e.target.value)} aria-label="Ver como">
            {VER_COMO.map((id) => (
              <option key={id} value={id}>
                {PESSOAS[id].nome} · {PESSOAS[id].papel}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="aviso-proto">
        Protótipo com dados inventados. O Mural é para todos verem; as Conversas são por canal. Use “Ver como” para trocar de lado. Nada é salvo.
      </div>

      <div className="palco">
        {aba === "mural" ? (
          <Mural avisos={avisos} setAvisos={setAvisos} euId={euId} horaAgora={horaAgora} />
        ) : (
        <MainContainer>
          <Sidebar position="left" scrollable={false} className="lista-canais">
            <Search placeholder="Buscar conversa…" value={busca} onChange={setBusca} onClearClick={() => setBusca("")} />
            <ConversationList>
              {canaisFiltrados.map((c) => {
                const ultima = [...mensagens].reverse().find((m) => m.canal === c.id);
                const n = naoLidas(c.id);
                return (
                  <Conversation
                    key={c.id}
                    name={c.nome}
                    lastSenderName={ultima ? PESSOAS[ultima.autor].nome : undefined}
                    info={ultima ? (ultima.texto || ultima.cartao?.titulo || "").split("\n")[0] : "Sem recados ainda"}
                    unreadCnt={n}
                    active={c.id === canal.id}
                    onClick={() => {
                      setCanalId(c.id);
                      setChatAberto(true);
                    }}
                  >
                    <Avatar src={avatarDe(c.icone === "🔒" ? "A" : c.nome, "#003a6c")} name={c.nome} />
                  </Conversation>
                );
              })}
            </ConversationList>
          </Sidebar>

          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back onClick={() => setChatAberto(false)} />
              <Avatar src={avatarDe(canal.nome, "#003a6c")} name={canal.nome} />
              <ConversationHeader.Content userName={`${canal.icone} ${canal.nome}`} info={canal.descricao} />
            </ConversationHeader>

            <MessageList typingIndicator={null}>
              <MessageSeparator content="Segunda-feira, 26 de outubro" />
              {doCanal.map((m) => {
                const autor = PESSOAS[m.autor];
                const meu = m.autor === euId;
                const falta = canal.participantes.filter((p) => p !== m.autor);
                return (
                  <Message
                    key={m.id}
                    model={{ direction: meu ? "outgoing" : "incoming", position: "single" }}
                    className={m.urgente ? "msg-urgente" : ""}
                  >
                    {!meu && <Avatar src={avatarDe(autor.nome, autor.cor)} name={autor.nome} />}
                    <Message.Header sender={autor.nome === autor.papel ? autor.nome : `${autor.nome} · ${autor.papel}`} />
                    <Message.CustomContent>
                      {m.urgente && <div className="etiqueta urgente">⚠ Urgente</div>}
                      {m.texto && <div className="texto">{m.texto}</div>}
                      {m.cartao && <Cartao cartao={m.cartao} />}
                      {m.pedeConfirmacao && (
                        <div className="confirma">
                          {m.confirmadoPor.length > 0 ? (
                            <span className="ok">
                              ✔ Confirmado por {m.confirmadoPor.map((c) => PESSOAS[c.id].nome).join(", ")} às{" "}
                              {m.confirmadoPor[0].hora}
                            </span>
                          ) : meu ? (
                            <span className="espera">⏳ Esperando confirmação de {falta.length > 1 ? "alguém da equipe" : PESSOAS[falta[0]].nome}</span>
                          ) : (
                            <button type="button" className="btn-confirma" onClick={() => confirmar(m.id)}>
                              Confirmar que vi e cuido disso
                            </button>
                          )}
                        </div>
                      )}
                    </Message.CustomContent>
                    <Message.Footer sentTime={m.hora} />
                  </Message>
                );
              })}
            </MessageList>

            <MessageInput placeholder={`Escreva um recado para ${canal.nome}…`} attachButton={false} onSend={enviar} />
            <InputToolbox>
              <div className="opcoes">
                <button type="button" className={`chip ${urgente ? "ligado vermelho" : ""}`} onClick={() => setUrgente(!urgente)}>
                  ⚠ Urgente
                </button>
                <button
                  type="button"
                  className={`chip ${pedeConfirmacao ? "ligado" : ""}`}
                  onClick={() => setPedeConfirmacao(!pedeConfirmacao)}
                >
                  ✔ Pedir confirmação
                </button>
                <span className="menu-anexo">
                  <button type="button" className={`chip ${anexo ? "ligado" : ""}`} onClick={() => setMenuAnexo(!menuAnexo)}>
                    📎 {anexo ? "Trocar anexo" : "Anexar da Central"}
                  </button>
                  {menuAnexo && (
                    <div className="menu">
                      {Object.entries(CARTOES).map(([tipo, lista]) => (
                        <div key={tipo}>
                          <div className="menu-titulo">
                            {ICONE_CARTAO[tipo]} {tipo === "chamado" ? "Chamados" : tipo === "cliente" ? "Clientes" : "Salas"}
                          </div>
                          {lista.map((c) => (
                            <button
                              type="button"
                              key={c.titulo}
                              onClick={() => {
                                setAnexo({ tipo, ...c });
                                setMenuAnexo(false);
                              }}
                            >
                              {c.titulo}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </span>
                {anexo && (
                  <span className="anexo-escolhido">
                    {ICONE_CARTAO[anexo.tipo]} {anexo.titulo}
                    <button type="button" aria-label="Tirar anexo" onClick={() => setAnexo(null)}>
                      ×
                    </button>
                  </span>
                )}
              </div>
            </InputToolbox>
          </ChatContainer>

          <Sidebar position="right" scrollable className="painel-direito">
            <div className="painel">
              <h3>Pendências deste canal</h3>
              {pendencias.length === 0 ? (
                <p className="vazio">Nada esperando confirmação. 🎉</p>
              ) : (
                pendencias.map((m) => (
                  <div className="pendencia" key={m.id}>
                    <small>
                      {PESSOAS[m.autor].nome} · {m.hora}
                    </small>
                    <span>{(m.texto || m.cartao?.titulo).replace(/\n/g, " ")}</span>
                  </div>
                ))
              )}
              <h3>Quem está aqui</h3>
              <ul className="pessoas">
                {canal.participantes.map((p) => (
                  <li key={p}>
                    <Avatar size="sm" src={avatarDe(PESSOAS[p].nome, PESSOAS[p].cor)} name={PESSOAS[p].nome} />
                    <span>
                      {PESSOAS[p].nome}
                      <small>{PESSOAS[p].papel}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Sidebar>
        </MainContainer>
        )}
      </div>
    </div>
  );
}
