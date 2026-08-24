---
layout: post
title: "Setting Power Modes at Boot on Intel and AMD GPUs (Linux)"
date: 2025-08-12
categories: [Tutorial, linux]
---

## Why?

This is useful for those who want to avoid relying on graphical tools like **`CoreCtrl`** and prefer an automatic configuration from boot.

## Requirements

### Hardware

- AMD: GCN or newer GPU (driver `amdgpu`).
  Any model released since 2012.
- Intel: Gen6 or newer GPU (driver `i915`).
  Any model released since 2012.

### System

- Linux with `udev` support.
- Root access.

## Basic Configuration
### Performance Levels

### AMD

Edit or create the file `/etc/udev/rules.d/amdgpu.rules` with the following content:

```c
ACTION=="add", SUBSYSTEM=="drm", DRIVERS=="amdgpu", ATTR{device/power_dpm_force_performance_level}="low"
```

Possible values for `power_dpm_force_performance_level`:

- `auto` : GPU adjusts dynamically (default value).
- `low` : minimum power consumption.
- `high` : maximum performance.
- `manual` : user defines specific frequencies.

## Advanced Configuration

### Granular Frequency Control

### `pp_*` Files

In `/sys/class/drm/cardX/device/` you will find parameters to adjust SCLK, MCLK, and power profiles.

Key files:

- `pp_dpm_sclk` : core frequencies.
- `pp_dpm_mclk` : memory frequencies.
- `pp_power_profile_mode` : predefined profiles.
- `pp_od_clk_voltage` : manual overclock/undervolt.
- `pp_od_support` : indicates if OverDrive is supported.

Example udev rule:

```c
ACTION=="add", SUBSYSTEM=="drm", DRIVERS=="amdgpu", \
ATTR{device/power_dpm_force_performance_level}="manual", \
ATTR{device/pp_dpm_sclk}="7", ATTR{device/pp_dpm_mclk}="2"
```

#### Notes

- The numbers (`7`, `2`, etc.) are DPM states visible with:

    ```bash
    cat /sys/class/drm/card0/device/pp_dpm_sclk
    ```
- Use `manual` so frequencies remain fixed.

## Intel

### `gt_*_freq_mhz` Files

On Intel, in `/sys/class/drm/card0/`, you can set minimum, maximum, and boost frequencies (the latter on newer GPUs).

Example udev rule in `/etc/udev/rules.d/i915.rules`:

```c
ACTION=="add", SUBSYSTEM=="drm", DRIVERS=="i915", \
ATTR{gt_min_freq_mhz}="300", ATTR{gt_max_freq_mhz}="1100", ATTR{gt_boost_freq_mhz}="1100"
```

#### Notes:

- Values are in MHz and depend on the model.
- Check current frequencies:

```
cat /sys/class/drm/card0/gt_*_freq_mhz
```

## Apply Changes Without Rebooting

After modifying or creating rules, run the following commands:

```
sudo udevadm control --reload-rules
```

```
sudo udevadm trigger
```

## Important Considerations

- Setting high frequencies increases power consumption and temperature.
- On laptops, it can drastically reduce battery life.
- Some configurations require special parameters when loading `amdgpu` or `i915`.
- If instability occurs, it is recommended to revert to default values (`auto`).
