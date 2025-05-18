---
layout: post
title: "Transmitir en directo con SimpleScreenRecorder (posible alternativa a OBS – Linux)"
date: 2022-10-09
categories: Linux Tutorial
image: /assets/img/thumb/ssrlinux.webp
---

¡Hola gente! ¿como están? En esta ocasión voy a mostrar como hacer un stream con SimpleScreenRecorder, esto puede ser útil especialmente para las computadoras que no son especialmente buenas y/o el OBS les va mal, o directamente no pueden abrirlo, así que sin mas que decir, empecemos.

## Procedimiento

En `SimpleScreenRecorder`, en el apartado de Output Profile (Perfil de salida) hay que escojer  el perfil que es para streams, en caso de que no aparezca, lo ajustan de la siguiente manera:

---

- Contenedor: `Otros | FLV`

- Códec de video: `Otros | libx264`

- bitrate de video: (va al gusto, 1000 por ejemplo)

- Códec de audio: `MP3`

- bitrade de audio: `128`

---

- Ademas de esto, hay que desmarcar "Add timestamp" (Añadir marca de tiempo)

- Finalmente, en Guardar como, se pone `rtmp://$URLDELSTREAM/$CLAVEDELSTREAM`

---

Despues de esto, al iniciar grabación, si esperan unos 15 o 20 segundos, verán que ya estarán transmitiendo.