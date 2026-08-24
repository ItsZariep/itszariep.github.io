---
layout: post
title: "Changing the TTY Color Scheme in Linux"
date: 2024-06-23
categories: [Linux, Tutorial]
---

## Procedure

First, you need a color scheme. While it's possible to write one manually, there are tools that generate schemes easily. E.G [VT Colorscheme Generator](https://itszariep.codeberg.page/vt-colorscheme-generator/) (created by me), which generates it right from your browser.

### Method with Root

If you have root access (as in most cases), the most recommended way is to modify the kernel's execution line. This is done through the bootloader configuration. For **GRUB**, you need to open the file `/etc/default/grub` and look for the line `GRUB_CMDLINE_LINUX`. You should append the color scheme to the end of that line, resulting in something like this:

**Original:**
```ini
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

**Modified:**
```ini
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash vt.default_red=42,166,145,166,102,154,102,166,102,166,145,166,102,154,102,166 vt.default_grn=42,105,166,156,119,102,166,166,102,105,166,156,119,102,166,166 vt.default_blu=42,102,102,102,166,166,170,166,102,102,102,102,166,166,170,166"
```

> See [Arch Wiki/Kernel Parameters](https://wiki.archlinux.org/title/kernel_parameters) for more information about kernel parameters on other bootloaders

### Method without Root

If you don't have root access, you can still change the scheme, but it will only be visible during your active session. To change the scheme in this case, you must open your shell configuration (e.g., `.bashrc`/`.zshrc`/etc) and add a series of commands that change the session colors ([VT Colorscheme Generator](https://itszariep.codeberg.page/vt-colorscheme-generator/) also generates color schemes for the shell). Your shell configuration would look something like this:

```bash
#... PS1, other commands, aliases, etc.

printf "\033]P02a2a2a"; printf "\033]P1a66966"; printf "\033]P291a666"; printf "\033]P3a69c66"; printf "\033]P46677a6"; printf "\033]P59a66a6"; printf "\033]P666a6aa"; printf "\033]P7a6a6a6"; printf "\033]P8666666"; printf "\033]P9a66966"; printf "\033]Pa91a666"; printf "\033]Pba69c66"; printf "\033]Pc6677a6"; printf "\033]Pd9a66a6"; printf "\033]Pe66a6aa"; printf "\033]Pfa6a6a6";
```