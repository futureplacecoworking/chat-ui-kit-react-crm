# Protótipo: Recados da Central

Lugar dentro do CRM para a **recepção e a gestão trocarem recados sem depender do WhatsApp**.
Feito com os componentes deste kit (`../src/components`), com dados inventados e sem salvar nada.

## O que o protótipo mostra
- **Canais**: Recepção e gestão, Passagem de turno, Manutenção, Limpeza e copa e Administrativo (a recepção não vê).
- **Ver como**: troca de pessoa no topo para ver os dois lados da conversa.
- **Urgente**: o recado fica marcado em vermelho.
- **Pedir confirmação**: quem recebe toca em "Confirmar que vi e cuido disso"; quem mandou vê quem confirmou e a que horas.
- **Anexar da Central**: chamado, cliente ou sala dentro do recado.
- **Pendências do canal** na lateral e número de não lidas na lista.
- Funciona no celular: ou a lista, ou a conversa.

## Como rodar
```sh
cd prototipo-crm
npm install
npm run dev      # abre no navegador
npm run build    # gera dist/index.html (um arquivo só)
```

## Mural de recados (aba "Mural")
Avisos que **todos veem**, em cartões coloridos por tipo (Importante, Aviso, Lembrete, Informativo).
- Qualquer pessoa publica um aviso; só o Administrador **fixa**. Os fixados ficam numa **faixa azul própria no topo**, separados dos "Outros avisos".
- **Relacionar**: quem escreveu o aviso (ou o Administrador) liga um aviso a outro, e a ligação aparece nos dois. Tocar no nome do aviso ligado leva até ele; o × desfaz. Também dá para escolher "Relacionar a" já ao criar o aviso.
- O **tipo** vem com uma bolinha da cor dele (Importante vermelho, Aviso azul, Lembrete laranja, Informativo cinza), também na hora de escolher o tipo ao criar.
- **Minimizar**: a seta no canto do cartão recolhe o aviso (fica só o título e um resumo, com "Novo para você" se ainda não leu); "Minimizar todos" e "Expandir todos" no topo.
- **Direcionar a uma pessoa**: em "Para quem" o aviso vai **só para uma pessoa**. Só ela e quem escreveu veem (o Administrador também só vê se for o destinatário). O aviso aparece para ela na faixa roxa "Só para você", com a tag "✉ Só para ela"; quem enviou vê se ela já viu. Aviso direcionado não é fixado.
- **Agentes publicam no mural**: cada agente (Maya, Débora, Luísa…) publica com o nome dele e o selo "🤖 Agente". No protótipo, o Administrador usa "Publicar como" para simular. Proposta de regras (também no fim da aba Mural): o agente lê o que é aberto e o que é dele; cria com título, texto, tipo, "para" e "relacionados"; edita e arquiva só o que escreveu; **nunca fixa nem exclui**. Quando isso for para a Central, o assunto "Mural" nasce desligado para os agentes até alguém ligar na tela.
- Cada aviso mostra **quem já viu** (e quem falta); o botão "Li o aviso" marca a leitura.
- **Arquivar** (quem escreveu ou o Administrador) em vez de excluir; "Mostrar arquivados" e "Restaurar" (Administrador).
- O selo no topo conta os avisos que a pessoa ainda não leu.
