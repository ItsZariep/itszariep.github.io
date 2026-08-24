---
layout: post
title: "Termux: How to use Termux-X11"
date: 2025-10-27
categories: [Tutorial]
tags: [termux, x11]
image: /img/thumb/termux-x11.jpg
---

## Why?

Termux-x11 is a more integrated method to have graphical session than using the unconvenient VNC method.

## Requirements

- [Termux](https://github.com/termux/termux-app)
- [Termux-X11](https://github.com/termux/termux-x11)

## Procedure

### Install the required packages

```bash
pkg update
```

```bash
pkg install x11-repo
```

```bash
pkg install termux-x11-nightly
```

> If you have [pacman in Termux], it is not necessary to install `x11-repo`.

In addition to this, you can also install a desktop environment or window manager. In this example, I will use `IceWM` and `XFCE`, but the Termux repositories also offer other options such as `Openbox` or `LXQt`.

### Configure the environment

At this point, Termux should have `termux-x11` available as a command. It is recommended to declare `$DISPLAY=:0` as an environment variable inside the `~/.profile` file (if it does not exist, you can create it with `touch ~/.profile`) so that any program you open runs in the Termux-X11 session.

- `~/.profile`

```bash
export DISPLAY=:0
```

### Run the graphical environment

Now you only need to run `termux-x11` and the desired desktop environment or window manager (preferably in a new Termux session).

Fortunately, this can be summarized into a single command:

```bash
termux-x11 :0 -xstartup "dbus-launch --exit-with-session {command}"
```

For example:

- `XFCE`

```bash
termux-x11 :0 -xstartup "dbus-launch --exit-with-session startxfce4"
```

- `IceWM`

```bash
termux-x11 :0 -xstartup "dbus-launch --exit-with-session icewm-session"
```

If you chose another environment, you will need to check what its startup command is, for example: `fluxbox`, `openbox`, `startlxqt`, or `mate-session`.

Preferably, you can save it as a command (for example, in `~/../usr/bin`) and give it execution permissions. For example:

- `~/../usr/bin/customx11`

```bash
termux-x11 :0 -xstartup "dbus-launch --exit-with-session icewm-session"
```

```bash
chmod +x ~/../usr/bin/customx11
```

With this, simply typing `customx11` will launch the environment:

```bash
customx11
```

### End the session

Normally, it is enough to log out (or close the window manager) from the graphical interface. Otherwise, pressing `Ctrl + C` should terminate the session.

## Conclusion

Using **Termux-X11** is useful if we want or need a traditional Linux-like environment on our Android devices. Termux-X11 also supports keyboard and mouse input, which improves the user experience.

