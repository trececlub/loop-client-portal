# User Provisioning Flow (Portal)

## Objetivo
Permitir crear usuarios de acceso cliente desde roles internos, sin exponer administracion al usuario cliente final.

## Quienes pueden ver la seccion
- CTO
- CEO
- OPERARIO

## Quien no la ve
- CLIENTE

## Flujo de alta (manual)
1. Rol interno ingresa a `/usuarios`.
2. Crea usuario con: nombre, email, rol destino (`CLIENTE` por defecto), `clientCode`, estado.
3. Sistema valida unicidad de email.
4. Sistema genera credencial temporal o enlace de activacion.
5. Usuario cliente ingresa y cambia credencial en primer login.

## Reglas
- Todo usuario `CLIENTE` debe tener `clientCode` obligatorio.
- `CLIENTE` no puede crear ni editar otros usuarios.
- Usuarios internos no pueden ver data cruzada sin permisos definidos.

## Estados de usuario
- Active
- Disabled
- Pending Activation

## Auditoria minima
- Registrar quien creo/edito/deshabilito cada usuario.
- Registrar fecha/hora de ultimo acceso.
