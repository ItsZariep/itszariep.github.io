---
layout: post
title: "Saltar requisitos del instalador en Linux (Calamares)"
date: 2024-06-19
categories: Linux Tutorial
image: /assets/img/thumb/calamares.jpg
---

Hola gente, ¿Cómo están?, espero que estén bien, en esta ocasión voy a mostrar como saltar los requisitos del instalador Calamares, que es un instalador muy común entre distribuciones Linux.

## ¿Por que hacer esto?

Algunas distribuciones pueden tener requisitos que podríamos considerar saltables, como el mínimo de RAM, o tener que tener acceso a internet, a veces por diseño pueden ser obligatorias, pero otras veces solo son para no intentar instalar en hardware donde el sistema no funciona de manera óptima, pero igualmente no se pierde nada con intentar.

## Como hacerlo

La manera mas común de hacer esto es editando la configuración de calamares, para esto, hay que abrir el archivo `/etc/calamares/modules/welcome.con`f con nano, si nano no esta disponible, con `vi`; presionando la tecla "i" para entrar al modo de edición. Entonces, al abrir el archivo se verá de una forma similar a la siguiente:

```
showSupportUrl: true
showKnownIssuesUrl: true
showReleaseNotesUrl: true

requirements:
  requiredStorage: 7.9
  requiredRam: 1.0
  internetCheckUrl: https://manjaro.org
  check:
    - storage
    - ram
    - power
    - internet
    - root
  required:
    - storage
    - ram
    - root

geoip:
  style: "json"
  url: "https://ipapi.co/json"
  selector: "country"
```

La configuración puede variar según que distribución, pero es muy común que se use el modulo welcome y esa sea la ruta, aquí ya solo queda eliminar el requisito que se quiera saltar, por ejemplo, si se deseara saltar el requisito de memoria RAM, se eliminaría todas las lineas que tienen "`- ram`", quedando tal que:

```
showSupportUrl: true
showKnownIssuesUrl: true
showReleaseNotesUrl: true

requirements:
  requiredStorage: 7.9
  requiredRam: 1.0
  internetCheckUrl: https://manjaro.org
  check:
    - storage
    - power
    - internet
    - root
  required:
    - storage
    - root

geoip:
  style: "json"
  url: "https://ipapi.co/json"
  selector: "country"
```

Finalmente, solo queda guardar el archivo y salir del editor (`Ctrl+S -> Ctrl+X` en nano, `esc -> : -> wq` en vi), y al abrir el instalador de nuevo, este ya no requerirá los requisitos.