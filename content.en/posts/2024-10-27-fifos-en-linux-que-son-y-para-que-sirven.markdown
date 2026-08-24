---
layout: post
title: "FIFOs in Unix-like Systems: What are they and what are they used for?"
date: 2024-10-27
categories: [Informational, Linux]
tags: [linux, fifo, programming]
---

Hello everyone! How are you doing? I hope you are well. In Unix-like operating systems, Inter-Process Communication (or IPC) management is essential for the efficient execution of programs. One of the oldest and most widely used mechanisms in this context is **FIFOs** or "First In, First Out". Sometimes also known as *named pipes*, FIFOs allow independently running processes to exchange information in an organized and efficient manner.

On this occasion, I will explain what FIFOs are, how they work in a Unix-like environment, and what they are used for. So, without further ado, let's get started.

## Definition of a FIFO

A FIFO (First In, First Out) is a type of IPC mechanism that follows a queue policy: the first data that enters is the first data that leaves. The simplest analogy would be a line of people waiting to be served; the first person to enter the line is the first one to leave it. In Unix-like systems, FIFOs are a special type of file that acts as a communication channel between processes.

A **FIFO** can be viewed as an extension of traditional pipes, but with one key difference: while anonymous pipes only work between processes with a direct parent-child relationship (i.e., related processes like a parent and a child), FIFOs have a name in the file system, allowing them to be used by completely independent processes. This feature makes FIFOs more flexible than standard pipes.

## Creating a FIFO in Unix-Like Systems

To create a FIFO in a Unix-like system, the **`mkfifo`** command or the **`mknod`** function in C is used. The `mkfifo` command assigns a name to this special type of file, which can then be opened for both writing and reading by different processes.

For example, in a terminal, you could use the command `mkfifo myfifo` to create a FIFO or special file named "myfifo" in the current folder. Any process that needs to send data would open it for writing, while processes wanting to receive that data would open it for reading.

## How It Works

Once a FIFO has been created, the communication process follows a very simple pattern:

1. One process opens the FIFO for writing and places data into it.
2. Another process opens the FIFO for reading and extracts that data.

The most interesting aspect of FIFOs is that they behave synchronously. This means that if a process tries to read from the FIFO when no data is available, the process will wait until data becomes available. Similarly, if a process writes to the FIFO but no process is waiting to read the data, the writing process will block until someone reads the data.

This synchronous nature has the effect of synchronizing the processes, which is useful for situations where data exchange must be coordinated, such as in communication between a data producer and a consumer. To clarify, at no point is the data written to the disk; instead, for convenience, it is written to RAM.

### Example of Usage

A classic example of FIFO usage is communication between a process that generates data (a producer) and another that consumes that data (a consumer). Consider the following scenario:

1. The producer process opens the FIFO for writing.
2. The consumer process opens the FIFO for reading.
3. The producer writes data to the FIFO, and the consumer receives it in the order it was written.

For example, in a terminal, you could run the command `'echo "Test message" > myfifo'`, which writes data to the FIFO. Then, in another terminal, even if it is a different session, as long as it can read it: using `cat < my_fifo` will read the content without writing anything to the file system.

Thus, one process can write to the FIFO, and another process running in a completely different terminal or even at a different time can read the data written by the first process.

## What Are FIFOs Used For?

### Communication Between Independent Processes

The most common use of FIFOs is for **communication between independent processes**. Unlike traditional pipes, which require processes to be related, FIFOs allow two processes with no family relationship to share information. This is extremely useful in system environments where different processes or services need to coordinate with one another.

### Stream Data Management

Another utility of FIFOs is in managing data streams. FIFOs ensure that data is processed in the order it is generated, which is essential in applications where data order matters, such as logging systems, network data transmission, or multimedia stream processing.

### Process Decoupling

FIFOs allow a certain degree of **decoupling** between processes. Because data is transmitted through the file system, the producer and consumer do not need to run at the same time. The producer can write data to the FIFO, and the consumer can read that data at a later time. This feature is very useful in systems where resource availability is unpredictable, such as in distributed systems.

### Support for Concurrent Programming

In concurrent programming (dedicated to parallelism and synchronization) FIFOs are also used to handle process synchronization. As mentioned earlier, the blocking nature of FIFOs causes processes to wait until data is available, which can serve as a simple coordination mechanism between processes executing parallel tasks.

## Advantages and Disadvantages of FIFOs

### Advantages

* **Simplicity**: FIFOs are easy to implement and use compared to other IPC mechanisms like sockets or shared memory.
* **Implicit Synchronization**: FIFOs provide natural synchronization, simplifying the development of applications requiring inter-process communication.
* **Decoupling**: Processes do not need to be related or executed at the same time.

### Disadvantages

* **Blocking**: If not handled properly, the blocking behavior can cause processes to get "stuck" waiting for data or space in the FIFO.
* **Limited Storage**: FIFOs have a limited buffer size, meaning that if the producer generates data faster than the consumer can read it, a bottleneck can occur.
* **Local Communication Only**: Unlike other mechanisms like sockets, FIFOs are restricted to the local system and do not allow network communication.

## Conclusion

FIFOs in Unix-like systems are a valuable tool for inter-process communication, especially in situations where processes are unrelated and need to exchange data in an organized, synchronous manner.

Their simplicity and seamless integration with the file system make them accessible and effective for diverse applications, from concurrent programming to data stream management. However, their use entails certain limitations, such as blocking and dependence on buffer capacity—that must be properly managed by developers. Despite this, FIFOs remain one of the most widely used forms of IPC in Unix-like environments due to their efficiency and ease of use.