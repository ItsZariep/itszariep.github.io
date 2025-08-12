---
layout: post
title: "¿Qué es el software de fuente disponible (Source Available) y por qué no es Open Source?"
date: 2025-04-17
categories: [Informativo, Programación]
tags: [open source, GPL, linux]
image: /img/thumb/sourceavailable.jpg
---

Hola, gente. ¿Cómo están? Espero que estén bien.

En esta ocasión hablaré sobre definiciones que muchas veces generan confusión. Incluso yo, que estoy relativamente metido en este tema, he llegado a confundirme y a discutir al respecto.

Fuera de eso, esta confusión ocurre más comúnmente en comunidades como la del software libre, el open source o el ecosistema Linux en general. Y es acerca de las licencias de software que usamos.

Sin ir muy lejos, muchos entendemos lo que significa software libre o código abierto, pero en algunos casos estos términos no aplican del todo, ya sea porque el software no es completamente libre o porque sus políticas impiden que se le denomine de cierta manera.

En este video explicaré qué es un programa source-available (o de fuente disponible) y en qué se diferencia de un software open source o de código abierto. Así que, sin más que decir, comencemos.

## Historia

Para entender mejor el contexto, es apropiado repasar un poco de historia.

En la década de los 80, Richard Stallman creó y promovió el concepto de software libre, estableciendo que un programa debía cumplir con ciertas libertades esenciales:

- Poder ejecutar el programa.

- Poder estudiar y modificar el software.

- Poder redistribuir copias exactas.

- Poder redistribuir versiones modificadas.

Basándose en estos principios, posteriormente se publicaron las licencias GPL.

Sin embargo, debido al poco interés de las empresas, principalmente por la confusión del término "*free*" en inglés (que podía interpretarse como *gratis* en lugar de *libre*), la adopción del software libre no fue tan amplia como se esperaba.

Aquí es donde entra en escena el concepto de Open Source, que en términos prácticos nació como una forma de promocionar el software libre bajo otro nombre, destacando ciertos beneficios que resultaban más atractivos para las empresas.

## El conflicto de términos

Sin embargo, aquí es donde surge un problema con los nombres. Aunque, en un sentido literal, "código abierto" debería significar simplemente que el código está disponible, la Open Source Initiative (OSI) estableció criterios específicos para que un software sea considerado open source. Si un software no cumplía con esas reglas, no podía ser reconocido como tal o solo se consideraba parcialmente open source.

Debido a esta situación, se acuñó el término source-available (fuente disponible en español), que se usa para describir software cuyo código es accesible, pero que no cumple necesariamente con los requisitos de la OSI. Estos criterios son bastante similares a los del software libre:

- Cualquier persona puede compartir el software sin restricciones.

- El código debe estar disponible para estudio, modificación y distribución.

- Se permite modificar el software y distribuir versiones derivadas bajo los mismos términos de la licencia original.

- No se puede restringir el uso del software a grupos específicos o con propósitos particulares.

## Diferencias clave del software source-available

Las licencias source-available, en la mayoría de los casos, imponen restricciones significativas, como:

- Prohibición de modificaciones o redistribución del código.

- Uso permitido solo para fines personales o educativos.

- Restricciones en su uso comercial.

Algunos ejemplos de software source-available son:

- **Vivaldi**: Aunque su base, Chromium, es open source, la versión específica de Vivaldi y sus componentes tienen términos que impiden su redistribución, por lo que no puede considerarse completamente de código abierto.

- **MongoDB**: Adoptó la licencia SSPL, que exige que cualquier empresa que use el software para ofrecer un servicio a terceros debe liberar el código de toda su infraestructura. Esto se considera una forma de discriminación, por lo que la OSI no la reconoce como open source.

- **Elasticsearch**: Su caso es similar al de MongoDB, ya que impone restricciones en su uso como servicio en la nube.

Estos ejemplos demuestran que tener acceso al código fuente no es suficiente para que un software sea considerado de código abierto. Aun así, estos proyectos suelen ser valorados por optar por la transparencia en lugar de mantenerse completamente cerrados.

## Ejemplos de licencias source-available

A continuación, una lista de algunas licencias source-available que no son open source según la OSI:

### Business Source License (BSL)

- Creada por MariaDB.

- Permite el acceso al código, pero restringe su uso comercial.

- Después de cierto tiempo, la licencia se convierte en open source.

### Server Side Public License (SSPL)

- Creada por MongoDB.

- Obliga a los proveedores de servicios en la nube a liberar su código si ofrecen el software como servicio.

### Elastic License (Elastic License 2.0, ELv2)

- Usada por Elasticsearch y Kibana.

- Permite el uso gratuito, pero restringe su implementación como servicio en la nube.

### Confluent Community License

- Usada en el ecosistema de Kafka.

- Permite uso y modificación, pero prohíbe ofrecerlo como servicio gestionado en la nube.

---

Evidentemente existen muchas más, pero menciono solo algunas para no alargar el video.

Todas estas licencias comparten el principio común de permitir el acceso al código fuente, pero con restricciones que las hacen incompatibles con la definición de software libre y open source.

## Conclusión

El término source-available es útil para describir software cuyo código fuente está disponible, pero que no otorga las mismas libertades que el open source. Es importante conocer estas diferencias para evitar confusiones y tomar decisiones informadas al elegir herramientas y tecnologías.

Mientras que el software de código abierto garantiza la libertad de uso, modificación y redistribución, el software source-available puede imponer restricciones significativas.

En última instancia, la diferencia entre ambos radica en la filosofía detrás de cada modelo de licenciamiento:

- El open source prioriza la libertad del usuario y la colaboración.

- El source-available ofrece acceso al código, pero con condiciones que pueden limitar su uso.


{{< youtube LhoCsNJgYcc >}}
