# Wireframes Funcionales V1

## 1. /login
- Campos: email, contrasena.
- Accion: ingresar.
- Resultado: redireccion por rol y tenant.

## 2. /dashboard
- Header: nombre del cliente, rango de fecha.
- KPIs: llamadas totales, citas, conversion, mensajes enviados/fallidos.
- Grafica principal: tendencia diaria del mes.
- Tarjeta comparativa: mes actual vs mes seleccionado.

## 3. /llamadas
- Tabla: fecha, origen, duracion, estado, resultado.
- Filtros: rango de fecha, resultado, estado.
- Busqueda: numero o referencia.

## 4. /citas
- Tabla: fecha/hora, estado, origen, observacion.
- Filtros: estado y rango.
- Resumen superior: total creadas/confirmadas/canceladas.

## 5. /mensajes
- Tabla: fecha, canal, estado, plantilla, destinatario.
- Filtros: canal, estado, rango.
- Resumen: enviados vs fallidos.

## 6. /comparativas
- Selector mes A (actual por defecto).
- Selector mes B (historico).
- Graficas: barras KPI por mes, linea de tendencia, variacion porcentual.

## 7. /reportes
- Selector de mes.
- Boton descargar CSV.
- Historial simple de ultimas descargas.

## 8. /perfil
- Datos basicos del usuario.
- Zona horaria de visualizacion.
- Cierre de sesion.

## 9. /usuarios (visible solo CTO/CEO/OPERARIO)
- Tabla de usuarios cliente.
- Acciones: crear, editar estado, reset credencial.
- Asignacion obligatoria de `clientCode`.
