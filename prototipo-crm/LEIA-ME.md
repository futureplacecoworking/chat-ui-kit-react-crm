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
