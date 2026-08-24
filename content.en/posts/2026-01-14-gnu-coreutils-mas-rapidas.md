---
layout: post
title: "Is GNU yes faster than BusyBox yes?"
date: 2026-01-14
categories: [Experiments, Programming]
tags: []
---

Hello everyone! How are you? I hope you're doing well. The other day I was looking into the behavior of Linux commands, which led me to notice that `yes` in GNU is faster than in other implementations, such as `BusyBox` or `BSD`.

## What is `yes`?

The `yes` command is an extremely simple utility: it repeatedly prints a string (by default `y`) until the process is interrupted or the output fails. Despite its functional simplicity and its reduced use due to the evolution of terminal programs, there are implementations with very different philosophies, such as those of `GNU coreutils` and `BusyBox`.

On this occasion, I will conduct a practical experiment to compare both implementations, analyzing the results obtained and concluding whether the complexity of GNU `yes` is justified for real-world use.

## Experiment Description

Two types of tests were performed:

### Raw Performance Test (without a terminal)

```sh
/bin/yes | pv > /dev/null
busybox yes | pv > /dev/null
```

> `/bin/yes` is the GNU implementation, while `busybox yes` is the BusyBox implementation.

This test measures how much data each implementation can generate when the output is not limited by a slow device (such as a terminal), but instead by a pipe and the kernel.

### Practical Test (terminal output)

```sh
(sleep 10 && pkill /bin/yes) & /bin/yes
(sleep 10 && pkill busybox) & busybox yes
```

In this test, both commands write directly to the terminal for 10 seconds. The approximate number of lines generated is counted, and memory consumption is observed.

## Results

### Raw Performance

Terminal output:

```
ItsZariep@PC~-> /bin/yes | pv > /dev/null
37.7GiB 0:00:10 [3.96GiB/s] [<=>]
ItsZariep@PC~-> busybox yes | pv > /dev/null
991MiB 0:00:07 [99.0MiB/s] [<=>]
```

- **GNU `yes`**: several GiB/s (≈ 3-4 GiB/s)
- **BusyBox `yes`**: several MiB/s (≈ 100 MiB/s)

The difference is several orders of magnitude.

### Practical Terminal Test

- **GNU `yes`**: ~`50,120` lines in 10 seconds
- **BusyBox `yes`**: ~`49,994` lines in 10 seconds

> The lines were counted precisely thanks to `tmux`.

The difference is small and barely noticeable.

### RAM Usage

According to `htop`, `top`, and `btop`:

- BusyBox yes: `570 KiB` (0.5 MiB)
- GNU yes: `5900 KiB` (5 MiB)

> **GNU `yes`**: approximately 10× more memory than `BusyBox yes`.

## Technical Analysis

### Why GNU `yes` Is So Fast in Pipes

GNU `yes`:

According to [the GNU coreutils source code](https://cgit.git.savannah.gnu.org/cgit/coreutils.git/tree/src/yes.c), specifically:

```c
  /* If a larger buffer was allocated, fill it by repeating the buffer
     contents.  */

  size_t copysize = bufused;
  for (size_t copies = bufalloc / copysize; --copies;)
    {
      memcpy (buf + bufused, buf, copysize);
      bufused += copysize;
    }
```

- Builds a large buffer (tens of KiB) containing multiple repetitions of the output.
- Uses `write` directly.
- Dramatically reduces the number of system calls by buffering repetitions of "**y**".

This allows extremely efficient use of the kernel and memory bandwidth, at the cost of using more memory.

### Why BusyBox `yes` Is "Slower"

BusyBox `yes`:

According to [BusyBox's source code on GitHub](https://github.com/mirror/busybox/blob/master/coreutils/yes.c):

```c
	do {
		pp = argv;
		while (1) {
			fputs_stdout(*pp);
			if (!*++pp)
				break;
			putchar(' ');
		}
	} while (putchar('\n') != EOF);

```

- Uses `stdio` (`putchar`, `fputs`).
- Writes only a few bytes per iteration.
- Performs many high-level operations.

This introduces overhead in user space and limits maximum performance, despite using less memory.

### The Terminal as a Bottleneck

When the output goes to the terminal:

- Rendering
- Scrollback management
- Line discipline

limit the speed to a few thousand lines per second. In this scenario, none of GNU `yes`'s optimizations provide a significant advantage. (Using an accelerated terminal such as Kitty doesn't make much difference either; the tests used `Alacritty`, `foot`, and `qterminal`.)

## Is GNU `yes` Overengineered?

From a practical point of view:

- Most uses of `yes` are interactive or short-lived.
- The terminal dominates the overall cost.
- The higher memory usage provides no visible benefits.

From the GNU coreutils philosophy:

- `yes` should be as efficient as possible.
- It should never become the bottleneck.
- It should perform well even in synthetic or extreme benchmarks.

Both positions are consistent with their respective goals.

## Other Implementations

### [BSD](https://github.com/DiegoMagdaleno/BSDCoreUtils/blob/master/src/yes/yes.c)

```c
int
main(int argc, char *argv[])
{
	if (argc > 1)
		for (;;)
			puts(argv[1]);
	else
		for (;;)
			puts("y");
}

```

* It is simpler than BusyBox and has relatively similar performance.
* It uses `puts`, which, although it has an internal buffer on BSD, is slower and still results in more system calls.

### [UUtils](https://github.com/uutils/coreutils/blob/main/src/uu/yes/src/yes.rs)

```rust
fn prepare_buffer(buf: &mut Vec<u8>) {
    if buf.len() * 2 > BUF_SIZE {
        return;
    }

    assert!(!buf.is_empty());
    let line_len = buf.len();
    let target_size = line_len * (BUF_SIZE / line_len);
    while buf.len() < target_size {
        let to_copy = std::cmp::min(target_size - buf.len(), buf.len());
        debug_assert_eq!(to_copy % line_len, 0);
        buf.extend_from_within(..to_copy);
    }
}

```

- It is a fairly faithful port of the GNU implementation.
- Instead of printing `"y"` on every iteration, it prints 16 KB blocks in one go using `stdout.write_all(bytes)`.
- It should be even faster in synthetic benchmarks.

## Results

For everyday use, BusyBox `yes` is sufficient, simpler, and more memory-efficient.

GNU `yes`, although clearly overengineered for the typical use case, achieves its goal of maximizing performance in ideal scenarios, such as fast pipes or stress tests.

The experiment demonstrates that a "better" implementation depends on the context: maximum theoretical performance versus simplicity and suitability for the real world.

## Conclusion

For `yes` in real-world scenarios, the GNU implementation could be considered excessive.

But that complexity is not a mistake; rather, it is a direct consequence of a different design philosophy.