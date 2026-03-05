# KPI Rules V1

## Periodo
- Toda metrica se calcula por rango de fechas seleccionado.
- Zona horaria: la del cliente.

## KPI base
- `llamadas_totales`: conteo de llamadas recibidas.
- `llamadas_atendidas`: llamadas con estado final atendido.
- `citas_agendadas`: citas creadas.
- `mensajes_enviados`: mensajes con estado enviado.
- `mensajes_fallidos`: mensajes con estado fallido.

## KPI derivados
- `tasa_conversion` = citas_agendadas / llamadas_totales.
- `duracion_promedio` = suma_duracion_llamadas / llamadas_totales.
- `tasa_no_atencion` = llamadas_no_atendidas / llamadas_totales.

## Comparativa mensual
- `variacion_abs` = valor_mes_A - valor_mes_B.
- `variacion_pct` = (variacion_abs / valor_mes_B) * 100.
- Si `valor_mes_B = 0`, mostrar "N/A" para porcentaje.

## Reglas de visualizacion
- Si no hay datos: estado vacio claro (no cero engañoso).
- Redondeo de porcentajes: 1 decimal.
- Duraciones en formato mm:ss para tablas y min decimal en cards.
