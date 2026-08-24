---
layout: post
title: "The History and Differences Between FreeBSD, OpenBSD, and NetBSD"
date: 2023-06-08
categories: [Informational, "Operating Systems"]
image: /img/thumb/bsd.jpg
---

Hello everyone! How are you all doing? I hope you are well. If you have researched operating systems a bit, you probably know about BSD, which was a system from the University of California, Berkeley. However, when software maintenance was discontinued, three variants of it were created: FreeBSD, NetBSD, and OpenBSD, each destined for different uses. In this video, I am going to explain the differences between them, their common uses, and a bit of their history, so without further ado, let's begin.

## History

In the early years of the Unix system, its creators—AT&T's Bell Labs—authorized the University of California at Berkeley and other universities to use the source code and adapt it to their needs. During the 1970s and 1980s, Berkeley used the system for its operating system research.

When AT&T revoked the university's usage permit for commercial reasons, the university promoted the creation of a version inspired by the Unix system using the contributions they had made. This allowed for distribution for academic purposes, and after some time, restrictions regarding copying, distribution, or modification were minimized, thus giving birth to BSD.

The initial version, called `1BSD`, was released in 1978, followed by `2BSD` and `3BSD` in subsequent years. In 1983, `4BSD` was released, a major version that introduced the Fast File System (FFS) as well as the TCP/IP networking stack. These improvements were fundamental to the development of the Internet and laid the groundwork for BSD's future popularity.

In the mid-1980s, the BSD development team at UC Berkeley, led by Bill Joy, began working on version `4.3BSD`, which is considered one of the most influential versions of BSD. `4.3BSD` included many improvements and new features, such as local area network (LAN) support, improvements in operating system performance and stability, and a more user-friendly interface.

In 1991, `386BSD` was released—a version of BSD specifically adapted to run on the x86 processor architecture. This version paved the way for the development of FreeBSD, as it was used as the foundation for its creation.

These early versions of BSD added many improvements and new features to the original UNIX operating system. However, the university stopped focusing on BSD to concentrate on other things. But because BSD was so beloved, several variants emerged—such as FreeBSD, NetBSD, and OpenBSD—which remain the most popular variants today.

As an interesting side note, macOS is also partially based on BSD. To explain: the core of macOS is based on "Darwin," which in turn is based on "Mach" and uses many software components from BSD. Therefore, macOS and BSD share certain characteristics and functionalities thanks to the BSD software components incorporated into Darwin and, by extension, macOS. I won't emphasize this too much since we all already know macOS, so now let's dive into the three most popular BSD systems.

## FreeBSD

Starting with FreeBSD: In 1993, a group of developers led by Jordan Hubbard, Nate Williams, and Rod Grimes released FreeBSD 1.0. This version was a derivation of 386BSD 0.1 and was based on UC Berkeley's `4.3BSD Net/2` release.

FreeBSD 1.0 offered a complete, stable, and high-performance operating system for the x86 platform. Over the following years, FreeBSD continued to evolve and improved in many aspects, including packaging, hardware support, security, network performance, and virtualization.

New features were added, stability and performance were enhanced, and support for various hardware architectures—such as Alpha, SPARC, and PowerPC, among others—was introduced.

FreeBSD is characterized by its focus on stability, performance, and scalability. It is primarily designed to be used in server environments and has earned an excellent reputation for robustness and reliability.

FreeBSD has placed a strong emphasis on optimizing operating system performance, especially in areas such as memory management, the networking subsystem, and the file system. Another feature that sets it apart is that it is also the most familiar to the average user—comparatively speaking among the BSDs, of course—though there are FreeBSD-based variants specifically tailored for ease of use.

Today, FreeBSD is widely used across a variety of applications, ranging from web and database servers to embedded devices, appliances, and routers. In fact, if you use a Sony system like a PlayStation 3 or later, or a Nintendo Switch, you are using a customized version of FreeBSD.

It has also served as the foundation for other operating systems, such as Apple's macOS, which, as I mentioned earlier, is partially based on FreeBSD.

## OpenBSD

Secondly, we have OpenBSD, a system based on the `4.4BSD-Lite` branch. It was created in 1995 by Theo de Raadt and a group of developers with the goal of providing a secure, free, and high-performance operating system.

Over the years, OpenBSD has maintained its focus on security and code correctness, becoming a popular choice for those who value security in their infrastructure.

Since its initial release, OpenBSD has been widely recognized for its focus on source code auditing and the implementation of advanced security measures. OpenBSD developers dedicate themselves to eliminating bugs, vulnerabilities, and weaknesses from the operating system, and they have built a reputation for reliability and robustness in the process.

This dedication to security is reflected in features such as packet encryption systems, strict access control, and default security policies that minimize the chances of successful attacks.

OpenBSD has also made significant contributions to the world of computer security by creating tools like OpenSSH, which is widely used to establish secure, encrypted network connections. Additionally, OpenBSD developed and promoted technologies like PF (Packet Filter), a powerful firewall, and CARP (Common Address Redundancy Protocol), an IP address redundancy protocol.

These tools and technologies have become standards in the security community and have been integrated into other operating systems. Although security is its primary focus, OpenBSD also cares about usability and portability. The operating system strives to provide a consistent and friendly user experience, offering straightforward installation and intuitive configuration.

Furthermore, OpenBSD has been ported to several hardware architectures, making it versatile and suitable for different environments. However, what characterizes it most is its strong focus on security, which is visible primarily in the implementation of the kernel and several of its programs.

## NetBSD

Thirdly and finally, we have NetBSD. It originated as a fork of 386BSD in 1993, initially created by Chris Demetriou, [Theo de Raadt](https://en.wikipedia.org/wiki/Theo_de_Raadt), Adam Glass, and Charles Hannum. From its inception, NetBSD has followed a distinct approach by emphasizing portability and the ability to run on a wide range of hardware architectures. This flexibility has made it one of the most versatile and widely ported operating systems, allowing it to run even on very low-power hardware, such as a Sega Dreamcast, for example.

NetBSD's core philosophy is "Write Once, Run Anywhere." NetBSD developers have dedicated significant effort to ensuring that the operating system can run across multiple platforms without the need for extensive modifications.

This is achieved by creating and maintaining a hardware abstraction layer that allows the NetBSD kernel to run on different architectures, including x86, ARM, MIPS, PowerPC, SPARC, and many more.

NetBSD's portability also extends to its wide range of compatible devices. In addition to desktop computers and servers, NetBSD is well-known for its support on embedded devices, such as routers, switches, storage devices, and microcontrollers. This ability to adapt to different environments and hardware requirements has allowed NetBSD to be used in a wide variety of applications.

In addition to its focus on portability, NetBSD has maintained a focus on code correctness and simplicity. The NetBSD development team has worked hard to write clean, readable, and well-structured code, making the operating system easy to understand, maintain, and improve in the future.

Stability and reliability are also standout features of NetBSD, making it a popular choice for those looking for a robust, low-maintenance operating system.

## Compatibility

As you can see, these three systems share several things while each maintaining its own focus. Now, one interesting aspect is their software compatibility. Aside from naturally running open-source software, they remain Unix-like systems—much like Linux—and therefore share very similar kernel instructions. This gives rise to something called binary emulation.

Binary emulation involves translating kernel system calls that differ so that the kernel can understand them. As mentioned, being Unix-like, many functions are identical and do not differ significantly. However, it is a translation of calls rather than instructions, meaning it will only work between matching architectures. NetBSD has a dedicated article on this that might be interesting to some.

Similarly, many things differ among the BSDs, and documentation can vary, but all three provide solutions to run Linux software in particular—which is of greatest interest since Linux has the largest catalog among Unix-likes—using features like `compat_linux`. That said, FreeBSD handles compatibility out-of-the-box the easiest. Regardless, as always, reading the documentation is recommended.

A second, slightly heavier option is to use Wine, which is also available for all three systems, but as I said, it is quite heavy, and Linux compatibility layers tend to be faster.

## Conclusion

These three systems are excellent solutions for the scenarios they were designed for. Even if ordinary home users might not care about them for various reasons, they certainly have a decent community and are quite useful in their respective contexts.

To summarize and review:

- **FreeBSD** focuses on stability and performance.
- **OpenBSD** focuses on being highly secure and stable.
- **NetBSD** focuses on being as portable as possible.

These distinctive features make them attractive options for different needs and requirements.