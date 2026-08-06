---
layout: post
title: "Utilicé un CELULAR viejo como una RASPBERRY PI"
date: 2023-07-09
categories: [Android, Informativo, Tutorial]
image: /img/thumb/samsungpi.jpg
---

¡Hola gente! ¿Cómo están? Espero que estén bien. La otra vez, hablando en el grupo de Telegram,
estábamos discutiendo cómo y donde hostear a Seleduck, que es un bot que tenemos ahí para experimentar y pasar el rato. Debido a que Oracle no me permitía crear la cuenta por más que lo intentara, en fin, entre varias opciones se me ocurrió una idea medio divagante, y es aprovechar un celular viejo que tengo guardado e instalar Termux en él.

## ¿Qué es termux?

Para los que no sepan, Termux es una app que nos permite tener una shell de Linux en Android. No es ningún tipo de emulación ni nada por el estilo, son binarios totalmente nativos. Entonces, podemos ejecutar desde comandos básicos hasta aplicaciones complejas. Debido a la poca potencia del celular, se me ocurrió que podríamos compararlo con una Raspberry Pi. Así que en este vídeo mostraré algunos ejemplos de uso y comparaciones. asi que sin más que decir, ¡empecemos!

## Configurar el dispositivo

En este caso, buscamos el mejor rendimiento, así que lo mejor es sacarle toda la basura al celular, como los servicios de Google. Así tendremos más RAM disponible, algo que este celular carece en este caso. Además, como el celular apenas tiene almacenamiento, nos ayudará a poder guardar más cosas. 

Sobre la instalación de Termux, no tiene mucha ciencia. Desde la página de F-Droid, se puede descargar un APK y al abrirlo ejecutamos "pkg update". 

## Configurar Termux

En mi caso, como me gusta más Pacman y Termux lo soporta, [reemplacé "apt" por "pacman"](https://.com/termux-reemplazar-dpkg-apt-por-pacman/). Esto, si bien no es necesario, nos ayuda a tener una paquetería más rápida. Se nota más en un almacenamiento lento como el de este celular, ya que Pacman es mucho más rápido que Apt.

Un poco fuera de la configuración, usar la terminal directamente desde el celular no es muy cómodo, así que ocuparemos instalar OpenSSH, que nos provee los protocolos SSH y SFTP. El primero es para acceder a la shell desde otro dispositivo y el segundo para acceder al sistema de archivos, el servidor ssh se inicia con el comando sshd.

Ahora estamos listos. Las cosas que haré van a ser un poco demasiado técnicas, para otras cosas populares de una Raspberry Pi, como emular, por ejemplo. Usar Termux nos quitará mucho rendimiento y es mejor usar emuladores de Android con un mando para estar más cómodos. Pero esto ya se sale del video.

## Ejemplos de uso

### Acceso SSH

Conectarse al dispositivo es bastante fácil teniendo OpenSSH en otro dispositivo. nos conectamos con el comando `ssh -p 8022 `, ya que Termux usa un puerto diferente al por defecto. Para SFTP es `sftp -P 8022`. Para SFTP, la mayoría de gestores de archivos modernos soportan acceso vía SFTP, lo cual puede ser útil para manejarnos de forma más cómoda.

---

A partir de aquí, podemos divergir en lo que queremos hacer. Para mi propósito, lo único que hice fue poner el código de mi bot, que está hecho en Python, y ejecutarlo.

Un detalle es que, obviamente, no tendremos la pantalla del celular activa todo el tiempo, pero si la apagamos notaremos un tremendo retraso. Para esto, lo mejor es desactivar todas las optimizaciones de batería, tanto las del sistema como las de la app de Termux. Esto ayudará a disipar el retraso.

### Ideas
Entonces, podriamos por ejemplo montar:
- Una pagina web
- Un bot telegram como hice yo
- Alguna base de datos pequeña
- Un mini centro multimedia si tenemos mucho espacio
- entre muchas otras cosas relacionadas.

### Almacenamiento LAN

Otra opción similar es usarlo como un NAS casero vía SFTP. Un NAS es un dispositivo de almacenamiento conectado a una red local que permite compartir y acceder a archivos de manera centralizada. Entonces, usando este celular como intermediario, podríamos conectarnos desde cualquier dispositivo del hogar, aunque una tarjeta SD es bastante recomendable, claramente.

### Usar proot-distro

Entonces, básicamente, podríamos hacer un mini-servidor. Pero aparte de eso, una característica algo interesante de Termux es el Proot-distro, que nos da algunas distribuciones bajo un entorno Proot.

Básicamente, esto nos permite cambiar el root y usar programas, librerías y demás del sistema que está en el root. Así, podemos tener, por ejemplo, Debian o Arch en un sistema diferente sin necesidad de crear una máquina virtual.

Aunque tiene sus respectivas limitaciones, sin ir muy lejos, una idea que se me ocurre es que si somos desarrolladores, en vez de crear una máquina virtual con ARM, podríamos intentar usar esto como alternativa para probar cómo se ejecuta el software en un sistema ARM.

Aunque hay varias arquitecturas de ARM, en mi caso, este es ARMv7l, es decir, de 32 bits. ARMv8.x es el de 64 bits, aunque tiene subversiones. En esencia, son lo mismo con mejoras de seguridad y rendimiento. También está el más moderno ARMv9, pero si vamos a usar un celular medio viejo, dudo que lo tenga.

### Ejecutar programas con interfaz grafica

Dejando de lado eso, también podríamos usar el celular como apoyo para ejecutar programas. Me explico, Termux tiene un repositorio llamado "x11", que incluye bibliotecas y programas para X11, es decir, programas con interfaz gráfica como GIMP, Inkscape o incluso Chromium.

Si el celular es lo suficientemente grande, incluso podríamos usar la aplicación Termux X11, que es básicamente un servidor de pantalla X11 para Termux, como una pantalla secundaria. En caso de que no nos interese, podemos hacer un redireccionamiento con SSH. Para eso, necesitamos instalar el paquete "xauth" en ambos dispositivos y agregar una línea simple a la configuración de SSH en ambos dispositivos (`../usr/etc/ssh/sshd_config` en termux, `/etc/ssh/ssh_config` en un Linux promedio).

```
X11Forwading yes
```

Después de eso, desde el dispositivo al que nos vamos a conectar, agregamos el parámetro "-Y" a ssh. Con esto, si ejecutamos, por ejemplo, GIMP desde la sesión SSH, este se mostrará en la pantalla del cliente.

Sin embargo, esto depende de la conexión y la potencia del dispositivo, ya que si el dispositivo es un poco débil, como el mío, Chromium, por ejemplo, será bastante inusable, aunque GIMP es más usable con un pequeño
retraso.

Ahora, ¿para qué querríamos hacer esto? Un ejemplo rápido sería suponer que no tienes una buena PC y estás editando un video. Estarás de acuerdo en que el editor de video en sí consume bastante potencia, dejando poco margen para abrir otras aplicaciones.

Pero supongamos que necesitas algún recurso de internet o necesitas hacer algo por tu cuenta en un editor de imágenes o vectores. En ese caso, puedes abrir el programa en el celular y, después de guardar el archivo, moverlo a tu PC.

## Conclusión

Como pudimos ver a lo largo del video, tener un celular se puede asemejar a tener una micro placa ARM, que os puede servir para varias aplicaciones, principalmente técnicas. Sin embargo, no recomiendo comprar un celular
viejo para realizar estas tareas. Si tienes el dinero, creo que una placa ARM sería más flexible. No obstante, es probable que tengas un celular guardado en el cajón del olvido y te interese darle algún uso.