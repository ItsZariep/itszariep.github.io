---
layout: post
title: "¿Cómo funcionan los sistemas de archivos encriptados? (Luks)"
date: 2024-10-07
categories: Informativo Linux
tags: [linux, luks]
image: /assets/img/thumb/luks.jpg
---

¡Hola gente! ¿como están?, espero que estén bien, en está ocasión explicaré que son y como funcionan los sistemas de archivos encriptados.

Estos sistemas de encriptación permiten que la información almacenada en un dispositivo, como un disco duro o una unidad de estado sólido (SSD), sea ilegible a menos que se proporciona una clave o credencial adecuada.

En este vídeo especifico me centraré mas que nada en LUKS, que se suele usar en Linux, pero BitLocker de Windows funciona de manera similar. Asi que sin mas que decir, empecemos.

## Funcionamiento General de los Sistemas de Archivos Encriptados

Primero que nada, es importante entender que para proteger información en un disco, el metodo mas común es el uso de algoritmos criptográficos.

Esto implica que la información se transforma de manera que solo puede ser entendida si se conoce una clave de cifrado, entonces es como las semillas de Minecraft por ejemplo, si le damos la semilla, o en este caso la clave, especifica, podremos conseguir una combinación que nos da un resultado especifico deseado.

Existen dos principales enfoques para la encriptación de discos:

1. **Encriptación de Disco Completo (Full Disk Encryption - FDE):** Todo el disco, incluida la tabla de particiones y el sistema de archivos, se encripta. Solo cuando el usuario introduce la clave adecuada al iniciar el sistema, se puede descifrar el contenido. Una vez autenticado, el sistema de archivos es accesible como si no estuviera cifrado. 
2. **Encriptación a Nivel de Archivo:** En este enfoque, solo los archivos seleccionados o carpetas específicas se encriptan. Cada archivo se cifra de forma independiente.

### Proceso Básico de Cifrado

El proceso de encriptación sigue estos pasos fundamentales:

1. **Cifrado de Datos:** Se utiliza un algoritmo criptográfico, como AES (Advanced Encryption Standard), para transformar los datos en texto cifrado. Este algoritmo toma como entrada la información original y una clave secreta (password o keyfile). Sin la clave, los datos encriptados resultan ininteligibles.
 
2. **Clave Maestra (Master Key):** En lugar de cifrar todo el disco directamente con la clave proporcionada por el usuario, muchos sistemas utilizan una clave maestra que encripta los datos. La clave del usuario se utiliza para cifrar esta clave maestra, lo que permite que las claves de usuario puedan cambiar sin necesidad de volver a cifrar todo el contenido del disco.

3. **Gestión de Claves:** La gestión de claves es crucial para los sistemas de archivos encriptados. Un sistema seguro debe permitir almacenar y recuperar claves de manera eficiente, garantizar que estas se destruyan correctamente cuando sea necesario, y facilitar la actualización o revocación de las mismas.

4. **Autenticación:** Cuando el usuario intenta acceder al sistema de archivos encriptado, se le solicita la clave o contraseña. Esta clave descifra la clave maestra, que a su vez descifra los datos almacenados en el disco.

## LUKS

**LUKS** es uno de los estándares más comunes para la encriptación a nivel de disco completo en entornos Linux. LUKS se desarrolló para ofrecer una solución robusta que facilitara la gestión y el uso del cifrado en los discos duros. Uno de sus puntos más fuertes es la **interoperabilidad**, ya que el formato de disco de LUKS es estándar, lo que significa que las particiones encriptadas pueden ser accedidas en diferentes máquinas sin necesidad de configuraciones específicas adicionales.

### Características de LUKS

1. **Formato de Encriptación Estándar:** LUKS define un formato de disco estandarizado que puede ser reconocido por cualquier sistema compatible con LUKS. Esto lo hace portable y fácil de utilizar en diferentes dispositivos y sistemas operativos Linux.

2. **Gestión de Múltiples Claves:** LUKS permite asociar varias claves (hasta 8) con un solo volumen cifrado. Esto permite que diferentes usuarios puedan acceder al mismo sistema de archivos encriptado utilizando diferentes contraseñas. Cada clave es independiente y se puede revocar o cambiar sin afectar a las demás.

3. **Uso de Criptografía Fuerte:** LUKS utiliza algoritmos de cifrado robustos como AES para garantizar que los datos se mantengan seguros. Además, utiliza un enfoque jerárquico de cifrado, en el que una clave maestra encripta el disco, y las claves de usuario solo cifran la clave maestra.

4. **PBKDF2 (Password-Based Key Derivation Function 2):** LUKS emplea PBKDF2 para fortalecer la clave de usuario. Este algoritmo toma una contraseña y la convierte en una clave criptográficamente segura mediante la aplicación repetida de una función hash. Este proceso de iteración hace que los ataques de fuerza bruta sean mucho más difíciles de llevar a cabo.

### Proceso de Encriptación y Desencriptación en LUKS

El proceso de cifrado y descifrado en LUKS sigue un flujo ordenado:

1. **Creación del Volumen LUKS:** El usuario inicia el proceso de encriptación de un disco o una partición utilizando herramientas como `cryptsetup`. Durante esta etapa, el sistema genera una clave maestra, que será la encargada de cifrar los datos. Luego, se solicita al usuario que proporcione una contraseña o una clave para proteger la clave maestra.

2. **Almacenamiento de las Claves:** LUKS almacena la clave maestra en un área especial del encabezado LUKS, que es cifrado por la clave de usuario utilizando el algoritmo PBKDF2. Esto significa que cambiar la clave de usuario no requiere re-encriptar todo el disco, sino solo actualizar la forma en que la clave maestra está protegida.

3. **Desencriptación:** Al intentar montar el sistema de archivos, se solicita la clave de usuario. Si es correcta, se usa para descifrar la clave maestra. La clave maestra se utiliza entonces para desencriptar y permitir el acceso a los datos en el disco.

4. **Operaciones Cotidianas:** Una vez que el volumen ha sido desbloqueado, el sistema de archivos se comporta de manera completamente transparente. El sistema operativo cifra automáticamente los datos al escribirlos en el disco y los descifra al leerlos, sin intervención adicional del usuario.

## Mecanismos de seguridad
Seguramente a cualquiera se le ha ocurrido que por ejemplo, si se hace un ataque de fuerza bruta, basicamente ya tendría acceso a los datos, pero no es tan simple.

Especificamente LUKS, usa PBKDF2 (Password-Based Key Derivation Function 2):

este un algoritmo de derivación de claves utilizado para reforzar la seguridad de las contraseñas, convirtiendo una contraseña de usuario en una clave criptográfica segura.

PBKDF2 toma la contraseña del usuario y la transforma en una clave de longitud fija. Dado que las contraseñas pueden ser débiles (fáciles de adivinar), PBKDF2 ayuda a reforzarlas mediante un proceso de derivación de claves más complejo.

Para evitar ataques basados en diccionario o fuerza bruta precomputada (como ataques con "rainbow tables"), se hace uso de una sal aleatoria (salt), si, literalmente se llama sal. Esto asegura que incluso si dos usuarios tienen la misma contraseña, la clave derivada será diferente porque la sal será única en cada caso.

A parte de esto, PBKDF2 realiza muchas iteraciones del proceso de derivación de clave ( y con muchas me refiero miles o incluso cientos de miles de veces). Esto ralentiza significativamente el proceso de generación de la clave, lo que hace que los ataques de fuerza bruta sean mucho más difíciles y lentos.

Por ejemplo, si un atacante intenta probar millones de contraseñas posibles, cada una tendrá que pasar por miles de iteraciones de PBKDF2, lo que aumenta considerablemente el tiempo necesario para descifrar la contraseña.

Entonces, Gracias a sal y a las múltiples iteraciones, PBKDF2 reduce la efectividad de los ataques de fuerza bruta, haciéndolos más costosos en términos de tiempo y recursos computacionales.

## Pros y contras

El uso de un sistema de archivos encriptado como todo en la vida tiene pros y contras, basado en eso las personas podemos escoger entre si usarlo o no.

### Pros

- **Seguridad Fuerte:** Gracias al uso de algoritmos avanzados y la aplicación de prácticas criptográficas seguras, como el uso de una clave maestra y múltiples claves de usuario, existe una protección robusta contra ataques externos.

- **Eficiencia:** Si el sistema está bien implementado, el rendimiento es casi idéntico a un disco no cifrado. O sea que para el usuario prácticamente no habría diferencia.

## Contras

1. **Pérdida de Datos por Olvido de la Clave:** Si el usuario olvida todas las contraseñas asociadas a un volumen cifrado, no hay forma de recuperar los datos. Esto se debe a que el cifrado es irreversible sin las claves correctas, a menos que se use directamente fuerza bruta, pero es tardado.
 
2. **Ataques a la Memoria:** Mientras el sistema está en uso, la clave maestra suele estar almacenada temporalmente en la memoria RAM. Esto abre la posibilidad a ataques de acceso directo a la memoria, como el **ataque Cold Boot**, en el que un atacante extrae los datos de la RAM antes de que se borren al apagar el sistema, aquí es donde importa bastante la seguridad del kernel.

3. **Impacto en el Rendimiento:** Se que en Pros dije que los sistemas suelen ser eficientes, pero si se usa un dispositivo relativamente lento, se puede notar esta perdida.

4. **Fuerza bruta:** A pesar de que hay métodos de mitigación, es algo que siempre va a estar ahí, así que independientemente de cualquier cosa, con suficiente paciencia siempre está la posibilidad de acceder.

## Conclusión

Los sistemas de archivos encriptados como LUKS, representan una herramienta esencial para proteger datos confidenciales. Al aplicar técnicas criptográficas, proporcionan una línea de defensa crucial contra robos de datos, accesos no autorizados y otros riesgos de seguridad.

Sin embargo, el éxito de estos sistemas depende tanto de la tecnología como de las prácticas seguras de los usuarios, donde se debe tener en cuenta el uso de contraseñas robustas y la protección física del dispositivo.

Y ustedes. ¿conocían o usan un sistema de cifrado? ¿Cómo implementarían una solución similar?, déjenme su opinión en los comentarios, eso fue todo, adiós.


<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/mrQXlMRiuFA?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>