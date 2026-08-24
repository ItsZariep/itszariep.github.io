---
layout: post
title: "Remapping keys in Linux (keyd)"
date: 2024-06-17
categories: [Linux, Tutorial]
---

## What is keyd?

`keyd` is a daemon that captures keyboard input from udev and sends back an alternative mapping configured by the user. Besides `keyd`, there is also `xmodmap`, but the latter only works on X.org, whereas `keyd` works on X.org, Wayland, and even the TTY, it is universal.

## How to install and use keyd?

According to [Repology](https://repology.org/project/keyd/versions), `keyd` is in the repositories of several popular distributions. If it’s not there, you can follow the instructions on its [GitHub page](https://github.com/rvaiya/keyd).

---

Once you have it installed, you can enable and start the systemd service:
```
sudo systemctl enable keyd && sudo systemctl start keyd
```
If you don't want to or don't use systemd, you can start it manually, but it must be run as root; therefore, it is recommended to set it up as an init service.

Finally, all that's left is to configure it. To do this, open the file `/etc/keyd/default.conf`:

```ini
[ids]
*
[main]

# Use Right Ctrl as Enter
rightcontrol = enter
# Caps Lock is k
capslock = k
```

The syntax is simple: in the first section ([`ids`]), you put the ID of the keyboard you want to use. Usually, only one keyboard is used, so in that case, you use an asterisk (I'll explain how to specify a keyboard further down).

Then, under [main], you follow the syntax `input_key = output_key`. As seen in the example code, you can add many entries as long as they are declared on different lines.

If you want to add comments to the configuration, you can use a hash symbol (#).

---

If we want to find out the name of a key, we can use the `keyd monitor` command to find its exact name. In addition to keyboards, keyd also detects other devices like mice.

```c
ItsZariep@PC~-> keyd monitor
device added: 0603:00f5 SINO WEALTH Mechanical Keyboard (/dev/input/event6)
device added: 0603:00f5 SINO WEALTH Mechanical Keyboard Consumer Control (/dev/input/event5)
device added: 0603:00f5 SINO WEALTH Mechanical Keyboard (/dev/input/event3)
device added: 30fa:0400 USB Optical Mouse  (/dev/input/event2)
SINO WEALTH Mechanical Keyboard 0603:00f5       m up
SINO WEALTH Mechanical Keyboard 0603:00f5       leftcontrol up
SINO WEALTH Mechanical Keyboard 0603:00f5       rightshift down
SINO WEALTH Mechanical Keyboard 0603:00f5       rightshift up
SINO WEALTH Mechanical Keyboard 0603:00f5       tab down
SINO WEALTH Mechanical Keyboard 0603:00f5       tab up
USB Optical Mouse       30fa:0400       leftmouse down
USB Optical Mouse       30fa:0400       leftmouse up
USB Optical Mouse       30fa:0400       rightmouse down
USB Optical Mouse       30fa:0400       rightmouse up
USB Optical Mouse       30fa:0400       mouse2 down
USB Optical Mouse       30fa:0400       mouse2 up
USB Optical Mouse       30fa:0400       mouse1 down
USB Optical Mouse       30fa:0400       mouse1 up
SINO WEALTH Mechanical Keyboard 0603:00f5       leftcontrol down
SINO WEALTH Mechanical Keyboard 0603:00f5       c down
```

If you really want to specify a particular keyboard, you can use the output from the `keyd monitor` command. In my case, it is `0603:00f5`. If I wanted the changes to apply only to that keyboard, I would use that ID. Note that you should try not to change the port where the keyboard is connected, as the ID might change.

## More options

keyd is very powerful and allows you to do things like `j+k = esc`. If you want to see the full potential of keyd, you can check [its GitHub page](https://github.com/rvaiya/keyd) or read its manual.