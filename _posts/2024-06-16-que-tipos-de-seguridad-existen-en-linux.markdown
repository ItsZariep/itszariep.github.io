---
layout: post
title: "¿Qué tipos de seguridad existen en Linux?"
date: 2024-06-16
categories: Informativo Linux
image: /assets/img/thumb/linuxsecurity.jpg
---

¡Hola gente! ¿cómo están? espero que estén bien, en esta ocasión voy a hablar sobre la seguridad en sistemas Linux, algunas cosas cambien aplican a otros unix-like, pero yo me centraré en Linux, también hay varios tipos de seguridad, yo intentare cubrir las mas importantes, así que sin mas que decir, empecemos.

## Índice

Primero, un índice para tener orden:
en este post se verán:

- Control de Acceso

- Cifrado

- Sistemas de protección del sistema

- Auditoría y monitoreo

- Seguridad de red

- Seguridad en el Kernel

## 1.- Control de Acceso

En cualquier sistema unix-like hay 2 tipos de accesos:

### El primero es el acceso de archivos:

Para esto, hay 2 jerarquías, primero esta el propietario, el cual es (`user`), luego el grupo, el cual es (`group`), y finalmente otros, el cual es (`others`); Cada archivo y directorio en Linux tiene un conjunto de permisos asociados que definen quién puede leer, escribir o ejecutar el archivo.

Para esto, el sistema de archivos guarda una serie de bits de permiso; los cuales son representados con 3 letras:
`r` de (Read), `w` de (Write), `x` de (eXecute).

Ejemplo: `-rwxr-xr--` indica permisos de lectura, escritura y ejecución para el propietario, lectura y ejecución para el grupo, y solo lectura para otros, también se pueden usar números, dependiendo del numero se cumplen las mismas funciones

### El segundo es el control de acceso basado en roles (RBAC):

En Linux no es tan complejo, ya que los unicos 2 roles que suele haber son `root`, que es la cuenta que tiene permiso de hacer casi lo que sea, y el usuario, que es una cuenta con permisos limitados, pero es técnicamente posible crear mas niveles dependiendo de las necesidades.

### El tercero, relacionado al segundo, es el control de acceso a usuario:

Regularmente el kernel se suele encargar de estas tareas, pero también puede apoyar de `PAM`, entonces, para el control de acceso, se usan 3 recursos:

- Los detalles de los usuarios, los cuales se guardan en /etc/passwd

- Las contraseñas, cifradas por supuesto, en /etc/shadow

- La información sobre los grupos, en /etc/group

las contraseñas suelen usar un sistema de autenticación basado en contraseñas con hash seguro (SHA-512, bcrypt, etc.)

Actualmente es muy común que se use PAM como apoyo, el cual permite configurar diversos métodos de autenticación, como autenticación de contraseñas, tarjetas inteligentes, biometría, etc., básicamente es una opción mas moderna y actualizada, pero no reemplaza a lo existente.

## 2.- Cifrado

El cifado es una forma común de mantener información segura, yo la pongo separada de los permisos por que es otro segmento complejo.

Primero para cifrado de archivos y disco tenemos a LUKS, es una serie de herramientas para cifrar todo el disco, muchas veces se usa en conjunto con cryptsetup, el cual sirve para configurar al propio LUKS.

Luego, para cifrar solo archivos lo común es usar GnuPG, el cual solo como curiosidad, también se usa para cifrar correos.

## 3.- Sistemas de protección del sistema

Acá hay varias tecnologías con proposito diferente pero que se centran en la protección del sistema.

El primero y posiblemente mas popular es SELinux (Security-Enhanced Linux):

Este proporciona un mecanismo de control de acceso obligatorio (MAC) que impone políticas (o sea Define qué acciones están permitidas o prohibidas para ciertos procesos) de seguridad a nivel de kernel.

Una tecnologia similar a SELinux es AppArmor, el cual es otro sistema de control de acceso obligatorio que proporciona un mecanismo para definir perfiles de seguridad para aplicaciones.

Además de estas opciones, también esta cgroups el cual se centra mas que nada en administrar los limites al uso de recursos (como CPU o Memoria RAM) de los procesos.

## 4.- Auditoría y Monitoreo

Esto es para poder saber exactamente lo que sucede en el sistema, revisando los registros que dejan los procesos, para esto tenemos distintas tecnologias:

Primero, para monitoreo, tenemos a syslog y a journald:

syslog es un sistema tradicional que almacena registros de eventos del sistema, mientras que journald es un sistema más moderno que almacena logs en un formato binario y permite la gestión avanzada de logs.

Después, para Auditoría lo mas común es Auditd, el cual es un demonio que proporciona un marco para realizar auditoría de eventos del sistema. Permite configurar reglas para auditar acciones específicas.

## 5.- Seguridad de Red

Para la seguridad de red, lo mas importante suele ser el firewall, para esto lo mas común es usar iptables o nftables, los cuales sirven para configurar reglas de filtrado de paquetes y controlar el tráfico de red.

Ademas de estas opciones, SElinux y AppArmor también pueden servir para agregar protecciones y permisos a cosas relacionadas a la red y sockets, muchas veces en conjunto con iptables o nftables.

Despues, si se trata de a nivel servidor, se suelen usar opciones como Fail2ban, el cual monitorea los logs del sistema en busca de intentos de acceso fallidos y bloquea las IPs que intentan acceder repetidamente.

## 6.- Seguridad en el Kernel

Las seguridad del kernel muchas veces es algo personalizable, para esto tenemos varias opciones:

La primera es con Módulos del Kernel, como lo que hace LKM (Loadable Kernel Modules), el cual permite la adición de funcionalidades al kernel sin necesidad de reiniciar el sistema.

Después tenemos el endurecimiento del kernel, o kernel hardening, el cual consiste en varios parches para mejorar la seguridad del sitema.

Unos ejemplos son `Grsecurity` y `PaX`, que son parches para el kernel centrados en mejorar la seguridad, añadiendo características como la protección de la ejecución del código y la prevención de desbordamientos de búfer.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/S5CdTCtNGY8?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>