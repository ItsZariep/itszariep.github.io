---
layout: post
title: "¿Por qué las distribuciones Linux no pueden correr apps de Android?"
date: 2025-06-23
categories: [Android, Informativo, Linux]
tags: [waydroid]
image: /assets/img/thumb/noandroid-linux.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien. Seguramente ustedes alguna vez han escuchado que Android usa el nucleo linux por debajo, sin embargo, si yo me voy a Ubuntu, Fedora o Arch e intento abrir un apk, este no va a abrir, entonces, ¿que sucede aqui?

En esta ocasión voy a hablar acerca de las diferencias entr Android y las distribuciones con Linux tradicionales y por que estas no pueden ejecutar apps de android de base, asi que sin mas que decir, ¡Comencemos!

## Diferencias en el Kernel

Para empezar, aunque si bien es cierto que android usa el kernel linux, este utiliza algunas "extensiones" necesarias para el funcionamiento del sistema android, por ejemplo `ashmem` o `binder`, y aunque parezca raro, las distribuciones linux tradicionales no las tienen por que simplemente no son necesarias para el uso común de Linux en el escritorio.

Pero bueno, supongamos que compilo el kernel, o los modulos `dkms` si están disponibles, y ahora mi sistema ya tiene binder por ejemplo, incluso con esto los programas aun no abren.

Pues dejando de lado que el formato de las apps de Android es un APK y las distribuciones tradicionales no las suelen instalar, Android también tiene diferencias en sus componentes y runtime.

## Diferencias en el runtime

Primero, comenzando con la librería C, Android no usa glibc como la mayoria de distribuciones, si no que usa una llamada `Bionic`, asi que en principio deberíamos tenerlo.

Despues, Android no usa ni Wayland ni Xorg, en su lugar usa algo llamado `SurfaceFlinger`, y como dato curioso este SurfaceFlinger debido a cosas raras en su codigo, no funciona bajo glibc, esto no es tan raro y hasta cierto punto le pasa a systemd, el cual no puede funcionar en musl, y por este motivo sistemas como void linux no lo usan, pero bueno esto ya se sale del tema.

pero  lo que realmente diferencia a un programa para linux tradicional de uno de android, es el runtime de las apps; Ya que mientras que una app Linux puede ejecutarse directamente como un binario ELF (formato ejecutable para Linux), una app Android requiere ser interpretada o bien compilada con Just-in-time (JIT) por ART, algunas apps (especialmente juegos) usan el NDK de android. Todo esto no está presente en ninguna distribución Linux tradicional.

Esto da pie a que también se usan frameworks distintos debido a las diferencias entre los 2 sistemas, aunque haya frameworks multiplataforma, como `Flutter`, estos suelen tener logicas separadas para Android y para Linux tradicional.

Luego, aunque un poco menos importante, los APKs de android son algo distintos a los paquetes tradicionales; ya que por ejemplo un deb o un rpm suelen tener la estructura del programa como si estuviera en root, mientras que android tiene solo la información y datos de la app, y muchas veces codigo DEX que tiene que ser compilado por pm, el gestor de paquetes de Android.

## Diferencias en filosofia de ejecución

Dejando de lado componentes del sistema, También tenemos 2 diferencias bastante notables en el funcionamiento base:

1. Sandboxing: Cada aplicación Android se ejecuta en su propio usuario del sistema y está aislada del resto del sistema mediante sandboxing. Esto está profundamente integrado en el diseño de Android. En cambio, en una distribución tradicional, las aplicaciones generalmente comparten el mismo espacio de usuario y permisos, a menos que se utilicen tecnologías adicionales como contenedores o Flatpak.

2. Permisos y políticas: Android usa `SELinux` de forma obligatoria en modo "enforcing", con políticas muy restrictivas para aislar apps y procesos. Aunque muchas distros de Linux también pueden usar SELinux o AppArmor, al menos en escritorio este no suele ser tan estricto y suele diferir bastante de Android.


## ¿Que se puede hacer para correr apps de android en una distribución Linux tradicional ?

Con todo esto, ¿no se puede imitar un android sin necesidad de emular o virtualizar?

Pues, "Si se puede", con Waydroid o Anbox, (que por dentro son iguales, aunque Waydroid es mas moderno), los cuales ejecuta un contenedor LXC con una imagen de Android, usando extensiones como Binder, tengo un articulo completo hablando de [como funciona Waydroid por dentro]({% post_url 2025-02-23-como-funciona-waydroid-por-dentro %}), por si les interesa verlo mas a detalle.

Estrictamente hablando no es emulación; por que se usa la arquitectura nativa del PC, ni virtualización; ya que no es un sistema con RAM o CPU alojadosindependientemente. Pero es cierto que si es como correr un sistema dentro de otro ya que toca bajar toda una imagen de android.

Sin embargo fuera de eso, es lo mas cercano que tenemos a correr apps de android en linux, también sumado a que no es obligatorio tener toda la interfaz de android y podemos dejar por ejemplo el servicio de waydroid en segundo plano y ver las aplicaciones como ventanas independientes.

### Conclusión

A pesar de compartir un núcleo común, Android y las distribuciones tradicionales de Linux son sistemas fundamentalmente distintos en arquitectura, entorno de ejecución, bibliotecas, y filosofía de diseño. Android está diseñado para dispositivos móviles, con un enfoque en seguridad y aislamiento, mientras que las distribuciones tradicionales de Linux están orientadas a sistemas más abiertos, flexibles y generalistas.

Por esta razón, no es posible ejecutar aplicaciones Android directamente en una distribución Linux sin una capa intermedia que simule el entorno específico de Android. Esta separación técnica también refleja la diversidad y flexibilidad del ecosistema basado en Linux.

Y a ustedes ¿Se les ocurre alguna forma diferente de ejecutar apps de android en Linux? ¿Ya conocían la existencia de Waydroid y Anbox? dejenme su opinión en los comentarios.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/D4zgX0hg8y0?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>