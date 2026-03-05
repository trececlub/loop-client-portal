# PRD V1 - LOOP Client Portal

## 1. Objetivo
Crear un portal web para que cada cliente consulte su operacion mensual sin acceso a configuraciones tecnicas.

## 2. Alcance V1
- Login por usuario y contrasena.
- Dashboard de KPIs.
- Vistas de llamadas, citas y mensajes.
- Comparativa mes actual vs mes seleccionado.
- Descarga mensual CSV.
- Aislamiento de datos por `clientCode`.

## 3. Fuera de alcance V1
- Edicion de Twilio/OpenClaw/n8n por cliente.
- Facturacion.
- White-label.

## 4. Roles
- `CTO`, `CEO`, `OPERARIO`: pueden ver modulo de gestion de usuarios del portal.
- `CLIENTE`: solo lectura operativa de su negocio.

## 5. Criterios de exito
- Cada cliente solo ve su informacion.
- Reportes descargables por mes.
- Comparativas mensuales visibles y comprensibles.
