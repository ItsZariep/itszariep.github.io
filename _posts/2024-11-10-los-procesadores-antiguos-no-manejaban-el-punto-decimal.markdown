---
layout: post
title: "¡Los procesadores antiguos NO manejaban el punto decimal!"
date: 2024-11-10
categories: Hardware Informativo 
tags: [hardware, cpu, 8080 ]
image: /assets/img/thumb/8080nopuntodecimal.jpg
---

Hola gente ¿Cómo están?, espero que estén bien, actualmente cualquier computadora moderna puede manejar puntos decimales de manera sencilla, sin embargo, esta tarea la hace una pieza del procesador llamada FPU, esta pieza estaba totalmente ausente en procesadores anteriores a los de los años 80, en el caso de intel, se introdujo con el 8087.

Aun asi, muchos programadores, en vista de esta carencia, recurrieron a la emulación de la coma flotante, Siimulando operaciones matemáticas de números en formato de coma flotante utilizando operaciones de enteros.

En esta ocasión explicare un ejemplo de como se consigue esta emulación, asi que sin mas que decir, comencemos.

### 1. Representación de Números en Coma Flotante
Para representar números en coma flotante, se usa una convención que sigue el estándar IEEE 754 en muchos casos modernos, aunque los primeros enfoques eran personalizados. Un número en coma flotante se descompone generalmente en tres partes:

1. **Signo**: Determina si el número es positivo o negativo. 
2. **Exponente**: Indica la escala del número (el "orden de magnitud" o potencia de la base). 
3. **Mantisa (o fracción)**: La parte significativa del número.

En sistemas sin hardware de punto flotante, esta representación se simulaba en memoria utilizando variables de tipo entero.

### 2. Normalización de Números
Normalizar un número en coma flotante implica ajustar el valor de la mantisa y el exponente para garantizar que el número esté en un formato estándar. En binario, se intentaba que la mantisa estuviera en un rango donde su valor absoluto comenzara con un "1" seguido de los dígitos fraccionarios, algo similar al valor `1.xxxxx`.

En emulación:
- Los programadores escribían funciones para ajustar el exponente y la mantisa.
- Si la mantisa resultante excedía el rango permitido, el exponente se incrementaba.
 
Ejemplo: para representar \(123.456\) en binario normalizado, se convierte a un valor aproximado en forma de mantisa y exponente, como `1.23456 x 10^2`.

### 3. Implementación de Operaciones Básicas
Las operaciones básicas —suma, resta, multiplicación y división— debían implementarse mediante algoritmos. Vamos a detallar cómo se realizaban:

#### Suma y Resta
1. **Alinear Exponentes**: La suma y resta requieren que los números tengan el mismo exponente. Si los exponentes difieren, se ajusta el exponente más pequeño incrementándolo junto con su mantisa. 
2. **Suma o Resta de las Mantisas**: Una vez que los exponentes están alineados, se pueden sumar o restar las mantisas como números enteros.
3. **Normalización y Ajuste de Exponentes**: Después de la operación, la mantisa puede requerir normalización. Si hay un desbordamiento o subdesbordamiento (como al sumar dos números grandes que dan como resultado una mantisa fuera del rango permitido), se ajusta el exponente y la mantisa.

Ejemplo:
Para sumar \(3.5\) y \(1.25\): 
- Se expresan ambos números con el mismo exponente. 
- Se suman las mantisas correspondientes y se ajustan.

#### Multiplicación
1. **Suma de Exponentes**: Los exponentes de los dos números se suman.
2. **Multiplicación de Mantisas**: Las mantisas se multiplican como enteros.
3. **Normalización y Ajuste de Exponentes**: El resultado puede requerir normalización, y el exponente se ajusta en consecuencia.

Ejemplo:
Para multiplicar \(5.0 x10^1\) por \(2.0 x 10^2\): 
- Exponentes: \(1 + 2 = 3\).
- Mantisas: \(5.0 x 2.0 = 10.0\). 
- Resultado: \(1.0 x 10^4\) (después de normalizar).

#### División
1. **Resta de Exponentes**: Los exponentes se restan.
2. **División de Mantisas**: Las mantisas se dividen como enteros.
3. **Normalización y Ajuste de Exponentes**: Igual que en las otras operaciones, el resultado debe normalizarse.

Ejemplo:
Para dividir (6.0*10^3) entre 2.0 10^1:
- Exponentes: \(3 - 1 = 2\). 
- Mantisas: \(6.0 / 2.0 = 3.0\).
- Resultado: \(3.0 x 10^2\).

### 4. Precisión y Redondeo
Las operaciones de punto flotante no siempre son exactas, lo que hace necesario implementar métodos de redondeo. Para mantener la precisión, se aplicaban algoritmos de redondeo, tales como el redondeo hacia el número par más cercano (round half to even), o simplemente truncar los dígitos adicionales.

Implementar esto en software requería definir umbrales de precisión y criterios específicos, dado que el almacenamiento de los valores podía perder precisión en la operación.

### 5. Manejo de Casos Especiales: Ceros, Infinitos y NaN
1. **Ceros**: Se representa una mantisa de valor cero con cualquier exponente; típicamente, un exponente especial indicaba cero. 
2. **Infinitos**: Resultados que excedían la capacidad de almacenamiento (overflow) se manejaban con convenciones específicas, por ejemplo, asignando un exponente y mantisa reservados.
3. **NaN (Not a Number)**: Para operaciones indefinidas, como dividir por cero, se asignaban valores o combinaciones especiales.

### Ejemplo Completo en Emulación
Supongamos que estamos emulando la multiplicación de \(2.5 x 10^3\) y \(4.0 x 10^{-2}\):

1. **Convertir a Formato Entero**:
- Representamos \(2.5 x 10^3\) como `mantisa = 25` y `exponente = 3`.
- Representamos \(4.0 x 10^{-2}\) como `mantisa = 40` y `exponente = -2`.

2. **Operación de Multiplicación**: 
- Exponentes: \(3 + (-2) = 1\).
- Mantisas: \(25 x 40 = 1000\).

3. **Normalización**:
- Convertimos `1000` a `1.0`, y ajustamos el exponente para reflejar este cambio: `1.0 x 10^4`.

### Implementación en Código de Bajo Nivel
En sistemas de la época, como el lenguaje ensamblador o C, el código debía incluir cada paso de estos cálculos:

```c 
// Pseudocódigo de multiplicación en emulación de punto flotante 
int exponente_a = 3;
int exponente_b = -2; 
int mantisa_a = 25;
int mantisa_b = 40;

int resultado_exponente = exponente_a + exponente_b; // Suma de exponentes 
int resultado_mantisa = mantisa_a * mantisa_b; // Multiplicación de mantisas

// Normalización
while (resultado_mantisa > MAX_MANTISA) { 
resultado_mantisa /= 10;
resultado_exponente++; 
}
```

### Conclusión
La emulación de coma flotante era un proceso complejo y lento, que exigía un enfoque detallado y meticuloso. Para compensar la falta de hardware, se desarrollaron bibliotecas que realizaban estas operaciones en software, como el paquete `softfloat` en muchos lenguajes de la época, permitiendo una precisión de punto flotante razonable. Esta emulación fue clave para aplicaciones científicas, gráficas y de simulación, sentando las bases para los estándares modernos de aritmética de punto flotante.

<iframe width="560" height="315" class="ytvideo" src="https://www.youtube-nocookie.com/embed/ISCtW5kfnM4?si=s6KBDVWeLFTrfTvW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>