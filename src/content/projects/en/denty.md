---
locale: en
key: denty
title: 'Denty — Dental Practice Management'
description: 'PWA for practices with one or two locations: clinical records with odontogram, scheduling, signed consent forms and a WhatsApp assistant that books appointments. My own product, in production.'
pubDate: 2026-11-01
stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Deno Edge Functions', 'Cloudflare Workers', 'Gemini', 'WhatsApp Cloud API', 'pdf-lib']
featured: true
demoUrl: 'https://denty.bciro.workers.dev/'
tags: ['SaaS', 'Health', 'Applied AI']
---

## Problem
A small dental practice keeps clinical records on paper, the schedule in a notebook and confirms appointments over WhatsApp one by one. Information gets lost, and clinical records carry legal rules that paper does not help to meet.

## Solution
Denty brings together patients, clinical records with odontogram, images, scheduling, treatment budgets with payments and consent forms signed on screen. A WhatsApp assistant confirms, books and reschedules appointments, and the practice takes over the conversation when needed.

> My own product, in production. The repository is private.

## Architecture
- **Frontend:** PWA in Vue 3, TypeScript and Tailwind CSS, published as a Cloudflare Worker.
- **No server of its own:** Supabase with PostgreSQL, Auth, Storage and Deno Edge Functions.
- **Reminders:** `pg_cron` checks the message queue every 5 minutes and sends a WhatsApp reminder 24 hours before the appointment.
- **Assistant:** Edge Functions receive the WhatsApp webhook and answer with Gemini.

## Technical decisions
- **The database enforces the clinical rules:** a signed clinical note cannot be edited or deleted, patients are archived and every change goes to an audit log.
- **Multi-tenant with Row-Level Security:** each practice sees only its own account, and a suspended account stops seeing data immediately.
- **Invitation-only access,** validated in the database and not just in the interface.
- **Consent forms as PDFs with a SHA-256 hash,** generated in the browser with `pdf-lib`.
- **Personal data stays out of the model:** names, IDs, phone numbers and emails are masked before calling Gemini.

## Result
Platform in production with 21 versioned migrations and tests at three levels: application logic (Vitest), assistant functions (Deno) and database rules (SQL on local Supabase).
