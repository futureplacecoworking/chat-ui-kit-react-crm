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
- Cada aviso mostra **quem já viu** (e quem falta); o botão "Li o aviso" marca a leitura.
- **Arquivar** (quem escreveu ou o Administrador) em vez de excluir; "Mostrar arquivados" e "Restaurar" (Administrador).
- O selo no topo conta os avisos que a pessoa ainda não leu.
