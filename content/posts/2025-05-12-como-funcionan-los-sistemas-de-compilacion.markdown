---
layout: post
title: "¿Cómo funcionan los sistemas de compilación?"
date: 2025-05-12
categories: [Informativo, Programación]
tags: [make, cmake, ninja, meson]
image: /img/thumb/buildsystem.jpg
---

Hola gente, ¿cómo están? Espero que estén bien.  
Si alguna vez   han compilado un programa, ya sea propio o de otra persona, lo más probable es que hayan usado herramientas como **GNU Make**, **CMake**o **Meson** Estos son **sistemas de construcción** o **build systems**.  
Básicamente, estos programas nos ayudan a los programadores a organizar el código, manejar distintos tipos de compilaciones, gestionar dependencias, entre otras cosas.

En esta ocasión, explicaré **cómo funcionan este tipo de programas internamente**.  
Así que sin más que decir, ¡comencemos!

---

## ¿Por qué necesitamos un sistema de construcción?

Básicamente, para **tener orden y facilitar la compilación** de nuestros programas.  
Sin un sistema de construcción, tendríamos que usar scripts complicados (y poco portables) o, peor aún, ejecutar manualmente todos los comandos uno por uno.  
Además, estos métodos "manuales" no permiten:

- Manejo avanzado de dependencias.
- Recompilaciones inteligentes.
- Paralelismo en la construcción.

En cambio, con un sistema de construcción, normalmente basta con **uno o dos comandos** para compilar todo el proyecto correctamente.

---

## Componentes principales

Un sistema de construcción típico se compone de varios **componentes clave**:

### 1. Analizador o Parser

Este componente lee el archivo o "receta" de compilación (por ejemplo, `Makefile`, `CMakeLists.txt`, `meson.build`).  
El parser convierte esas instrucciones en una estructura de datos interna.

### 2. Gráfico de Dependencias (DAG)

Es un **grafo dirigido acíclico** (Directed Acyclic Graph, DAG) que tiene:

- **Nodos (Nodes):** representan archivos como `.c`, `.h`, `.o`, ejecutables, etc.
- **Aristas (Edges):** representan relaciones de dependencia entre archivos.

Este componente organiza y gestiona las dependencias, asegurándose de que **no existan ciclos**.

### 3. Scheduler

Determina el **orden de compilación** mediante un **ordenamiento topológico**.  
Si el sistema lo permite, también gestiona **paralelismo**, permitiendo compilar múltiples archivos al mismo tiempo.

### 4. Ejecutador

Se encarga de **crear procesos** (por ejemplo, usando `fork`/`exec` en Unix-like) para ejecutar programas externos (compiladores, enlazadores, scripts).  
Controla:

- Ejecución de comandos.
- Manejo de errores (por ejemplo, si el compilador falla).
- Control de trabajos.

---

## Estructuras de datos internas

En C, podríamos definir las siguientes estructuras:

```c
typedef struct FileNode
{
    char *filename;
    time_t mtime;
    struct FileNode **dependencies;
    size_t dep_count;
    int visited;
} FileNode;
```

- `mtime`: fecha de última modificación (`stat()`).
- `dependencies`: arreglo dinámico de dependencias.
- `visited`: para evitar visitar dos veces en el recorrido DFS.

Y para manejar el grafo:

```c
typedef struct BuildGraph
{
    FileNode **nodes;
    size_t node_count;
} BuildGraph;
```

---

## Algoritmos principales

### a) Creación del gráfico

Primero, se parsean las instrucciones de compilación y se construye el grafo de dependencias:

```c
BuildGraph *graph = create_graph();

// Agregar nodos
FileNode *main_c = create_node("main.c");
FileNode *utils_h = create_node("utils.h");
FileNode *main_o = create_node("main.o");
FileNode *utils_c = create_node("utils.c");
FileNode *utils_o = create_node("utils.o");
FileNode *app = create_node("app");

// Agregar dependencias
add_dependency(main_o, main_c);
add_dependency(main_o, utils_h);
add_dependency(utils_o, utils_c);
add_dependency(utils_o, utils_h);
add_dependency(app, main_o);
add_dependency(app, utils_o);
```

---

### b) Ordenamiento topológico (Depth First Search)

El DFS (Depth First Search) nos permite construir primero las dependencias antes que los nodos dependientes:

```c
void dfs(FileNode *node)
{
    if (node->visited)
    {
        return;
    }

    node->visited = 1;

    for (size_t i = 0; i < node->dep_count; ++i)
    {
        dfs(node->dependencies[i]);
    }

    printf("Build: %s\n", node->filename);
}
```

---

### c) Revisión de Timestamps (Rebuild Check)

Se usa `stat()` para obtener la fecha de modificación y verificar si hay que recompilar:

```c
#include <sys/stat.h>

time_t get_mtime(const char *filename)
{
    struct stat st;

    if (stat(filename, &st) != 0)
    {
        return 0;
    }

    return st.st_mtime;
}
```

Luego:

```c
int needs_rebuild(FileNode *target)
{
    time_t target_mtime = get_mtime(target->filename);

    for (size_t i = 0; i < target->dep_count; ++i)
    {
        time_t dep_mtime = get_mtime(target->dependencies[i]->filename);

        if (dep_mtime > target_mtime)
        {
            return 1;
        }
    }

    return 0;
}
```

---

### d) Ejecución de Comandos

Finalmente, ejecutamos comandos (por ejemplo, para compilar o enlazar):

```c
#include <unistd.h>
#include <sys/wait.h>

void run_command(const char *cmd)
{
    pid_t pid = fork();

    if (pid == 0)
    {
        // Hijo
        execl("/bin/sh", "sh", "-c", cmd, NULL);
        perror("execl failed");
        exit(1);
    }
    else if (pid > 0)
    {
        // Padre
        int status;
        waitpid(pid, &status, 0);
    }
    else
    {
        perror("fork failed");
        exit(1);
    }
}
```

---

## Resumen

1. Se analiza la receta y se crea el grafo de dependencias.
2. Se realiza el ordenamiento topológico para determinar el orden correcto.
3. Se revisan timestamps para evitar recompilar innecesariamente.
4. Se ejecutan los comandos necesarios (compilar, enlazar, etc.).

---

## Notas finales

Si quieren ver un ejemplo sencillo, en mi Codeberg dejé un sistema de construcción **mínimo**, más centrado en la parte **esencial** que en funcionalidades avanzadas.

Vale aclarar que herramientas como **CMake** y **Meson** son aún más complejas:  
- Tienen abstracción de toolchains.
- Soportan múltiples plataformas.
- Permiten compilación cruzada.

Además, **CMake** y **Meson** no compilan directamente, sino que **generan recetas** para backends como **GNU Make** o **Ninja**.  
En ese sentido, se comportan más como **analizadores** que como constructores directos.

Este artículo, en cambio, se enfoca más en herramientas como **GNU Make** o **Ninja**.

---

## Conclusión

Los sistemas de construcción son **indispensables** para manejar proyectos de software modernos.  
Su estructura basada en grafos permite optimizar al máximo el proceso de construcción.

¿Ustedes qué sistema de construcción usan? ¿Se atreverían a crear uno propio?, ¡Déjenme sus opiniones en los comentarios!

{{< youtube i9o6J0kJgAM >}}
