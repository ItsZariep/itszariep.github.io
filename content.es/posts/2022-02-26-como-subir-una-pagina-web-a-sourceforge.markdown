---
layout: post
title: "Cómo subir una pagina web a SourceForge"
date: 2022-02-26
categories: [Tutorial]
image: /img/thumb/sfpage.jpg
---

¡Hola gente! ¿cómo están? espero que estén bien en esta ocasión voy a mostrar cómo subir una página web para nuestros proyectos en sourceforge usando las paginas de SourceForge.

## Aclaración

Esta funcionalidad solo es para proyectos dentro de la plataforma no es para cosas triviales como blogs o cosas así, que creo que para esto hay mejores opciones.

Ademas, tienen que ser páginas estáticas, o sea nada de wordpress ni cosas raras, solo css html y javascript.

## Procedimiento

Primero es necesario conectarse via `SFTP` a `sftp://web.sourceforge.net`, para esto yo recomiendo usar el comando [`sftp`](https://www.openssh.com/) de OpenSSH, o bien [`filezilla`](https://filezilla-project.org/), que es gráfico. El nombre de usuario y contraseña son los mismos que los de tu cuenta de SourceForge

Despues hay que montar el directorio `/home/project-web/nombredetuproyecto`, el nombre de tu proyecto debe estar en minusculas.

Aquí aparecerán 2 folders, `cgi-bin` y `htdocs`, la raiz de la pagina debe ir en `htdocs`.