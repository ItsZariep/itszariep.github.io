---
layout: post
title: "¿Cómo funcionan las baterias en Linux? (ACPI)"
date: 2024-10-20
categories: [Informativo, Linux]
tags: [linux, baterias, acpi, ]
image: /img/thumb/bateriaslinux.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien. Si usan cualquier dispositivo minimamente portatil como una laptop seguro que ya saben que usan baterias, sin embargo, a nivel sistema operativo es un poco mas tecnico y es necesaria una gestión adecuada para garantizar el rendimiento óptimo del sistema.

En Linux, la administración de energía, incluyendo la supervisión y optimización del uso de las baterías, es manejada por una combinación de subsistemas, herramientas de software y el propio kernel. en este vídeo explicare cómo funcionan las baterías en Linux, abarcando desde la interacción con el hardware hasta el monitoreo y control de energía a nivel de usuario. Así que sin mas que decir, ¡Comencemos!

### 1. Introducción a la gestión de baterías en Linux

En un sistema Linux, la administración de energía es una capa crítica que tiene como objetivo proporcionar información precisa sobre el estado de la batería y optimizar el consumo energético.

La gestión de baterías involucra dos componentes clave: 
- **El kernel de Linux**: que se encarga de la interacción directa con el hardware a través de controladores.
- **Las herramientas de espacio de usuario**: que permiten la supervisión y ajuste de parámetros relacionados con la batería.

### 2. Subsistema de energía en el kernel de Linux

Siendo mas especificos con el kernel, el subsistema de energía es responsable de la interacción directa con los componentes de hardware relacionados con la energía, como la batería y el adaptador de corriente. Este subsistema incluye el **ACPI (Advanced Configuration and Power Interface)**, que es el estándar utilizado para la administración de energía en muchos dispositivos.

ACPI permite al sistema operativo obtener información sobre el estado de la batería, el nivel de carga, la capacidad y otros datos esenciales.

#### 2.1 ACPI y sus funciones

Siendo mas técnicos, ACPI es una especificación que permite a sistemas operativos especialmente unix-like como Linux o los BSD, comunicarse con el firmware del hardware y gestionar varios aspectos relacionados con el consumo de energía, como la carga de la batería o incluso estados como suspensión e hibernación.

A través del ACPI, el kernel puede consultar y ajustar dinámicamente los estados de energía del sistema, así como obtener lecturas detalladas del estado de la batería, que son esenciales para tomar decisiones sobre la gestión de energía.

Por ejemplo, el kernel accede y proporciona información sobre el estado de la batería (carga restante, capacidad máxima, voltaje, etc.) a través de archivos en el sistema de archivos virtual **`/sys/class/power_supply/`**. Aquí, cada fuente de alimentación del sistema (batería o adaptador de corriente) tiene su propio directorio con varios archivos que contienen información clave.

Este comportamiento también permite a programadores externos conseguir información de la batería de manera sencilla.

#### 2.1 Controladores y módulos

El kernel se comunica con el hardware de la batería a través de módulos de controladores específicos. Estos controladores se encargan de interpretar las señales enviadas por el hardware y proporcionar la información en un formato comprensible para el sistema. En general, el controlador más utilizado para la administración de baterías es **`battery.ko`**, que es un módulo del kernel que proporciona la funcionalidad básica para monitorear las baterías en sistemas portátiles.

Los datos que proporcionan estos controladores suelen incluir: 
- **Capacidad total de la batería**: La capacidad máxima que puede almacenar la batería en mAh (miliamperios-hora).
- **Energía restante**: La cantidad actual de carga que queda.
- **Estado de la batería**: Si está descargándose, cargándose o completamente cargada.
- **Tasa de descarga**: La cantidad de energía que se está consumiendo en un momento determinado.

### 3. Herramientas de usuario para la gestión de baterías

Además de la infraestructura del kernel, existen varias herramientas de espacio de usuario que permiten al usuario final interactuar y gestionar el uso de la batería en un sistema Linux, yo voy a mencionar las mas importante.

#### `upower`

`upower` es una interfaz de alto nivel que proporciona información sobre el estado de la energía del sistema y de los dispositivos conectados, como la batería. Es utilizado por varios entornos de escritorio (como GNOME y KDE) para proporcionar estadísticas de energía al usuario, y es una de las herramientas más comunes para consultar el estado de la batería.

Ejemplo de uso de `upower`: 
```
upower -i /org/freedesktop/UPower/devices/battery_BAT0
``` 

Esto devolverá detalles como el porcentaje de carga, el tiempo estimado restante antes de que la batería se agote y la capacidad total de la batería.

#### `tlp`

`TLP` es una herramienta avanzada de administración de energía para Linux, diseñada específicamente para optimizar el rendimiento de la batería en portátiles. Ofrece configuraciones predefinidas que permiten al usuario ajustar aspectos clave del consumo energético, como la frecuencia de la CPU, el ahorro de energía en los dispositivos USB y el modo de suspensión de la tarjeta gráfica.

Una vez instalado, `TLP` funciona automáticamente sin necesidad de intervención constante del usuario. Algunas de sus funciones incluyen:
- Ajuste dinámico de la CPU para reducir el consumo energético cuando no se necesita mucho procesamiento.
- Gestión avanzada de los dispositivos USB para desactivarlos cuando no se están utilizando.
- Control de la temperatura de la batería y ajuste de los límites de carga para evitar sobrecalentamientos.

#### 3. `powertop`

`powertop` es una herramienta que permite monitorear y optimizar el uso de energía del sistema, identificando qué aplicaciones o procesos están consumiendo más energía. Es útil para diagnosticar problemas de consumo energético y para sugerir optimizaciones.

### 4. Conclusión

En resumen, la gestión de baterías en Linux y otros sistemas unix like, es un proceso altamente configurable y eficiente, que combina la interacción directa con el hardware mediante el kernel y herramientas de usuario como `upower` o `tlp`.

Realmente no es un tema muy complicado, pero tiene es algo importante y util si se desea configurar o programar algo relacionado con la batería, y ustedes ¿Como configurar su batería en linux? ¿Se les ocurre otra forma de implementar esto?, dejenme su opinión en los comentarios.

{{< youtube q9z-lZTS4RE >}}
