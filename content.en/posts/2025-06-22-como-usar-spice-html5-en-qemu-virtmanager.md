---
layout: post
title: "How to use spice-html5 in QEMU/virt-manager"
date: 2025-06-22
categories: [Tutorial]
tags: [qemu, virt-manager, spice]
---

## Why?

This can be useful if you need solid remote access to a virtual machine using SPICE/QXL but don't have access to the `spice-gtk` client for some reason.

## Preparation

### QEMU

If you are using QEMU without a GUI, you simply need to modify the SPICE parameter:

```ini
 -spice port=5900,disable-ticketing
```

This applies if you want to use port `5900` (this can be changed). For example, in a full command:

```sh
qemu-system-x86_64 \
  -m 1024 \
  -cdrom TinyCore-current.iso \
  -boot d \
  -vga qxl \
  -spice port=5900,disable-ticketing=on \
  -device virtio-serial \
  -chardev spicevmc,id=vdagent,debug=0,name=vdagent \
  -device virtserialport,chardev=vdagent,name=com.redhat.spice.0
```

### virt-manager

In virt-manager, you just need to ensure:
- `Spice Display -> Listen type` is set to `Address`
- `Spice Display -> Address` is set to `Localhost` or `All interfaces`

>  depending on your needs. Also, define a port if necessary (if set to `Auto`, it will default to `5900`).

## Starting spice-html5

To start `spice-html5`, you need to have [`websockify`](https://www.google.com/search?q=%5Bhttps://github.com/novnc/websockify%5D\(https://github.com/novnc/websockify\)) and, of course, [`spice-html5`](https://www.google.com/search?q=%5Bhttps://www.spice-space.org/spice-html5.html%5D\(https://www.spice-space.org/spice-html5.html\)) installed.

Once you have both installed and your virtual machine is running, simply execute the following command:

```ini
websockify --web=/usr/share/spice-html5/ 5959 localhost:5900
```

> `5959` is the target port, while `localhost:5900` is the input address.

With this, if you open `http://localhost:5959/spice.html` in your browser (or replace *localhost* with your device's IP), you will see the interface load and you'll be able to control the virtual machine.


{{< youtube RcDvZ88ewLQ >}}
