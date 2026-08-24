---
layout: post
title: "Why Linux has TWO random number generators?"
date: 2026-08-05
categories: [Informational, Operating Systems]
tags: [linux]
image: /img/thumb/devrandom.jpg
---

In Linux, there are two files that generate random numbers, and using the wrong one could break your security.

## What are they?

`/dev/random` and `/dev/urandom` are kernel interfaces used to generate random bytes for cryptography: SSH keys, certificates, tokens, etc.

## Differences

The difference stems from ***entropy***: the real physical noise that the system collects, such as mouse movements or disk timing.

`/dev/random`, in its classic design, **would block**, meaning it would make you wait if it thought it ran out of sufficient "fresh" entropy.

`/dev/urandom` **never blocks**: it uses a pseudorandom number generator (*`CSPRNG`*) seeded with that entropy, and keeps producing bytes endlessly.

## Current Utility

Today, in modern Linux (starting from [Linux `5.6`](https://kernelnewbies.org/Linux_5.6)), that distinction doesn't really matter anymore. Once the *`CSPRNG`* has enough initial entropy (typically at system startup) it remains cryptographically secure forever.

However, the standard recommendation, even from the kernel developers themselves, is to **use `/dev/urandom**`, or better yet, if working with C, the `getrandom()` syscall.

## Conclusion

`/dev/random` could hang waiting for entropy without any real need. `/dev/urandom` is fast, secure, and is what underlying libraries like OpenSSL use.