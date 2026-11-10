---
locale: es
key: denty
title: 'Denty — Gestión de Consultorios Odontológicos'
description: 'PWA para consultorios de una o dos sedes: historia clínica con odontograma, agenda, consentimientos firmados y un asistente de WhatsApp que agenda citas. Producto propio, en producción.'
pubDate: 2026-11-01
stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Deno Edge Functions', 'Cloudflare Workers', 'Gemini', 'WhatsApp Cloud API', 'pdf-lib']
featured: true
demoUrl: 'https://denty.bciro.workers.dev/'
tags: ['SaaS', 'Salud', 'IA aplicada']
---

## Problema
Un consultorio odontológico pequeño lleva la historia clínica en papel, la agenda en un cuaderno y las confirmaciones de citas por WhatsApp, una por una. La información se pierde y la historia clínica tiene reglas legales que el papel no ayuda a cumplir.

## Solución
Denty reúne pacientes, historia clínica con odontograma, imágenes, agenda, presupuestos con abonos y consentimientos firmados en pantalla. Un asistente de WhatsApp confirma, agenda y reagenda citas, y el consultorio toma la conversación cuando hace falta.

> Producto propio, en producción. El repositorio es privado.

## Arquitectura
- **Frontend:** PWA en Vue 3, TypeScript y Tailwind CSS, publicada como Cloudflare Worker.
- **Backend sin servidor propio:** Supabase con PostgreSQL, Auth, Storage y Edge Functions en Deno.
- **Recordatorios:** `pg_cron` revisa cada 5 minutos la cola de mensajes y avisa por WhatsApp 24 horas antes de la cita.
- **Asistente:** Edge Functions reciben el webhook de WhatsApp y responden con Gemini.

## Decisiones técnicas
- **Las reglas clínicas las impone la base de datos:** una evolución firmada no se edita ni se borra, los pacientes se archivan y cada cambio queda en una bitácora.
- **Multitenant con Row-Level Security:** cada consultorio ve solo su cuenta, y una cuenta suspendida deja de ver datos de inmediato.
- **Acceso solo por invitación,** validado en la base y no solo en la interfaz.
- **Consentimientos como PDF con hash SHA-256,** generados en el navegador con `pdf-lib`.
- **Datos personales fuera del modelo:** antes de llamar a Gemini se tapan nombres, documentos, teléfonos y correos.

## Resultado
Plataforma en producción con 21 migraciones versionadas y pruebas en tres niveles: lógica de la aplicación (Vitest), funciones del asistente (Deno) y reglas de la base de datos (SQL sobre Supabase local).
