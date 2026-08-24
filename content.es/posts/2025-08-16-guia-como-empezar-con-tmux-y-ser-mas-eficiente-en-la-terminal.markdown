---
layout: post
title: "Cómo empezar con tmux y ser mas eficiente en la terminal"
date: 2025-08-16
categories: [Tutorial]
image: /img/thumb/guia-tmux.jpg
---

¡Hola gente! ¿Cómo están? espero que estén bien, en esta ocasión me gustaría hacer una guia acerca de como usar y configurar tmux. A mi experiencia, usar tmux es mucho mas comodo y eficiente que usar la terminal de base.

## ¿Qué es tmux?

`tmux` (*terminal multiplexer*) es una herramienta en terminal que permite:

- Tener múltiples sesiones de terminal.
- Dividir una ventana en paneles.
- Mantener procesos corriendo incluso si cierras la terminal.
- Reconectarte a sesiones remotas (muy útil con SSH).

Es como tener varias “ventanas” y “pestañas” dentro de la misma terminal, y poder organizarlas según la necesidad.


En casi cualquier sistema, el paquete `tmux` es instalable desde el gestor de paquetes, también se puede compilar el [código fuente](https://github.com/tmux/tmux/wiki)

## Conceptos básicos

En tmux hay tres niveles principales:

1. Sesión: Conjunto de ventanas y paneles (piensa en un proyecto).
2. Ventana: Pestaña dentro de una sesión.
3. Panel: División dentro de una ventana.

Prefijo (`prefix`): combinación de teclas para indicar que el siguiente comando es para tmux (por defecto `Ctrl+b`).

## Uso básico de tmux

### Crear y entrar en una sesión

```bash
tmux -u             # crea sesión nueva
tmux -u new -s nombre  # crea sesión con nombre
```

> `-u` es necesario para que tmux soporte UTF-8 correctamente

### Salir y reconectar


- Ctrl+b d: Salir de la sesión (detach) sin terminarla
- tmux attach: Reconectar a última sesión
- tmux attach -t nombre: Reconectar a sesión específica
- tmux list-sessions: Listar sesiones
- tmux kill-session -t nombre: Cerrar sesión


> Estos comandos se pueden asignar a una combinación de teclas, esto lo veremos despues

## Comandos importantes dentro de tmux

| Acción                   | Tecla (después de `Ctrl+b`)                        |
| ------------------------ | -------------------------------------------------- |
| Nueva ventana            | `c`                                                |
| Cambiar ventana          | `n` (siguiente), `p` (anterior), número de ventana |
| Renombrar ventana        | `,`                                                |
| Dividir panel vertical   | `%`                                                |
| Dividir panel horizontal | `"`                                                |
| Moverte entre paneles    | flechas o `o`                                      |
| Cerrar panel             | `x`                                                |
| Redimensionar panel      | `Ctrl+b` y luego `Alt`+flechas                     |
| Ver lista de comandos    | `?`                                                |

## Configuración en `~/.tmux.conf`

Para mejorar la experiencia y tener una mejor personalización, crear una configuración es muy recomendable:

```bash
nano ~/.tmux.conf
```

Ejemplo de mi configuración personal:

```tmux
## Colores y compatibilidad

# Habilita soporte de true color (24 bits) para cualquier terminal
set -as terminal-overrides ',*:Tc'

# Habilita el uso del ratón (seleccionar texto, cambiar paneles, etc.)
set -g mouse on

# Modo de teclas tipo Vi en copy mode
setw -g mode-keys vi

# Notificación visual/sonora cuando hay actividad en una ventana
setw -g monitor-bell on

## Portapapeles y notificaciones

# Sincroniza el portapapeles del sistema con tmux
set -g set-clipboard on

# Al soltar el botón central del ratón, pegar texto
bind -T root MouseUp2Pane paste


## Cambio del prefijo

# Elimina combinaciones por defecto
unbind C-b
unbind C-S-s
unbind Enter

# Establece Ctrl+a como nuevo prefijo (en vez de Ctrl+b, es mas comodo)
set-option -g prefix C-a
bind-key C-a send-prefix

## Creación y manejo de paneles

# Crear paneles verticales/horizontales con Ctrl+Shift + flechas
bind-key -n C-S-Down split-window -v
bind-key -n C-S-Up split-window -v
bind-key -n C-S-Left split-window -h
bind-key -n C-S-Right split-window -h

# Nueva ventana con Ctrl+Alt+s
bind-key -n C-M-s new-window

# Navegar entre ventanas con Ctrl+Alt + flechas izquierda/derecha
bind-key -n C-M-Right next-window
bind-key -n C-M-Left previous-window

# Navegar entre paneles con Ctrl + flechas
bind-key -n C-Right select-pane -R
bind-key -n C-Left select-pane -L
bind-key -n C-Up select-pane -U
bind-key -n C-Down select-pane -D

## Copiar y pegar

# Entrar en copy mode con Alt + flechas izquierda/derecha
bind-key -n M-Left copy-mode
bind-key -n M-Right copy-mode

# Pegar con Ctrl+Alt+v
bind-key -n C-M-v paste

## Barra de estado

# Mostrar hora en formato HH:MM AM/PM a la derecha
set-option -g status-right "%I:%M %p"

# No mostrar nada en el lado izquierdo
set-option -g status-left ''

# Estilo de copy mode invertido
set -g mode-style 'reverse'

# Fondo de la barra de estado color verde (color2)
set -g status-bg color2

# Ventana activa: fondo negro, texto blanco
set -g window-status-current-style bg=color0,fg=color15

# Ventanas inactivas: estilo por defecto
set -g window-status-style bg=default


## Títulos de ventana

# Permitir que tmux cambie el título de la ventana del terminal
set -g set-titles on

# Mostrar nombre de proceso actual como título
set -g set-titles-string "#W"
```

Luego recargas dentro de tmux:

```
Ctrl+a r
```

## Plugins

`tmux` soporta plugins para añadir funcionalidades extra:


Primero hay que clonar [`tpm`](https://github.com/tmux-plugins/tpm)

```
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

despues hay que agregar la lista de plugins a `~/.tmux.conf`, por ejemplo yo uso estos plugins

```
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-yank'
```

Finalmente, al final de la configuración, hay que inicializar `tpm`

```
run '~/.tmux/plugins/tpm/tpm'
```

Ejemplo con plugins:

```
set -as terminal-overrides ',*:Tc'
set -g mouse on
setw -g mode-keys vi
setw -g monitor-bell on

set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-yank'

set -g set-clipboard on
bind -T root MouseUp2Pane paste

unbind C-b
unbind C-S-s
unbind Enter
set-option -g prefix C-a
bind-key C-a send-prefix

# Configurar tmux-yank, para un mejor manejo de copiar/pegar

set -g @yank_with_mouse on
set -g @yank_line "c"
set -g @copy_mode_yank "c"
set -g @copy_mode_put "v"
set -g @copy_mode_yank_put "C-M-v"

bind-key -n C-S-Down split-window -v
bind-key -n C-S-Up split-window -v
bind-key -n C-S-Left split-window -h
bind-key -n C-S-Right split-window -h

bind-key -n C-M-s new-window
bind-key -n C-M-Right next-window
bind-key -n C-M-Left previous-window

bind-key -n C-Right select-pane -R
bind-key -n C-Left select-pane -L
bind-key -n C-Up select-pane -U
bind-key -n C-Down select-pane -D

bind-key -n M-Left copy-mode
bind-key -n M-Right copy-mode
bind-key -n C-M-v paste


set-option -g status-right "%I:%M %p"
set-option -g status-left ''
set -g mouse on
set -g mode-style 'reverse'

set -g status-bg color2

set -g window-status-current-style bg=color0,fg=color15
set -g window-status-style bg=default

set -g set-titles on
set -g set-titles-string "#W"

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
```

## Uso avanzado

### Nombres y scripts

Puedes iniciar tmux con una estructura lista:

```bash
tmux new -s dev \; \
  split-window -h \; \
  send-keys 'htop' C-m \; \
  select-pane -L \; \
  split-window -v \; \
  send-keys 'tail -f /var/log/syslog' C-m
```

### Sincronizar paneles

Muy útil si quieres enviar los mismos comandos a varios paneles:

```
Ctrl+a :
```

y escribir:

```
setw synchronize-panes on
```

Para apagar:

```
setw synchronize-panes off
```

## Recursos externos

`tmux` ofrece una [wiki](https://github.com/tmux/tmux/wiki) oficial con guias y configuraciones acerca de como usar el programa, también en su repositorio es posible explorar issues para resolver problemas.