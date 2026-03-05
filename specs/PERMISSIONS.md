# Matriz de Permisos V1

## CLIENTE
- Puede: ver dashboard, llamadas, citas, mensajes, comparativas, reportes.
- No puede: gestionar usuarios, ver secciones tecnicas, modificar configuracion.

## OPERARIO
- Puede: gestion de usuarios del portal (segun politicas internas), visualizacion operativa.
- No puede: tocar configuraciones tecnicas de infraestructura en portal cliente.

## CEO
- Puede: gestion de usuarios del portal y visualizacion operativa.

## CTO
- Puede: gestion total de usuarios del portal y control de acceso.

## Regla transversal
Toda informacion mostrada se restringe por `clientCode`.
