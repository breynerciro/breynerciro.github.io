---
locale: es
key: breventa
title: 'BreVenta — Punto de Venta y Facturación Electrónica'
description: 'SaaS de punto de venta para varias empresas con facturación electrónica ante la DIAN. Producto propio, en beta.'
pubDate: 2026-09-01
stack: ['Vue 3', 'Pinia', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Redis', 'BullMQ', 'Socket.IO', 'Docker', 'Playwright', 'k6']
featured: true
tags: ['SaaS', 'Full Stack', 'Multitenant']
---

## Problema
Un negocio pequeño en Colombia necesita vender rápido en el mostrador y, al mismo tiempo, cumplir con la facturación electrónica de la DIAN. Suele resolverlo con dos herramientas que no se hablan: una caja y un facturador.

## Solución
BreVenta une la venta y la factura en un solo sistema para varias empresas. Cada empresa ve solo sus datos, y la factura electrónica sale de la misma venta.

> Producto propio, en beta. El repositorio es privado.

## Arquitectura
- **Monorepo** con tres aplicaciones y tres paquetes compartidos (motor fiscal, tipos y componentes de interfaz).
- **Frontend:** PWA en Vue 3, Pinia y Tailwind CSS.
- **API:** Node.js, Express y TypeScript, con colas BullMQ sobre Redis y tiempo real con Socket.IO.
- **Facturación:** microservicio en Python y FastAPI que genera el CUFE y firma el XML (XAdES) para la DIAN.
- **Datos:** PostgreSQL con Row-Level Security por empresa.

## Decisiones técnicas
- **El aislamiento vive en la base de datos:** la aplicación se conecta con un rol sujeto a RLS, así un error en una consulta no puede mostrar datos de otra empresa.
- **El sistema se niega a arrancar inseguro:** en producción valida los secretos, el CORS y el ambiente de la DIAN antes de iniciar.
- **La lógica fiscal es un paquete aparte** (impuestos, retenciones, CUFE) con sus propias pruebas.
- **Operación:** Docker Compose con Caddy para HTTPS, y observabilidad con OpenTelemetry, Prometheus y Sentry.

## Resultado
- 62 pruebas con Playwright contra el stack completo: seguridad, responsividad en 6 tamaños de pantalla y accesibilidad (axe).
- Prueba de carga con k6 simulando 50 empresas a la vez.
- Verificación local antes de fusionar: lint, tipos, pruebas, semgrep, gitleaks, trivy y migraciones sobre un PostgreSQL temporal.
