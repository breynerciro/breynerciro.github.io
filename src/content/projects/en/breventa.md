---
locale: en
key: breventa
title: 'BreVenta — Point of Sale and Electronic Invoicing'
description: 'Multi-company point-of-sale SaaS with electronic invoicing for the Colombian tax authority (DIAN). My own product, in beta.'
pubDate: 2026-09-01
stack: ['Vue 3', 'Pinia', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.IO', 'Docker', 'Playwright', 'k6']
featured: true
tags: ['SaaS', 'Full Stack', 'Multi-tenant']
---

## Problem
A small business in Colombia needs to sell fast at the counter and also comply with DIAN electronic invoicing. It usually ends up with two tools that do not talk to each other: a register and an invoicing service.

## Solution
BreVenta puts the sale and the invoice in one system for multiple companies. Each company sees only its own data, and the electronic invoice comes out of the sale itself.

> My own product, in beta. The repository is private.

## Architecture
- **Monorepo** with three apps and three shared packages (fiscal engine, types and UI components).
- **Frontend:** PWA in Vue 3, Pinia and Tailwind CSS.
- **API:** Node.js, Express and TypeScript, with BullMQ queues on Redis and real time over Socket.IO.
- **Invoicing:** a Python and FastAPI microservice that generates the CUFE and signs the XML (XAdES) for DIAN.
- **Data:** PostgreSQL with per-company Row-Level Security.

## Technical decisions
- **Isolation lives in the database:** the app connects with a role subject to RLS, so a mistake in a query cannot expose another company's data.
- **The system refuses to start unsafe:** in production it validates secrets, CORS and the DIAN environment before booting.
- **Fiscal logic is its own package** (taxes, withholdings, CUFE) with its own tests.
- **Operations:** Docker Compose with Caddy for HTTPS, and observability with OpenTelemetry, Prometheus and Sentry.

## Result
- 62 Playwright tests against the full stack: security, responsiveness at 6 viewport sizes and accessibility (axe).
- k6 load test simulating 50 companies at once.
- Local verification before merging: lint, types, tests, semgrep, gitleaks, trivy and migrations on a temporary PostgreSQL.
