---
layout: post
title: "¿Cómo funciona Waydroid por dentro?"
date: 2025-02-23
categories: [Informativo, Linux]
tags: [waydroid, linux, android, lxc]
image: /img/thumb/waydroid.jpg
---

Hola gente ¿Cómo están? espero que estén bien, en esta ocasión explicaré como funciona Waydroid por dentro, Waydroid, para los que no sepan, aunque sería raro si ya están aquí, es un programa para Linux que permite ejecutar aplicaciones de android en un entorno aislado, y que a diferencia de usar genymotion o qemu por ejemplo, no se emula ningún hardware completo.

Mas que nada explicaré funcionamiento interno y como está implementada esta tecnologia, asi que sin mas que decir, comencemos.

Como dije en la introducción, Waydroid software que permite ejecutar un sistema Android dentro de un sistema con linux tradicional (Linux Mint, Manjaro, OpenSUSE, etc). Esta se basa en la tecnología de contenedores de Linux para proporcionar un entorno Android altamente integrado con el sistema anfitrión. A diferencia de las máquinas virtuales tradicionales, Waydroid se ejecuta con un rendimiento casi nativo gracias al uso del kernel compartido. Si quieren ver mas información acerca de los contendores, tengo un video hablando mas a detalle, de esta forma no extiendo de mas este video.

**Arquitectura general**
Waydroid se compone de varios elementos esenciales que interactúan entre sí para proporcionar una experiencia Android fluida dentro de Linux: 
1. **Contenedor LXC (Linux Containers):** Waydroid ejecuta Android dentro de un contenedor LXC, lo que permite aislar el sistema Android del sistema anfitrión de Linux, pero sin necesidad de virtualización pesada, esto también hace que en lugar de emular un hardware completo, Waydroid y en general LXC, compartan el mismo kernel de del sistema anfitrión, reduciendo la sobrecarga y mejorando el rendimiento.

2. **Imagen de Waydroid**: Waydroid necesita una imagen de android personalizada que cambia varios aspectos necesarios para que se pueda mostrar correctamente en un contenedor LXC

3. **Compositor de Gráficos (Wayland):** Android de manera común usa un componente llamado hwcomposer.ranchu junto con SurfaceFlinger, este de manera general sería como el procolo grafico de android. Por temas de compatibilidad con la libreria C, no se puede ejecutar bajo glibc sin hacer modificaciones pesadas, y aun asi no sería optimo, en su lugar las imagenes de android usan un ranchu modificado que saca el output directamente por Wayland.

Esto tambien hace que Waydroid pueda utilizar la GPU directamente a través de Vulkan o OpenGL para proporcionar una experiencia fluida en aplicaciones que requieren aceleración de hardware, cosa que en Qemu por ejemplo es mas complicado de lograr.

4 *binder* finalmente, para que todo esto funcione bien, Waydroid hace uso de binder: Binder es un mecanismo de IPC usado en android que permite un acceso mas eficiente a los recursos del sistema.

### ** Operación interna paso a paso**
En una sesión regular de Waydroid, deberían suceder los siguientes eventos:

1. **Proceso de inicio**
- Cuando ejecuta `waydroid session start`, el servicio Waydroid inicializa:
- Se lanza un contenedor LXC. 
- Se carga la imagen de Android modificada.
- Waydroid configura los espacios de nombres y los montajes necesarios.

2. **Tiempo de ejecución de Android en el contenedor**
- Waydroid inicia el sistema Android dentro del contenedor.
- Se inicia el `init` de android junto con `servicemanager` para los servicios esenciales
- Se inicia el proceso **Zygote** de Android, que es responsable de lanzar aplicaciones.
- Se inicializan los servicios del sistema como el Administrador de actividades, el Administrador de paquetes y el Administrador de entradas.

3. **Representación de gráficos**
- Las aplicaciones de Android representan su interfaz de usuario a través de **SurfaceFlinger**. 
- El componente **hwcomposer.ranchu** modificado redirige la representación a **Wayland** en lugar de a un framebuffer de Android.
- Esto permite que las aplicaciones aparezcan como ventanas nativas de Wayland.

4. **Manejo de entrada**
- El sistema de entrada **evdev** de Linux captura las entradas del teclado, el mouse y la pantalla táctil. 
- Estos eventos se reenvían al contenedor de Android.

5. **Redes**
- Un puente de red virtual permite que las aplicaciones de Android se conecten a Internet. 
- El contenedor LXC maneja las configuraciones de DNS e IP.

6. **Ejecución de aplicaciones de Android**
- Una vez que el sistema está en ejecución, puede instalar APK usando `adb` o el administrador de paquetes de Waydroid. 
- Las aplicaciones se inician usando el ciclo de vida estándar de Android, pero sus ventanas se muestran usando **superficies de Wayland**.

7. **Proceso de apagado**
- Cuando Waydroid se detiene, apaga Android sin problemas.
- El contenedor LXC se termina, liberando recursos del sistema.

**Componentes clave**
- **Binder:** Es el mecanismo de comunicación entre procesos (IPC) utilizado por Android. Waydroid lo implementa a través de un módulo del kernel para que las aplicaciones Android funcionen correctamente. 
- **Ashmem (Android Shared Memory):** Permite la compartición de memoria entre procesos dentro del entorno Android.
- **Gralloc (Graphics Memory Allocator):** Gestiona la asignación de memoria para renderizado de gráficos. 
- **Audio y red:** Waydroid enruta el audio a través de PipeWire y configura una interfaz de red virtual para conectar Android al internet del anfitrión.

**Integración con el sistema anfitrión**
Una de las principales ventajas de Waydroid es su capacidad para integrarse con Linux de manera eficiente. Algunas de sus características incluyen:
- **Ejeción de aplicaciones en ventanas separadas:** En lugar de ejecutar Android en una sesión de pantalla completa, las aplicaciones pueden ejecutarse como ventanas individuales en el escritorio. 
- **Soporte para compartir archivos:** Se pueden montar directorios compartidos para facilitar el acceso a archivos entre Android y Linux.
- **Acceso a hardware:** Waydroid permite el uso de la GPU, cámara y otros periféricos sin necesidad de emulación.

**Conclusión**
Waydroid representa una solución eficiente para ejecutar aplicaciones Android en entornos Linux sin la penalización de rendimiento de una máquina virtual. Gracias a su uso de contenedores, su integración con el kernel de Linux y su compatibilidad con Wayland y X11, ofrece una experiencia fluida y cercana a nativa. Su arquitectura modular y el aprovechamiento del hardware disponible hacen de Waydroid una herramienta poderosa para desarrolladores y usuarios que necesitan compatibilidad con Android dentro de su sistema Linux.

{{< youtube m7EsO35Recg >}}
