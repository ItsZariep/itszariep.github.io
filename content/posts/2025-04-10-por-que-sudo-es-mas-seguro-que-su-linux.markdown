---
layout: post
title: "¿Por qué sudo es mas seguro que su? - Linux"
date: 2025-04-10
categories: [Informativo, Linux]
tags: [linux, sudo, su, doas]
image: /img/thumb/sudosu.jpg
---

Hola gente ¿Cómo están? espero que estén bien, en esta ocasión hablare sobre la seguridad a la hora de ejecutar programas como super usuario en Linux, precisamente de la diferencia entre usar sudo y su, ya que aunque no lo parezca, no son intercambiables y en realidad hay varios beneficios al usar sudo en vez de su, asi que sin mas que decir, comencemos

## Contexto

Cómo dije en la introducción, En sistemas Unix y Linux, la gestión de privilegios es un aspecto fundamental de la seguridad y administración del sistema. Tradicionalmente, el comando su (switch user) ha sido la herramienta principal para cambiar de usuario, incluyendo el acceso a la cuenta de superusuario (root).

Sin embargo, herramientas como sudo y doas han ganado popularidad debido a sus ventajas en términos de seguridad, control de acceso y auditoría. En este ensayo, analizaremos detalladamente por qué sudo y doas son opciones superiores a su desde una perspectiva técnica y de seguridad.

## Diferencias fundamentales entre su, sudo y doas

Antes de analizar las ventajas de sudo y doas, es importante entender cómo funciona cada herramienta:

### `su` (substitute user o switch user):

- Permite cambiar a otro usuario, incluyendo root, iniciando una nueva sesión con sus permisos.
- Requiere la contraseña de la cuenta a la que se desea cambiar.
- No proporciona granularidad en los permisos; una vez dentro de la sesión de root, se tienen todos los privilegios sin restricciones.

### `sudo` (superuser do):

- Ejecuta un único comando con privilegios elevados sin necesidad de iniciar sesión como root. 
- Utiliza un archivo de configuración (`/etc/sudoers`) que permite definir reglas de acceso y restricciones para cada usuario.
- Puede registrar los comandos ejecutados para auditoría y supervisión.

### `doas` (dedicated OpenBSD application subexecutor):

- Alternativa más simple y ligera a sudo, desarrollada en OpenBSD.
- Funciona de manera similar a sudo, pero con una configuración más simple y un código base más pequeño, reduciendo la superficie de ataque. 
- Usa el archivo /etc/doas.conf para definir permisos de ejecución.

## Desventajas de `su` en términos de seguridad

Si bien su sigue siendo una herramienta funcional, presenta varios problemas de seguridad que hacen que su uso sea desaconsejado en muchos entornos modernos:

### Exposición de la contraseña de root

El uso de su requiere que los usuarios conozcan la contraseña de root. Esto implica que:

- Si un atacante obtiene acceso a la contraseña, tendrá control total del sistema. 
- No hay forma de restringir qué comandos puede ejecutar un usuario una vez que ha cambiado a root.
- En entornos con múltiples administradores, compartir la contraseña de root representa un grave riesgo de seguridad.

En contraste, sudo y doas permiten delegar permisos sin exponer la contraseña de root.

### Sesión de root sin restricciones
Cuando un usuario ejecuta `su -`, obtiene un shell interactivo con todos los privilegios de root. Esto significa que cualquier error o comando mal ejecutado puede dañar el sistema de forma irreversible.

Por otro lado, sudo y doas permiten ejecutar solo los comandos necesarios con privilegios elevados, sin necesidad de abrir una sesión de root permanente.

### Falta de auditoría y control
su no registra los comandos ejecutados en una sesión de root, lo que dificulta la auditoría y el monitoreo de acciones administrativas.

En cambio:

- `sudo` mantiene registros detallados en `/var/log/auth.log` (o en `/var/log/sudo.log` dependiendo de la configuración). 
- `doas` también permite cierto nivel de auditoría a través de logs del sistema (`/var/log/auth.log`).

Este registro de eventos es crucial para la seguridad en entornos multiusuario.

## Ventajas de sudo sobre su

### Control granular de permisos

sudo permite definir qué comandos puede ejecutar cada usuario sin necesidad de otorgarle acceso completo a root. Esto se gestiona a través del archivo `/etc/sudoers`, donde se pueden configurar reglas como:

Esta regla permite que user1 reinicie el servicio Apache sin necesidad de ingresar su contraseña ni obtener acceso total al sistema.

### Uso de autenticación basada en usuario 

sudo autentica a los usuarios utilizando sus propias credenciales en lugar de la contraseña de root, reduciendo la posibilidad de comprometer la cuenta de superusuario.

### Registro y auditoría de acciones

Cada comando ejecutado con sudo queda registrado en los logs del sistema, permitiendo un rastreo detallado de quién ejecutó qué acción y en qué momento. Esto es clave para detectar accesos no autorizados o errores operativos.

### Expiración de sesiones y gestión de tiempo

sudo tiene mecanismos de expiración de autenticación (`timestamp_timeout` en `/etc/sudoers`), lo que permite establecer un tiempo tras el cual se requiere reautenticación, mejorando la seguridad.

## Ventajas de doas sobre sudo

Si bien sudo es una herramienta poderosa, su configuración puede ser compleja en algunos escenarios. Aquí es donde doas presenta ciertas ventajas:

### Simplicidad y menor superficie de ataque

doas tiene un código base mucho más pequeño y menos dependencias que sudo, reduciendo la posibilidad de vulnerabilidades de seguridad.

### Configuración minimalista

Mientras que `/etc/sudoers` puede volverse complejo, doas utiliza un archivo de configuración mucho más sencillo.

### Mejor integración con OpenBSD
doas es la herramienta predeterminada en OpenBSD y se ha portado a otras distribuciones de Linux, ofreciendo una alternativa ligera y eficiente.

## sudo su
Finalmente, seguro que a todos se nos viene a la cabeza el comando `sudo su`, este comando como su propia estructura indica, llama a `sudo` para ejecutar `su`, o sea, hacer todo sin restricciones, o sea que es inseguro por que ni respeta los ajustes de sudo ni genera logs.

lo recomendable y lo que en realidad se suele hacer, es deshabilitar la ejecución de su con el ajuste:

```
Cmnd_Alias BLOCK_SU = /bin/su, /usr/bin/su
%sudo ALL=(ALL) ALL, !BLOCK_SU
```


preferiblemente también se podrían cambiar los permisos de binarios como `su`, `chmod` o `chown` para que incluso sin sudo, el usuario de base no pueda ejecutarlos, dando una doble capa de seguridad, esto, de nuevo, con los comandos que ven en pantalla:

incluso, en caso de que se quiera acceder con una cuenta sysadmin por ejemplo, se podría hacer que cierto grupo pueda ejecutarlo

### Alternativas a `sudo su`

Ahora, como alternativa al `sudo su` se pueden usar `sudo -s`, `doas -s` o `sudo -i` dependiendo la situación, estos dan una shell efectiva con permisos elevados, pero mantiene las configuraciones de sudo para evitar que se ejecuten ciertos comandos

## Conclusión

El uso de `su` en sistemas modernos presenta múltiples desventajas en términos de seguridad, control de acceso y auditoría. `sudo` y `doas` son herramientas superiores porque:

- No requieren compartir la contraseña de root. 
- Permiten otorgar permisos específicos en lugar de acceso total. 
- Registran las acciones para auditoría y supervisión. 
- Ofrecen mecanismos de control adicionales como expiración de sesiones.

Si se requiere un sistema robusto y flexible, sudo sigue siendo la mejor opción en la mayoría de los entornos. Sin embargo, para quienes buscan una solución más simple y ligera, doas puede ser una excelente alternativa, especialmente en sistemas que no requieren configuraciones complejas de permisos.

En conclusión, abandonar `su` en favor de `sudo` o `doas` es una decisión alineada con las mejores prácticas de seguridad en administración de sistemas Unix/Linux.

{{< youtube C-cOuBgUltk >}}
