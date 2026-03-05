# Arquitectura Funcional (Planeacion)

## Productos separados
- `loop-admin`: operacion interna y configuracion tecnica.
- `loop-client-portal`: portal informativo para clientes.

## Aislamiento multi-tenant
- El `clientCode` identifica el tenant.
- Toda consulta del portal se filtra por `clientCode`.
- Sin acceso cruzado entre clientes.

## Modulos portal V1
1. Login
2. Dashboard
3. Llamadas
4. Citas
5. Mensajes
6. Comparativas
7. Reportes
8. Perfil

## Integraciones de datos (lectura)
- Twilio (eventos de llamada)
- OpenClaw (estado conversacional y outcomes)
- n8n (resultados de automatizaciones)

## Nota
En esta fase no se implementa codigo, solo definicion de estructura.
