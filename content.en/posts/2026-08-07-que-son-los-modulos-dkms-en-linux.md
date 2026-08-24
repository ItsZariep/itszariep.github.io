---
layout: post
title: "What are DKMS Modules on Linux?"
date: 2026-08-07
categories: [Informational, Operating Systems]
tags: [linux]
---

Many distributions compile DKMS modules when updating, but what exactly are they?

## "Normal" Modules

To understand dynamic modules, we first need to look at a normal module.

These normal modules are compiled for a specific kernel version, which means that if for any reason you change or update the kernel, the module may stop working.

This happens because kernel modules depend on the version and configuration with which that kernel was compiled. Therefore, a module that works correctly on a given version may not be compatible with another. These modules are relatively common in point-release systems (such as Debian, Ubuntu, or Fedora).

## Dynamic Modules

Now, dynamic kernel modules, instead of storing only the already compiled module, store their source code and the necessary information to recompile it, usually under `/usr/src`.

After this, you must compile it for the kernel you are going to use, either by running the `dkms` command manually or through a package manager hook, which is what usually happens. This way, the same source code can be used to generate a module compatible with different kernel versions.

Therefore, when a kernel is installed or updated, DKMS detects the modules it has registered and checks if a compiled version already exists for that kernel:

* If it does not exist, DKMS can compile the module using the headers corresponding to that kernel version. This is especially useful when you have multiple kernels installed, as it can maintain a compiled copy of the module for each of them.
* If a kernel is no longer installed, depending on how the system is configured and the packages involved, DKMS can also remove the builds associated with that kernel because they are no longer needed.

After the modules are recompiled for a specific kernel, DKMS installs them into that kernel's module tree, usually under `/lib/modules/<version>/updates/dkms`.

From there, the system can find and load these modules in the same way as other external kernel modules. It is important to clarify that DKMS does not turn these modules into official kernel modules: it simply automates their compilation and installation outside of the main kernel tree.

## Administration

Finally, to manage the modules manually, you can use the `dkms` command:

* `dkms status` to see which modules you have registered and for which kernels they are compiled.
* `dkms build` to manually compile a module for a specific kernel.
* `dkms install` to install a build into the corresponding module tree.
* `dkms remove` to remove registered modules or their builds.

> `dkms` has more functions; these are the basic ones. I recommend checking the `dkms(8)` man pages for more information.

## Practical Functionality

Thanks to DKMS, rolling-release systems like Arch Linux, AUR packages (usually firmware), or hardware that lacks support within the main kernel can keep working using DKMS modules.

This can include proprietary drivers, modules for specific or older hardware, or projects that need to stay up to date as the kernel changes (for example, `v4l2-loopback`).

A well-known example includes certain NVIDIA drivers or older hardware modules distributed outside the main kernel tree that NVIDIA no longer maintains (for example, pre-Pascal GPUs).

## Conclusion

In summary, DKMS is not really a different type of module: it is a system that maintains the source code of external modules and automates their recompilation for the kernel versions you have installed. Thus, when you update the kernel, you do not have to manually compile each module from scratch.