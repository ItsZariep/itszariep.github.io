---
layout: post
title: "Cómo crear un repositorio personalizado en Arch Linux"
date: 2022-05-31
categories: Tutorial Linux
image: /assets/img/thumb/pacmanrepo.jpg
---

Hola gente, ¿cómo están? Espero que estén bien. En esta ocasión voy a mostrar cómo hacer un repositorio de Arch Linux. Este post, más que ser útil para hacer un repo personalizado, nos servirá para entender cómo funcionan los repositorios de Arch.

## Procedimiento

### Preparación

Lo primero que hay que hacer es crear una carpeta. Dentro de esta, lo más óptimo es crear una subcarpeta donde irán todos los `PKGBUILD`. Esto no es estrictamente necesario, pero permite:

1. Tener más orden y facilidad para actualizar paquetes.
2. Mostrar cómo se construyen los paquetes al público, otorgando mayor seguridad a terceros, especialmente si se comparte el repositorio.

Ya con esto, lo siguiente es crear algunos paquetes. En este ejemplo, compilaré:

* La terminal `sakura`
* El gestor de archivos `spacefm`
* El editor de textos `pico`

No hay un mínimo de paquetes, pero usaré dos inicialmente y luego agregaré el tercero para mostrar cómo se agregan.

En este punto la jerarquía debe verse así:

```
ItsZariep@PC~/duckverse-> tree
.
└── PKGBUILDS
    ├── pico
    │   └── PKGBUILD
    ├── sakura
    │   └── PKGBUILD
    └── spacefm
        └── PKGBUILD

4 directories, 3 files
```

---
### Crear un PKGBUILD

Este proceso es bastante extendido, pueden ver pkgbuilds de ejemplo en el [`AUR`]() o leer la [documentación de `PKGBUILD`](https://wiki.archlinux.org/title/PKGBUILD)

---

### Configurar `makepkg` y Crear el Paquete

Para crear los paquetes, ve a la carpeta donde está el `PKGBUILD` y ejecuta:

```bash
makepkg
```

Antes de eso, quizá quieras configurar `makepkg`. Para hacerlo, copia el archivo de configuración:

```bash
cp /etc/makepkg.conf ~/.makepkg.conf
```

Configura lo siguiente según tu necesidad:

* **`MAKEFLAGS`**: Para compilar más rápido con múltiples hilos.

  ```bash
  MAKEFLAGS="-j8"  # Si tienes 8 hilos
  ```

* **`PKGEXT`**: Para cambiar la extensión del paquete.

  ```bash
  PKGEXT='.pkg.tar.zst'
  ```

* **`PACKAGER`**: Para personalizar el nombre del empaquetador.

  ```bash
  PACKAGER="ItsZariep"
  ```

---

### Agregar el Paquete al Repositorio

Una vez tengas los paquetes, colócalos en una carpeta con el nombre de la arquitectura destino (por ejemplo, `x86_64`), luego ejecuta en esa carpeta:

```bash
repo-add name.db.tar.gz *.pkg.tar.zst
```

> **Nota:** Cambia la extensión si usaste otra. Recomiendo guardar este comando en un script para facilitar futuras actualizaciones.

La jerarquía ahora debería verse así:

```
ItsZariep@PC~/duckverse-> tree
.
├── pkgbuilds
│   ├── sakura
│   │   └── PKGBUILD
│   ├── pico
│   │   └── PKGBUILD
│   └── spacefm
│       └── PKGBUILD
└── x86_64
    ├── db
    ├── duckverse.db -> duckverse.db.tar.gz
    ├── duckverse.db.tar.gz
    ├── duckverse.files -> duckverse.files.tar.gz
    ├── duckverse.files.tar.gz
    └── sakura-3.8.7-1-x86_64.pkg.tar.zst

5 directories, 9 files
```

> **Nota:** `db` es el nombre del script donde se guardó el comando `repo-add`.

---

### Agregar el Repositorio a Pacman

Edita `/etc/pacman.conf` y añade:

```ini
[duckverse]
SigLevel = Never
Server = file:///home/itszariep/.local/share/duckverse/$arch
```

Si subiste tu repositorio a GitHub (y activaste GitHub Pages), también puedes usarlo remotamente:

```ini
[duckverse]
SigLevel = Never
Server = https://itzselenux.github.io/$repo/$arch
```

---

### Agregar o Actualizar Paquetes

Para agregar más paquetes al repo:

1. Crea el nuevo `.pkg.tar.zst` como antes.
2. Agrégalo al directorio correspondiente.
3. Actualiza la base de datos con `repo-add`.

Para actualizar un paquete:

1. Recompílalo.
2. Reemplaza el archivo viejo.
3. Vuelve a ejecutar `repo-add`.

---

## Conclusión

Crear un repositorio para `pacman` es relativamente fácil. Sin embargo, si piensas hacer algo público y formal, ten mucho cuidado con las licencias, ya que muchas no permiten redistribución. No respetarlas puede traerte problemas legales.

Fuera de eso, como dije, no requiere mucha ciencia crear y actualizar un repositorio, pero sí tiempo para mantenerlo.

También recomiendo usar claves **GPG** para firmar los archivos y brindar mayor seguridad.