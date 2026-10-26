import React, { useEffect, useState } from "react";
import { PESSOAS, TIPOS_AVISO } from "./dados.js";
import { avatarDe } from "./avatar.js";

const TODOS = Object.keys(PESSOAS);

function CartaoAviso({ aviso, avisos, euId, souAdmin, destaque, minimizado, onAlternar, onVi, onFixar, onArquivar, onRestaurar, onRelacionar, onDesrelacionar, onIr }) {
  const [escolhendo, setEscolhendo] = useState(false);
  const autor = PESSOAS[aviso.autor];
  const tipo = TIPOS_AVISO[aviso.tipo];
  const faltam = TODOS.filter((p) => !aviso.vistoPor.includes(p));
  const jaVi = aviso.vistoPor.includes(euId);
  const podeMexer = souAdmin || aviso.autor === euId;
  const relacionados = aviso.relacionados.map((id) => avisos.find((x) => x.id === id)).filter(Boolean);
  const candidatos = avisos.filter((x) => !x.arquivado && x.id !== aviso.id && !aviso.relacionados.includes(x.id));
  return (
    <article
      id={`aviso-${aviso.id}`}
      className={`aviso-card ${aviso.fixado ? "fixado" : ""} ${aviso.arquivado ? "arquivado" : ""} ${destaque ? "destaque" : ""} ${minimizado ? "minimizado" : ""}`}
      style={{ "--tipo": tipo.cor }}
    >
      <div className="aviso-topo">
        <span className="aviso-tipo">
          <i className="bolinha" aria-hidden="true" />
          {tipo.nome}
        </span>
        <span className="aviso-topo-dir">
          {aviso.fixado && <span className="aviso-fixo">📌 Fixado</span>}
          <button
            type="button"
            className={`seta ${minimizado ? "recolhido" : ""}`}
            aria-expanded={!minimizado}
            aria-controls={`aviso-corpo-${aviso.id}`}
            aria-label={minimizado ? `Abrir o aviso ${aviso.titulo}` : `Minimizar o aviso ${aviso.titulo}`}
            title={minimizado ? "Abrir" : "Minimizar"}
            onClick={() => onAlternar(aviso.id)}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </span>
      </div>
      <h3>{aviso.titulo}</h3>
      {minimizado && (
        <div className="aviso-resumo">
          {!jaVi && !aviso.arquivado && <span className="novo">Novo para você</span>}
          <span>
            👁 {aviso.vistoPor.length} de {TODOS.length}
          </span>
          {relacionados.length > 0 && <span>🔗 {relacionados.length}</span>}
          <span>
            {autor.nome} · {aviso.hora}
          </span>
        </div>
      )}
      <div id={`aviso-corpo-${aviso.id}`} className="aviso-corpo" hidden={minimizado}>
      <p>{aviso.texto}</p>

      {(relacionados.length > 0 || escolhendo) && (
        <div className="aviso-rel">
          <span className="aviso-rel-titulo">🔗 Relacionado a</span>
          <div className="aviso-rel-lista">
            {relacionados.map((r) => (
              <span className="rel-chip" key={r.id} style={{ "--tipo": TIPOS_AVISO[r.tipo].cor }}>
                <button type="button" className="rel-ir" onClick={() => onIr(r.id)} title="Ir para o aviso">
                  {r.titulo}
                  {r.arquivado ? " (arquivado)" : ""}
                </button>
                {podeMexer && !aviso.arquivado && (
                  <button type="button" className="rel-x" aria-label={`Desfazer ligação com ${r.titulo}`} onClick={() => onDesrelacionar(aviso.id, r.id)}>
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {escolhendo && (
        <div className="rel-escolha">
          <label htmlFor={`rel-${aviso.id}`}>Relacionar a qual aviso?</label>
          {candidatos.length === 0 ? (
            <small>Não há outro aviso para relacionar.</small>
          ) : (
            <select
              id={`rel-${aviso.id}`}
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  onRelacionar(aviso.id, Number(e.target.value));
                  setEscolhendo(false);
                }
              }}
            >
              <option value="">Escolha…</option>
              {candidatos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titulo}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className="aviso-autor">
        <img src={avatarDe(autor.nome, autor.cor)} alt="" width="24" height="24" />
        <span>
          {autor.nome === autor.papel ? autor.nome : `${autor.nome} · ${autor.papel}`}
          <small>{aviso.hora}</small>
        </span>
      </div>
      <div className="aviso-vistos">
        {faltam.length === 0 ? (
          <span className="ok">✔ Todos já viram</span>
        ) : (
          <span>
            👁 {aviso.vistoPor.length} de {TODOS.length} viram · faltam {faltam.map((p) => PESSOAS[p].nome).join(", ")}
          </span>
        )}
      </div>
      <div className="aviso-acoes">
        {aviso.arquivado ? (
          souAdmin && (
            <button type="button" className="chip" onClick={() => onRestaurar(aviso.id)}>
              Restaurar
            </button>
          )
        ) : (
          <>
            {!jaVi && (
              <button type="button" className="btn-confirma" onClick={() => onVi(aviso.id)}>
                Li o aviso
              </button>
            )}
            {souAdmin && (
              <button type="button" className={`chip ${aviso.fixado ? "" : "chip-fixar"}`} onClick={() => onFixar(aviso.id)}>
                {aviso.fixado ? "Desafixar" : "📌 Fixar"}
              </button>
            )}
            {podeMexer && (
              <button type="button" className={`chip ${escolhendo ? "ligado" : ""}`} aria-expanded={escolhendo} onClick={() => setEscolhendo(!escolhendo)}>
                🔗 Relacionar
              </button>
            )}
            {podeMexer && (
              <button type="button" className="chip" onClick={() => onArquivar(aviso.id)}>
                Arquivar
              </button>
            )}
          </>
        )}
      </div>
      </div>
    </article>
  );
}

export default function Mural({ avisos, euId, setAvisos, horaAgora }) {
  const eu = PESSOAS[euId];
  const souAdmin = eu.papel === "Administrador";
  const [mostrarArquivados, setMostrarArquivados] = useState(false);
  const [escrevendo, setEscrevendo] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("aviso");
  const [fixar, setFixar] = useState(false);
  const [ligarA, setLigarA] = useState("");
  const [destaque, setDestaque] = useState(null);
  const [minimizados, setMinimizados] = useState([]);

  // O brilho de "você veio parar aqui" some sozinho.
  useEffect(() => {
    if (destaque === null) return undefined;
    const t = setTimeout(() => setDestaque(null), 2200);
    return () => clearTimeout(t);
  }, [destaque]);

  const muda = (id, f) => setAvisos((a) => a.map((x) => (x.id === id ? f(x) : x)));
  const ativos = avisos.filter((a) => !a.arquivado);
  const fixados = ativos.filter((a) => a.fixado);
  const outros = ativos.filter((a) => !a.fixado);
  const arquivados = avisos.filter((a) => a.arquivado);

  // A ligação vale nos dois sentidos: quem abre qualquer um dos dois avisos vê o outro.
  const relacionar = (a, b) =>
    setAvisos((lista) =>
      lista.map((x) =>
        x.id === a && !x.relacionados.includes(b)
          ? { ...x, relacionados: [...x.relacionados, b] }
          : x.id === b && !x.relacionados.includes(a)
          ? { ...x, relacionados: [...x.relacionados, a] }
          : x
      )
    );
  const desrelacionar = (a, b) =>
    setAvisos((lista) =>
      lista.map((x) => (x.id === a ? { ...x, relacionados: x.relacionados.filter((i) => i !== b) } : x.id === b ? { ...x, relacionados: x.relacionados.filter((i) => i !== a) } : x))
    );

  const alternar = (id) => setMinimizados((m) => (m.includes(id) ? m.filter((i) => i !== id) : [...m, id]));

  function ir(id) {
    const alvo = avisos.find((x) => x.id === id);
    if (alvo?.arquivado) setMostrarArquivados(true);
    setMinimizados((m) => m.filter((i) => i !== id)); // abre o aviso de destino
    setDestaque(id);
    // espera o aviso arquivado aparecer na tela antes de rolar até ele
    setTimeout(() => document.getElementById(`aviso-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  }

  function publicar(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    const id = Date.now();
    const data = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" });
    const ligado = ligarA ? Number(ligarA) : null;
    setAvisos((a) => [
      { id, autor: euId, hora: `${data} ${horaAgora()}`, tipo, fixado: souAdmin && fixar, titulo: titulo.trim(), texto: texto.trim(), vistoPor: [euId], arquivado: false, relacionados: ligado ? [ligado] : [] },
      ...a.map((x) => (x.id === ligado ? { ...x, relacionados: [...x.relacionados, id] } : x)),
    ]);
    setTitulo("");
    setTexto("");
    setTipo("aviso");
    setFixar(false);
    setLigarA("");
    setEscrevendo(false);
  }

  const acoes = {
    avisos,
    euId,
    souAdmin,
    onAlternar: alternar,
    onVi: (id) => muda(id, (x) => ({ ...x, vistoPor: [...x.vistoPor, euId] })),
    onFixar: (id) => muda(id, (x) => ({ ...x, fixado: !x.fixado })),
    onArquivar: (id) => muda(id, (x) => ({ ...x, arquivado: true, fixado: false })),
    onRestaurar: (id) => muda(id, (x) => ({ ...x, arquivado: false })),
    onRelacionar: relacionar,
    onDesrelacionar: desrelacionar,
    onIr: ir,
  };

  return (
    <section className="mural" aria-label="Mural de recados">
      <div className="mural-topo">
        <div>
          <h2>Mural de recados</h2>
          <p>Avisos para toda a equipe. Todo mundo vê, e dá para saber quem já leu.</p>
        </div>
        <div className="mural-topo-acoes">
          <button type="button" className="chip" onClick={() => setMinimizados(minimizados.length >= ativos.length ? [] : ativos.map((a) => a.id))}>
            {minimizados.length >= ativos.length ? "Expandir todos" : "Minimizar todos"}
          </button>
          <button type="button" className="btn-confirma" onClick={() => setEscrevendo(!escrevendo)}>
            {escrevendo ? "Cancelar" : "+ Novo aviso"}
          </button>
        </div>
      </div>

      {escrevendo && (
        <form className="mural-form" onSubmit={publicar}>
          <label htmlFor="aviso-titulo">Título</label>
          <input id="aviso-titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={80} placeholder="Ex.: Reunião geral na sexta" autoFocus />
          <label htmlFor="aviso-texto">Texto</label>
          <textarea id="aviso-texto" value={texto} onChange={(e) => setTexto(e.target.value)} rows={3} placeholder="O que a equipe precisa saber?" />
          <div className="form-linha">
            <div className="tipo-grupo" role="radiogroup" aria-label="Tipo do aviso">
              <span className="tipo-rotulo">Tipo</span>
              {Object.entries(TIPOS_AVISO).map(([k, t]) => (
                <label key={k} className={`tipo-opcao ${tipo === k ? "sel" : ""}`} style={{ "--tipo": t.cor }}>
                  <input type="radio" name="aviso-tipo" value={k} checked={tipo === k} onChange={() => setTipo(k)} />
                  <i className="bolinha" aria-hidden="true" />
                  {t.nome}
                </label>
              ))}
            </div>
            <label htmlFor="aviso-ligar">Relacionar a</label>
            <select id="aviso-ligar" value={ligarA} onChange={(e) => setLigarA(e.target.value)}>
              <option value="">Nenhum aviso</option>
              {ativos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.titulo}
                </option>
              ))}
            </select>
            {souAdmin && (
              <label className="marcar" htmlFor="aviso-fixar">
                <input id="aviso-fixar" type="checkbox" checked={fixar} onChange={(e) => setFixar(e.target.checked)} /> Fixar no topo
              </label>
            )}
            <button type="submit" className="btn-confirma" disabled={!titulo.trim()}>
              Publicar no mural
            </button>
          </div>
        </form>
      )}

      {fixados.length > 0 && (
        <div className="mural-fixados" aria-label="Avisos fixados">
          <h3 className="mural-subtitulo">
            📌 Fixados <span className="contagem">{fixados.length}</span>
          </h3>
          <div className="mural-grade grande">
            {fixados.map((a) => (
              <CartaoAviso key={a.id} aviso={a} destaque={destaque === a.id} minimizado={minimizados.includes(a.id)} {...acoes} />
            ))}
          </div>
        </div>
      )}

      <div className="mural-outros">
        {fixados.length > 0 && (
          <h3 className="mural-subtitulo">
            Outros avisos <span className="contagem">{outros.length}</span>
          </h3>
        )}
        <div className="mural-grade">
          {ativos.length === 0 && <p className="vazio">Nenhum aviso no mural. Use “Novo aviso” para começar.</p>}
          {outros.map((a) => (
            <CartaoAviso key={a.id} aviso={a} destaque={destaque === a.id} minimizado={minimizados.includes(a.id)} {...acoes} />
          ))}
        </div>
      </div>

      {arquivados.length > 0 && (
        <div className="mural-arquivados">
          <button type="button" className="chip" onClick={() => setMostrarArquivados(!mostrarArquivados)}>
            {mostrarArquivados ? "Esconder arquivados" : `Mostrar arquivados (${arquivados.length})`}
          </button>
          {mostrarArquivados && (
            <div className="mural-grade">
              {arquivados.map((a) => (
                <CartaoAviso key={a.id} aviso={a} destaque={destaque === a.id} minimizado={minimizados.includes(a.id)} {...acoes} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
