---
layout: post
title: "¿Por qué Linux tiene DOS generadores de números aleatorios?"
date: 2026-08-05
categories: [Informativo, Sistemas operativos]
tags: [linux]
image: /img/thumb/devrandom.jpg
---

En Linux existen dos archivos que generan numeros aleatorios. y usar el incorrecto podía romper tu seguridad

## ¿Que son?

`/dev/random` y `/dev/urandom` son interfaces del kernel para generar bytes aleatorios, usados en criptografía: llaves SSH, certificados, tokens, etc

## Diferencias
La diferencia nace de la ***entropía***: el ruido físico real que junta el sistema, como movimientos del mouse o timing del disco.

`/dev/random`, en su diseño clásico, **se bloqueaba**, o sea, te hacía esperar si creía que se había quedado sin suficiente entropía 'fresca'.

`/dev/urandom` **nunca se bloquea**: usa un generador pseudoaleatorio (*`CSPRNG`*) sembrado con esa entropía, y sigue produciendo bytes sin parar.

## Utilidad actual

Actualmente, en Linux moderno (Desde la versión de [Linux `5.6`](https://kernelnewbies.org/Linux_5.6)), esa distinción realmente no importa. Una vez que el *`CSPRNG`* tiene suficiente entropía inicial dípicamente al arrancar el sistema es criptográficamente seguro para siempre.

Aunque la recomendación estándar, incluso de los propios devs del kernel, es: **usar `/dev/urandom`**, o mejor aún, si se está trabajando con C, la syscall `getrandom()`.

## Conclusión

`/dev/random` podia colgarse esperando entropía sin necesidad real. `/dev/urandom` es rápido, seguro, y es lo que usan librerías como OpenSSL por debajo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

{{< youtube Sl04uaEz3YU >}}