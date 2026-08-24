---
layout: post
title: "Removing Rust-based Programs on Arch Linux"
date: 2026-04-27
categories: [Tutorial]
tags: [linux]
image: /img/thumb/archnorust.jpg
---

## Why?

There is usually no practical advantage to removing Rust-based software, mainly because rust is not a runtime, it statically compiles the program into a single binary, maybe only a a storage size concern.

However, some users may want to audit their system for personal preference, minimalism, curiosity, or ideological reasons.

## Problem

On Arch-based distributions, Rust is often only a `makedepend`, so it is not listed in `pacman -Q` or similar package queries. That means there is no single command that can reliably detect which installed packages were built with Rust, because that information gets stripped from the package metadata.

## Possible Way

Most compilers leave some kind of watermark or signature in the binaries they produce, so maybe we can use that.

`rustc` usually leaves a trace in the `.comment` section:

```bash
readelf -p .comment /usr/bin/tokei
```

```bash
String dump of section '.comment':
  [     0]  GCC: (GNU) 15.2.1 20251112
  [    1b]  rustc version 1.92.0 (ded5c06cf 2025-12-08) (Arch Linux rust 1:1.92.0-1)
  [    65]  Linker: LLD 21.1.6
```
> [!IMPORTANT]  
> This method is heuristic, not authoritative.
It detects many Rust-built binaries, but not all of them.

Since Arch Linux usually places binaries in `/usr/bin`, we can do:

```bash
find /usr/bin -maxdepth 1 -type f -executable -print0 |
xargs -0 -P"$(nproc)" -n50 readelf -p .comment 2>/dev/null |
awk '
/File:/ {file=$0}
/rustc/ {print file; print}
'
```

Or, a slower but more compatible way:

```bash
readelf -p .comment /usr/bin/* 2>/dev/null | grep -E "(File:|rustc)" | grep -B 1 "rustc"
```

This will print something like:

```yaml
File: /usr/bin/bat
  [    1c]  rustc version 1.93.0 (254b59607 2026-01-19) (Artix Linux rust 1:1.93.0-1)
File: /usr/bin/paru
  [    1b]  rustc version 1.92.0 (ded5c06cf 2025-12-08) (Arch Linux rust 1:1.92.0-1)
File: /usr/bin/resvg
  [    1c]  rustc version 1.93.1 (01f6ddf75 2026-02-11) (Artix Linux rust 1:1.93.1-1)
File: /usr/bin/bluetui
  [    14]  rustc version 1.94.0 (4a4ef493e 2026-03-02) (Arch Linux rust 1:1.94.0-3)
```

Then you can manually evaluate whether you really need that software, or check [Arch](https://archlinux.org)/[Artix](packages.artixlinux.org/) Package list to confirm whether the package was actually built with Rust or if it is a false positive.

For example, if you want to replace `bat` (Rust), since it is not a core program, one option could be `ccat` (Go).

## Common alternatives

If you want to switch, i list some common alternatives (Please see notes below):

| Program | Description | Alternative(s) |
| --- | --- | --- |
| [`paru`](https://github.com/morganamilo/paru) | AUR Helper | [`yay`](https://github.com/jguer/yay) (Go), [`pakku`](https://github.com/zqqw/pakku) (Nim) |
| [`bat`](https://github.com/sharkdp/bat) | Print a file with highlighting | [`ccat`](https://github.com/jingweno/ccat) (Go), core `cat` |
| [`lsd`](https://github.com/lsd-rs/lsd) / [`eza`](https://github.com/eza-community/eza) | List files with icons/colors | [`colorls`](https://github.com/athityakumar/colorls) (Ruby), Core `ls` |
| [`tokei`](https://github.com/XAMPPRocky/tokei) | Count lines of code | [`scc`](https://github.com/boyter/scc) (Go) |
| [`ripgrep` (rg)](https://github.com/BurntSushi/ripgrep) | Fast recursive text search | Core `grep`, [`ack`](https://github.com/beyondgrep/ack3) (Perl), [`ag`](https://github.com/ggreer/the_silver_searcher) (C) |
| [`fd`](https://github.com/sharkdp/fd) | Simplified file finder | Core `find` |
| [`zoxide`](https://github.com/ajeetdsouza/zoxide) | Smarter cd (frecency-based) | `cd`, [`autojump`](https://github.com/wting/autojump) (Python) |
| [`bottom` (btm)](https://github.com/ClementTsang/bottom) | System/process monitor | [`htop`](https://github.com/htop-dev/htop) (C), [`btop`](https://github.com/aristocratos/btop) (C++) |
| [`dust`](https://github.com/bootandy/dust) | Visual disk usage | `du`, [`ncdu`](https://code.mynoname.net/ncdu/) (C), [`gdu`](https://github.com/dundee/gdu) (Go) (TUI) |
| [`xh`](https://github.com/ducaale/xh) | User-friendly HTTP client | [`curl`](https://github.com/curl/curl) (C), [`httpie`](https://github.com/httpie/httpie) (Python) |
| [`bandwhich`](https://github.com/imsnif/bandwhich) | Network utilization | [`iftop`](https://pdw.ex-parrot.com/iftop/) (C), [`nethogs`](https://github.com/r-lyeh/nethogs) (C++) |
| [`delta`](https://github.com/dandavison/delta) | Syntax-highlighting pager | Standard `git` diff, [`diff-so-fancy`](https://github.com/so-fancy/diff-so-fancy) (Perl) |
| [`starship`](https://github.com/starship/starship) | Minimal, fast shell prompt | [`Oh My Zsh`](https://github.com/ohmyzsh/ohmyzsh) (Shell) |
| [`zellij`](https://github.com/zellij-org/zellij) | Terminal multiplexer | [`tmux`](https://github.com/tmux/tmux) (C), [`screen`](https://git.savannah.gnu.org/cgit/screen.git) (C) |



> While `find` is more powerful for complex logical expressions, fd is significantly faster and uses regex by default, which is why most people prefer it for daily use.

> `zoxide` is generally considered the fastest "jump" tool because it's written in Rust and hooks into your shell more efficiently than the older Python-based autojump.

> `bat` is often used as a `man` page pager or a `git` previewer because it handles syntax highlighting and paging in one go, whereas standard `cat` simply dumps text to the terminal, if you use `nvim` you may prefer using it as manpager: `MANPAGER=nvim +Man!`.

> `bottom` (btm) and `btop` provide a much higher "glance value" than `htop` due to their integrated live graphing of CPU and network spikes, which normally requires separate tools.

> `eza` It’s usually preferred for modern workflows because it supports "hyperlinks" (clickable file paths) and has better support for Git status symbols directly in the file list.

> `ripgrep` (rg) is built on Rust’s regex engine that uses finite automata; it avoids backtracking, which means it won't "hang" or slow down exponentially on complex search patterns compared to standard `grep`.

> `delta` is specifically designed to make code reviews in the terminal easier; it provides side-by-side diffs and "within-line" highlighting (showing exactly which characters changed), which the standard `git diff` lacks.

> `zellij` includes a "built-in" discovery UI at the bottom of the screen, making it much more approachable for beginners than `tmux`, which usually requires memorizing a "prefix" key (like `Ctrl+b`) and several shortcuts just to split a window.

> `xh` is often preferred over `httpie` because it is a single native binary. This eliminates the "startup lag" common with Python-based tools, which is noticeable when scripts make hundreds of sequential API calls.

> `dust` provides a "tree-like" visual representation of disk space. Unlike `du -h`, it automatically sorts the largest directories to the bottom of your screen so you don't have to scroll back up to find what is eating your storage.