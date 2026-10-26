import React, { useState } from "react";
import { PESSOAS, TIPOS_AVISO } from "./dados.js";
import { avatarDe } from "./avatar.js";

const TODOS = Object.keys(PESSOAS);

function CartaoAviso({ aviso, euId, souAdmin, onVi, onFixar, onArquivar, onRestaurar }) {
  const autor = PESSOAS[aviso.autor];
  const tipo = TIPOS_AVISO[aviso.tipo];
  const faltam = TODOS.filter((p) => !aviso.vistoPor.includes(p));
  const jaVi = aviso.vistoPor.includes(euId);
  const podeArquivar = souAdmin || aviso.autor === euId;
  return (
    <article className={`aviso-card ${aviso.fixado ? "fixado" : ""} ${aviso.arquivado ? "arquivado" : ""}`} style={{ "--tipo": tipo.cor }}>
      <div className="aviso-topo">
        <span className="aviso-tipo">{tipo.nome}</span>
        {aviso.fixado && <span className="aviso-fixo">📌 Fixado</span>}
      </div>
      <h3>{aviso.titulo}</h3>
      <p>{aviso.texto}</p>
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
          <span title={`Faltam: ${faltam.map((p) => PESSOAS[p].nome).join(", ")}`}>
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
              <button type="button" className="chip" onClick={() => onFixar(aviso.id)}>
                {aviso.fixado ? "Desafixar" : "📌 Fixar"}
              </button>
            )}
            {podeArquivar && (
              <button type="button" className="chip" onClick={() => onArquivar(aviso.id)}>
                Arquivar
              </button>
            )}
          </>
        )}
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

  const muda = (id, f) => setAvisos((a) => a.map((x) => (x.id === id ? f(x) : x)));
  const ativos = avisos.filter((a) => !a.arquivado).sort((a, b) => Number(b.fixado) - Number(a.fixado));
  const arquivados = avisos.filter((a) => a.arquivado);

  function publicar(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    setAvisos((a) => [
      { id: Date.now(), autor: euId, hora: `${new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "America/Sao_Paulo" })} ${horaAgora()}`, tipo, fixado: souAdmin && fixar, titulo: titulo.trim(), texto: texto.trim(), vistoPor: [euId], arquivado: false },
      ...a,
    ]);
    setTitulo("");
    setTexto("");
    setTipo("aviso");
    setFixar(false);
    setEscrevendo(false);
  }

  const acoes = {
    euId,
    souAdmin,
    onVi: (id) => muda(id, (x) => ({ ...x, vistoPor: [...x.vistoPor, euId] })),
    onFixar: (id) => muda(id, (x) => ({ ...x, fixado: !x.fixado })),
    onArquivar: (id) => muda(id, (x) => ({ ...x, arquivado: true, fixado: false })),
    onRestaurar: (id) => muda(id, (x) => ({ ...x, arquivado: false })),
  };

  return (
    <section className="mural" aria-label="Mural de recados">
      <div className="mural-topo">
        <div>
          <h2>Mural de recados</h2>
          <p>Avisos para toda a equipe. Todo mundo vê, e dá para saber quem já leu.</p>
        </div>
        <button type="button" className="btn-confirma" onClick={() => setEscrevendo(!escrevendo)}>
          {escrevendo ? "Cancelar" : "+ Novo aviso"}
        </button>
      </div>

      {escrevendo && (
        <form className="mural-form" onSubmit={publicar}>
          <label htmlFor="aviso-titulo">Título</label>
          <input id="aviso-titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={80} placeholder="Ex.: Reunião geral na sexta" autoFocus />
          <label htmlFor="aviso-texto">Texto</label>
          <textarea id="aviso-texto" value={texto} onChange={(e) => setTexto(e.target.value)} rows={3} placeholder="O que a equipe precisa saber?" />
          <div className="form-linha">
            <label htmlFor="aviso-tipo">Tipo</label>
            <select id="aviso-tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {Object.entries(TIPOS_AVISO).map(([k, t]) => (
                <option key={k} value={k}>
                  {t.nome}
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

      <div className="mural-grade">
        {ativos.length === 0 && <p className="vazio">Nenhum aviso no mural. Use “Novo aviso” para começar.</p>}
        {ativos.map((a) => (
          <CartaoAviso key={a.id} aviso={a} {...acoes} />
        ))}
      </div>

      {arquivados.length > 0 && (
        <div className="mural-arquivados">
          <button type="button" className="chip" onClick={() => setMostrarArquivados(!mostrarArquivados)}>
            {mostrarArquivados ? "Esconder arquivados" : `Mostrar arquivados (${arquivados.length})`}
          </button>
          {mostrarArquivados && (
            <div className="mural-grade">
              {arquivados.map((a) => (
                <CartaoAviso key={a.id} aviso={a} {...acoes} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
