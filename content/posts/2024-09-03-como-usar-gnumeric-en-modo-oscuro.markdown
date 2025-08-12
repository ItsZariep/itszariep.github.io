---
layout: post
title: "Cómo usar Gnumeric en modo oscuro"
date: 2024-09-03
categories: [Linux, Tutorial]
tags: [gnu, gnumeric, linux, windows]
image: /img/thumb/gnumericoscuro.jpg
---

¡Hola gente! ¿Cómo están?, espero que estén bien, en este tutorial rapido mostraré como poner GNUmeric en modo oscuro, para el que anda perdido, gnumeric es un programa para manejar hojas de calculo similar a Excel.

## Problema

Gnumeric no tiene opción para poner la cuadricula con colores oscuros, lo que puede causar problemas en la lectura para personas con problemas de vision con temas claros

## Procedimiento

1. Abrir la hoja de estilos css de gnumeric con un editor de texto:

Linux:

```
$HOME/.config/gtk-3.0/gtk.css
```

Windows:

```
C:\Users\TuUsuario\AppData\Roaming\gtk-3.0\gtk.css
```

Al final del archivo poner lo siguiente:

```
/* Fondo de las celdas */ 
GnmItemGrid,
GnmPreviewGrid,
GocCanvas {
	background-image: none;
	background-color: #1A1A1A; /* Escojer color de fondo deseado */ 
	color: #91a666;
	padding: 0;
	border-style: none;
	border-width: 0;
}

/* Borde de las celdas */

GnmItemGrid.grid,
GnmPreviewGrid.grid {
	color: #a6a6a6;
}

/* Cursor (Celda seleccionada) */
GnmItemCursor.normal {
  color: #eeeeee;
}

/* Colores editando una celda directamente */
GnmItemEdit {
  background-color: #3a3a3a;

  /* This doesn't seem to kick in.  We seem to get the color from the
     style.  */
  color: #a6a6a6;
}

/* The whole column/row selected. */
button:active.itembar, button:active.itembar * {
    color: white;
    font-weight: bold;
}

/* Some, but not all, of a column/row selected. */
button:hover.itembar, button:hover.itembar * {
  color: white;
  font-weight: bold;
}
```

Con esto, GTK3 sobreescribirá varios valores de la interfaz de Gnumeric, gracias a que Gnumeric tiene componentes internos independientes, estos cambios no afectan a otros programas hechos en GTK3

## Color del texto

El Unico problema que no pude resolver es el color del texto, por mas que cambiaba todo, el texto seguía siendo negro, asi que el unico incapie con este procedimiento sería seleccionar todas las celdas del documento y declarar que el texto de estas sea blanco, si alguien conoce una solución, que me la haga saber en los comentarios.