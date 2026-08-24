---
layout: post
title: "Termux: Replace DPKG/APT with pacman"
date: 2023-02-23
categories: [Android, Tutorial]
image: /img/thumb/termuxpacman.jpg
---

## Why do this?

Pacman is usually faster than apt, so by switching the package manager we’ll have a faster experience when installing packages (especially on older devices). Termux has repositories with pacman, so it’s not a crazy idea.

## Procedure

- Update the system:

```
pkg upgrade
```

- Install pacman:

```
pkg install pacman
```

- Initialize and update pacman keys:

```
pacman-key --init && pacman-key --populate
```

- Install pacman using pacman (sounds redundant, but this adds pacman and its dependencies to the “pacman database”). Also install apt and dpkg (this is to add them to the database so they can later be removed with pacman):

```
pacman -Syu pacman dpkg apt --overwrite '*'
```

- Remove dpkg and apt using pacman:

```
pacman -Rns dpkg apt
```

---

With this, dpkg and apt will no longer be on the system, and everything will rely purely on pacman. However, Termux’s `pkg` commands are also compatible with pacman, so you can keep using them normally.

## Possible issues

### File already exists

Some packages may throw an error saying a file already exists. In that case, just use `--overwrite '*'`.

### Repository does not exist

It’s rare, but if it happens, you can open `~/../usr/etc/pacman.conf` and change the mirrors according to:
[https://github.com/termux-pacman/termux-packages](https://github.com/termux-pacman/termux-packages)
