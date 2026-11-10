---
locale: pt
key: breventa
title: 'BreVenta — Ponto de Venda e Faturamento Eletrônico'
description: 'SaaS de ponto de venda para várias empresas com faturamento eletrônico junto à autoridade fiscal colombiana (DIAN). Produto próprio, em beta.'
pubDate: 2026-09-01
stack: ['Vue 3', 'Pinia', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.IO', 'Docker', 'Playwright', 'k6']
featured: true
tags: ['SaaS', 'Full Stack', 'Multitenant']
---

## Problema
Um pequeno negócio na Colômbia precisa vender rápido no balcão e, ao mesmo tempo, cumprir o faturamento eletrônico da DIAN. Costuma resolver com duas ferramentas que não conversam: um caixa e um emissor de faturas.

## Solução
O BreVenta une a venda e a fatura em um único sistema para várias empresas. Cada empresa vê apenas os seus dados, e a fatura eletrônica sai da própria venda.

> Produto próprio, em beta. O repositório é privado.

## Arquitetura
- **Monorepo** com três aplicações e três pacotes compartilhados (motor fiscal, tipos e componentes de interface).
- **Frontend:** PWA em Vue 3, Pinia e Tailwind CSS.
- **API:** Node.js, Express e TypeScript, com filas BullMQ sobre Redis e tempo real com Socket.IO.
- **Faturamento:** microsserviço em Python e FastAPI que gera o CUFE e assina o XML (XAdES) para a DIAN.
- **Dados:** PostgreSQL com Row-Level Security por empresa.

## Decisões técnicas
- **O isolamento fica no banco de dados:** a aplicação se conecta com um papel sujeito a RLS, então um erro em uma consulta não expõe dados de outra empresa.
- **O sistema se recusa a iniciar inseguro:** em produção valida os segredos, o CORS e o ambiente da DIAN antes de subir.
- **A lógica fiscal é um pacote separado** (impostos, retenções, CUFE) com seus próprios testes.
- **Operação:** Docker Compose com Caddy para HTTPS, e observabilidade com OpenTelemetry, Prometheus e Sentry.

## Resultado
- 62 testes com Playwright contra o stack completo: segurança, responsividade em 6 tamanhos de tela e acessibilidade (axe).
- Teste de carga com k6 simulando 50 empresas ao mesmo tempo.
- Verificação local antes do merge: lint, tipos, testes, semgrep, gitleaks, trivy e migrações em um PostgreSQL temporário.
