---
layout: post
title: "Configurar modo de energia en el arranque en GPUs Intel y AMD (Linux)"
date: 2025-08-12
categories: [Tutorial, linux]
image: /img/thumb/linuxintelamdgpuenergyboot.jpg
---

Hola gente ¿Cómo están? espero que estén bien, en esta ocasión voy a mostrar una guía acerca de cómo configurar modos de energía y frecuencias de GPU AMD (GCN o posterior) e intel (Gen6 o posterior),  antes de iniciar sesión en el entorno gráfico, usando reglas *udev*.

Esto es útil para quienes quieren evitar depender de herramientas gráficas como *CoreCtrl* y prefieren una configuración automática desde el arranque.


## Requisitos

### Hardware

- AMD: GPU GCN o superior (driver `amdgpu`).
  Cualquier modelo lanzado desde 2012.
- Intel: GPU Gen6 o superior (driver `i915`).
  Cualquier modelo lanzado desde 2012.

### Sistema

- Linux con soporte `udev`.
- Acceso root.

## Configuración básica
### Niveles de rendimiento

### AMD

Editar o crear el archivo `/etc/udev/rules.d/amdgpu.rules` con el siguiente contenido:

```udev
ACTION=="add", SUBSYSTEM=="drm", DRIVERS=="amdgpu", ATTR{device/power_dpm_force_performance_level}="low"
```

Valores posibles para `power_dpm_force_performance_level`:

* `auto` → la GPU ajusta dinámicamente (valor por defecto).
* `low` → mínimo consumo.
* `high` → máximo rendimiento.
* `manual` → el usuario define frecuencias específicas.

## Configuración avanzada
### Control granular de frecuencias

### Archivos `pp_*`

En `/sys/class/drm/cardX/device/` encontrarás parámetros para ajustar SCLK, MCLK y perfiles de energía.

Archivos clave:

* `pp_dpm_sclk` → frecuencias de núcleo.
* `pp_dpm_mclk` → frecuencias de memoria.
* `pp_power_profile_mode` → perfiles predefinidos.
* `pp_od_clk_voltage` → overclock/undervolt manual.
* `pp_od_support` → indica si hay soporte para OverDrive.

Ejemplo de regla udev:

```udev
ACTION=="add", SUBSYSTEM=="drm", DRIVERS=="amdgpu", \
ATTR{device/power_dpm_force_performance_level}="manual", \
ATTR{device/pp_dpm_sclk}="7", ATTR{device/pp_dpm_mclk}="2"
```

#### Notas
- Los números (`7`, `2`, etc.) son estados DPM visibles con:
  - ```bash
    cat /sys/class/drm/card0/device/pp_dpm_sclk
    ```
  
- Usar `manual` para que las frecuencias se mantengan fijas.

## Intel
### Archivos `gt_*_freq_mhz`

En Intel, en `/sys/class/drm/card0/` se pueden fijar frecuencias mínima, máxima y de *boost* (esto ultimo en GPUs mas modernas).

Ejemplo de regla udev en `/etc/udev/rules.d/i915.rules`:

```udev
ACTION=="add", SUBSYSTEM=="drm", DRIVERS=="i915", \
ATTR{gt_min_freq_mhz}="300", ATTR{gt_max_freq_mhz}="1100", ATTR{gt_boost_freq_mhz}="1100"
```

#### Notas:

 * Los valores están en MHz y dependen del modelo.
 * Consultar frecuencias actuales:

```bash
 cat /sys/class/drm/card0/gt_*_freq_mhz
```

## Aplicar cambios sin reiniciar

Después de modificar o crear reglas, ejecutar los siguientes comandos:

```bash
sudo udevadm control --reload-rules
```

```bash
sudo udevadm trigger
```

## Consideraciones importantes

- Fijar frecuencias altas aumenta consumo y temperatura.
- En portátiles, puede reducir drásticamente la autonomía.
- Algunas configuraciones requieren parámetros especiales al cargar `amdgpu` o `i915`.
- Si hay inestabilidad, es recomendable volver a los valores por defecto (`auto`).