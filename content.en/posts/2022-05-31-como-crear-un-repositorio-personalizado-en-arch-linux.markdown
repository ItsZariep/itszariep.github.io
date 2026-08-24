---

layout: post
title: "How to Create a Custom Repository in Arch Linux"
date: 2022-05-31
categories: [Tutorial, Linux]
image: /img/thumb/pacmanrepo.jpg

---

Hey everyone, how are you? I hope you're doing well. In this post, I am going to show how to make an Arch Linux repository. More than just being useful for creating a custom repo, this post will help us understand how Arch repositories work under the hood.

## Procedure

### Preparation

The first thing to do is create a folder. Inside it, it's best to create a subfolder where all the `PKGBUILD` files will go. This isn't strictly necessary, but it allows for:

1. Better organization and easier package updates.
2. Showing how packages are built to the public, providing greater security to third parties, especially if the repository is shared.

Once you have that set up, the next step is to create some packages. In this example, I will compile:

* The `sakura` terminal emulator
* The `spacefm` file manager
* The `pico` text editor

There is no minimum number of packages required, but I'll start with two and then add the third to show how additions work.

At this point, the directory tree should look like this:

```
ItsZariep@PC~/duckverse-> tree
.
└── PKGBUILDS
    ├── pico
    │   └── PKGBUILD
    ├── sakura
    │   └── PKGBUILD
    └── spacefm
        └── PKGBUILD

4 directories, 3 files

```

---

### Creating a PKGBUILD

This process is quite widespread; you can look at example PKGBUILDs in the [`AUR`](https://www.google.com/search?q=) or read the [`PKGBUILD` documentation](https://wiki.archlinux.org/title/PKGBUILD).

---

### Configuring `makepkg` and Building the Package

To build the packages, go to the folder where the `PKGBUILD` is located and run:

```bash
makepkg

```

Before doing that, you might want to configure `makepkg`. To do so, copy the configuration file:

```bash
cp /etc/makepkg.conf ~/.makepkg.conf

```

Configure the following according to your needs:

* **`MAKEFLAGS`**: To compile faster using multiple threads.
```bash
MAKEFLAGS="-j8"  # If you have 8 threads

```


* **`PKGEXT`**: To change the package extension.
```bash
PKGEXT='.pkg.tar.zst'

```


* **`PACKAGER`**: To customize the packager's name.
```bash
PACKAGER="ItsZariep"

```



---

### Adding the Package to the Repository

Once you have your packages, place them in a folder named after the target architecture (for example, `x86_64`), then run inside that folder:

```bash
repo-add name.db.tar.gz *.pkg.tar.zst

```

> **Note:** Change the extension if you used a different one. I recommend saving this command in a script to make future updates easier.

The directory tree should now look like this:

```
ItsZariep@PC~/duckverse-> tree
.
├── pkgbuilds
│   ├── sakura
│   │   └── PKGBUILD
│   ├── pico
│   │   └── PKGBUILD
│   └── spacefm
│       └── PKGBUILD
└── x86_64
    ├── db
    ├── duckverse.db -> duckverse.db.tar.gz
    ├── duckverse.db.tar.gz
    ├── duckverse.files -> duckverse.files.tar.gz
    ├── duckverse.files.tar.gz
    └── sakura-3.8.7-1-x86_64.pkg.tar.zst

5 directories, 9 files

```

> **Note:** `db` is the name of the script where the `repo-add` command was saved.

---

### Adding the Repository to Pacman

Edit `/etc/pacman.conf` and add:

```ini
[duckverse]
SigLevel = Never
Server = file:///home/itszariep/.local/share/duckverse/$arch

```

If you uploaded your repository to GitHub (and enabled GitHub Pages), you can also use it remotely:

```ini
[duckverse]
SigLevel = Never
Server = https://itzselenux.github.io/$repo/$arch

```

---

### Adding or Updating Packages

To add more packages to the repo:

1. Create the new `.pkg.tar.zst` package as before.
2. Add it to the corresponding directory.
3. Update the database using `repo-add`.

To update a package:

1. Recompile it.
2. Replace the old file.
3. Run `repo-add` again.

---

## Conclusion

Creating a repository for `pacman` is relatively easy. However, if you plan to make something public and formal, be very careful with licenses, as many do not allow redistribution. Failing to respect them can lead to legal issues.

Other than that, as I mentioned, it doesn't take rocket science to create and update a repository, but it does take time to maintain it.

I also recommend using **GPG** keys to sign the files and provide greater security.