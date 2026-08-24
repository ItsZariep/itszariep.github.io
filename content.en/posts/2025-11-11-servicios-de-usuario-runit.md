---
layout: post
title: "How to Have User Services in Runit"
date: 2025-11-11
categories: [Tutorial]
tags: [linux]
---

## Why do this?

Unlike simply launching programs normally, having them as services gives us the advantage of being able to **supervise, stop, or restart them** independently, without needing to restart the entire session.

If that is the case, you're probably interested in having **user services** in Runit. These services work similarly to system services, but with `runsvdir` running under the user instead of `root`.

## Requirements

Before starting, you need to prepare the following directory hierarchy.
They don’t necessarily have to be in this location, but this guide assumes they are created like this:

```
-> ls ~/.local/share/runit/
├── sv/
└── service/
```

In `sv/`, the services will be defined, while in `service/`, the **symbolic links** (active services) will be located.

To quickly create the directories, you can use this command:

```bash
mkdir -p ~/.local/share/runit/{sv,service,log}
```

## Services

### Installation

User-level services for Runit can be found in various places.

In my [Codeberg repository](https://codeberg.org/itszariep/zariep-runit-usersv), I have some that I personally use.

### Manual Creation

For creating a service, I’ll use a service that starts `pipewire` as an example.

The structure of a service should look like this:

```
-> tree /home/itszariep/.local/share/runit/sv/pipewire
├── log
│   └── run
└── run
```

The `run` file contains the command that will be executed. For example:

```bash
#!/bin/sh
exec pipewire 2>&1
```

Meanwhile, `log/run` specifies where the service log will be stored:

```bash
#!/bin/sh
exec svlogd -tt ~/.local/share/runit/log/pipewire
```

> Having a log is not mandatory, but it is recommended to help identify service errors.

### Activation

After adding or creating services in `~/.local/share/runit/sv/`, you need to **activate** them.
To do this, simply create a symbolic link:

```bash
ln -s ~/.local/share/runit/sv/pipewire ~/.local/share/runit/service/
```

If you created multiple services, you can link them all with a single command:

```bash
ln -s ~/.local/share/runit/sv/* ~/.local/share/runit/service/
```

### Result

Assuming there are several services, the structure should look similar to this:

```
-> tree /home/itszariep/.local/share/runit/
.
├── log
│   ├── mate-polkit
│   ├── pipewire
│   ├── pipewire-pulse
│   └── wireplumber
└── sv
    ├── mate-polkit
    │   ├── log
    │   │   └── run
    │   └── run
    ├── pipewire
    │   ├── log
    │   │   └── run
    │   └── run
    ├── pipewire-pulse
    │   ├── log
    │   │   └── run
    │   └── run
    └── wireplumber
        ├── log
        │   └── run
        └── run

16 directories, 10 files
```

## Starting the Services

To start the supervisor and the services, run the following command:

```bash
runsvdir ~/.local/share/runit/service
```

This command can be added to the **autostart** of your desktop environment or window manager.

## Managing Services

You’ll probably run into this if you try to manage services the usual way:

```
-> sv status pipewire
fail: pipewire: can't change to service directory: No such file or directory
```

This happens because `sv` looks in the system’s default paths.
So you need to specify the full path:

```bash
sv status ~/.local/share/runit/service/pipewire
```

You can also use a script like the one in my [Codeberg repository](https://codeberg.org/ItsZariep/zariep-runit-usersv/src/branch/main/usv), which works the same as `sv`, but is called `usv`:

```bash
-> usv status pipewire
run: /home/itszariep/.local/share/runit/service/pipewire: (pid 1403) 2124s; run: log: (pid 1402) 2124s
```

## Turnstile

[Turnstile](https://github.com/chimera-linux/turnstile/) allows us to have user services in a similar way, although it requires additional configuration. It can be useful if your services need access to the graphical session, for example.

Personally, I haven’t used Turnstile, but the Void Linux guide can be a good starting point for those who are interested.

