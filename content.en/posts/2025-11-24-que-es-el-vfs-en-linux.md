---
layout: post
title: "What is the VFS in Linux? (Storage Management)"
date: 2025-11-24
categories: [Informational]
tags: [linux]
image: /img/thumb/vfslinux.jpg
---  

Hello everyone! How are you? I hope you’re doing well. If you use Linux, or Unix-like systems in general, it is quite likely (and actually almost unavoidable) that you have used a file system. But how do these file systems communicate with the kernel? This is where the *Virtual File System* (VFS) comes in.

The VFS is one of the fundamental pillars of the **Linux kernel**. Its purpose is to provide a unified abstraction for manipulating files, regardless of the type of file system being used (such as ext4, ZFS, NFS, etc.). This layer allows applications and system calls to interact with files uniformly, without requiring knowledge of the physical or logical implementation details of the underlying storage systems.

Beyond being merely a compatibility layer, the VFS is more like a modular and extensible architecture, capable of integrating local and distributed file systems, pseudo-filesystems (such as `/proc` and `/sys`), and virtual devices. Its design also reflects the Unix philosophy: “everything is a file.”

In this article, I will try to explain in a simple way what the VFS is, how it works, and what it is used for in modern systems. Although the concept generally applies to almost any Unix-like system, I will focus on Linux since it is the system I know best. So, without further ado, let’s begin.

## Conceptual Foundations of the VFS

The VFS defines an abstract interface that must be implemented by every file system that wants to integrate with the kernel. This interface consists of data structures and standard operations that encapsulate the behavior of files, directories, nodes, and superblocks.

The VFS model revolves around four key structures:

1. `super_block`

   Represents a mounted instance of a file system. It contains global metadata (such as block size, mount state, and pointers to file system operations) and serves as the root of the internal hierarchy.

2. `inode`

   This is the in-memory representation of a file or directory. Each *inode* contains information about permissions, ownership, size, timestamps, and pointers to the associated operations (`inode_operations`), but it does not contain the file's name (the name is associated with the directory that references it).

3. `dentry` (directory entry)

   This is the structure the kernel uses to keep track of the relationship between a file name and its inode. The **dentry cache** maintains these relationships between names and *inodes*. This intermediate layer allows paths to be resolved efficiently and provides caching that improves performance by avoiding repeated lookups on disk.

4. `file`

   Represents an open instance of a file, associated with a file descriptor in user space. It contains pointers to the operations that can be performed on the file (`file_operations`) and keeps track of the current position (**file offset**).

These structures interact to provide a consistent and efficient interface. When a process executes, for example, `open()`, the VFS coordinates path resolution (using dentries), obtains the corresponding *inode*, creates a `file` structure, and associates the appropriate operations from the underlying file system.

## Architecture and Operation Flow

The general flow of an operation through the VFS can be summarized in the following steps:

1. **System call:**

   An application invokes a standard function such as `open()`, `read()`, `write()`, or `close()`.

   These functions are translated into system calls (*syscalls*) and directed to the kernel's VFS layer.

2. **Name resolution and inode lookup:**

   The VFS analyzes the path (*path lookup*) using the dentry cache. If the *dentry* is not cached, the underlying file system is queried.

3. **Creation of the `file` structure:**

   The VFS allocates a file descriptor for the process and associates the appropriate operations defined by the underlying file system.

4. **Delegation to the actual file system:**

   Once the *inode* has been identified, read and write operations are delegated to the specific functions of that file system (for example, ext4, tmpfs, or NFS).

   This delegation occurs through operation tables such as `inode_operations`, `file_operations`, and `super_operations`.

5. **Caching and consistency:**

   The VFS maintains several caches (page cache, dentry cache, inode cache) to minimize disk access and coordinates data consistency through the memory subsystem and *writeback* mechanisms.

## The Mounting Abstraction

The VFS also manages the **mount hierarchy**. Each mount point is represented through a structure called `vfsmount`, which associates a *super_block* with a location within the global directory tree. In this way, the VFS builds a **unified view of the system's namespace**, where different file systems can coexist transparently.

For example, the root directory (`/`) may reside on an `ext4` file system, while `/home` may be an NFS volume and `/proc` may be a virtual file system generated in memory. The VFS is responsible for maintaining consistent operations across these heterogeneous namespaces.

## Extensibility Mechanisms

The modular architecture of the VFS makes it possible to add new file systems without modifying existing kernel code. A developer can implement the appropriate operation structures and register the file system through the kernel interface (`register_filesystem()`), defining how it will be mounted and which operations it supports.

The VFS therefore serves as the foundation for higher-level layers such as:

* **Stackable file systems** (e.g., eCryptfs and OverlayFS): allow one file system to be mounted on top of another.

* **Pseudo-filesystems**: such as `/proc` (an interface to processes and the kernel), `/sys` (sysfs), and `/dev` (device-related filesystem infrastructure), which expose kernel information and devices in the form of files.

* **Redirfs** and **FUSE (Filesystem in Userspace)**: allow file systems to be implemented in user space while still integrating with the VFS.

## Performance and Design Considerations

The VFS design combines efficiency and flexibility through three key strategies:

1. **Hierarchical caches:**

   The *dentry cache* and *inode cache* significantly reduce the cost of accessing storage.

2. **Logical decoupling:**

   Separating structures such as `inode`, `file`, and `superblock` makes it easier to maintain independent state for multiple processes.

3. **Interaction with the memory subsystem:**

   The VFS works together with the memory-management layer and the page cache to unify file data storage with virtual memory pages, avoiding unnecessary duplication.

## Conclusion

The Virtual File System (VFS) is one of the most sophisticated components of the Linux kernel. Its modular design and ability to abstract the diversity of file systems make it a central component of the Linux and Unix model.

It acts as a mediator between the high-level semantics of file operations and the specific implementations of each storage system, ensuring uniformity, extensibility, and performance.

More broadly, the VFS is not merely a technical mechanism, but an architecture that prioritizes transparency, interoperability, and modularity principles that have allowed it to adapt from embedded systems to supercomputers and globally distributed systems.
