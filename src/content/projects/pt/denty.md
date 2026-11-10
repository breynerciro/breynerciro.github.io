---
locale: pt
key: denty
title: 'Denty — Gestão de Consultórios Odontológicos'
description: 'PWA para consultórios de uma ou duas unidades: prontuário com odontograma, agenda, termos de consentimento assinados e um assistente de WhatsApp que agenda consultas. Produto próprio, em produção.'
pubDate: 2026-11-01
stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Deno Edge Functions', 'Cloudflare Workers', 'Gemini', 'WhatsApp Cloud API', 'pdf-lib']
featured: true
demoUrl: 'https://denty.bciro.workers.dev/'
tags: ['SaaS', 'Saúde', 'IA aplicada']
---

## Problema
Um consultório odontológico pequeno mantém o prontuário em papel, a agenda em um caderno e confirma consultas pelo WhatsApp, uma a uma. A informação se perde, e o prontuário tem regras legais que o papel não ajuda a cumprir.

## Solução
O Denty reúne pacientes, prontuário com odontograma, imagens, agenda, orçamentos com pagamentos e termos de consentimento assinados na tela. Um assistente de WhatsApp confirma, agenda e reagenda consultas, e o consultório assume a conversa quando necessário.

> Produto próprio, em produção. O repositório é privado.

## Arquitetura
- **Frontend:** PWA em Vue 3, TypeScript e Tailwind CSS, publicada como Cloudflare Worker.
- **Sem servidor próprio:** Supabase com PostgreSQL, Auth, Storage e Edge Functions em Deno.
- **Lembretes:** o `pg_cron` verifica a fila de mensagens a cada 5 minutos e avisa pelo WhatsApp 24 horas antes da consulta.
- **Assistente:** Edge Functions recebem o webhook do WhatsApp e respondem com o Gemini.

## Decisões técnicas
- **O banco de dados impõe as regras clínicas:** uma evolução assinada não pode ser editada nem apagada, os pacientes são arquivados e cada alteração fica em um log de auditoria.
- **Multitenant com Row-Level Security:** cada consultório vê apenas a sua conta, e uma conta suspensa deixa de ver dados imediatamente.
- **Acesso somente por convite,** validado no banco e não apenas na interface.
- **Termos de consentimento em PDF com hash SHA-256,** gerados no navegador com `pdf-lib`.
- **Dados pessoais fora do modelo:** nomes, documentos, telefones e e-mails são mascarados antes de chamar o Gemini.

## Resultado
Plataforma em produção com 21 migrações versionadas e testes em três níveis: lógica da aplicação (Vitest), funções do assistente (Deno) e regras do banco de dados (SQL no Supabase local).
