# PowNav - Plataforma 3D Colaborativa para Exploración de Montañas

**PowNav** es una plataforma 3D colaborativa en desarrollo, diseñada para permitir a los usuarios visualizar, modificar y colaborar en modelos 3D de montañas. Utilizando tecnologías de vanguardia como **Next.js**, **Supabase**, **WebSockets** y **Three.js**, PowNav está orientada a ofrecer una experiencia de usuario interactiva, escalable y optimizada. El proyecto está en constante evolución, por lo que la estructura y funcionalidades pueden cambiar.

## Arquitectura del Sistema

### **Tecnologías Principales:**

- **Frontend**: Next.js (React) — Framework React que permite un desarrollo rápido y un rendimiento óptimo mediante **Server-Side Rendering (SSR)**.
- **Backend (APIs y Base de Datos)**: Supabase — Base de datos PostgreSQL sin servidor, autenticación y soporte en tiempo real mediante **WebSockets**.
- **Autenticación y Gestión de Usuarios**: Supabase Auth — Implementación sencilla para autenticación usando **Google**, **GitHub** o **email/password**.
- **Visualización 3D**: Three.js — Biblioteca JavaScript para la renderización de gráficos 3D optimizados directamente en el navegador.
- **Almacenamiento de Modelos 3D**: Supabase Storage — Almacenamiento eficiente para los datos de los modelos y texturas 3D.

### **Infraestructura y Escalabilidad**:

PowNav está diseñado para ser **escalable** desde el principio, con una arquitectura que permite agregar funcionalidades y recursos de forma sencilla y eficiente:

- **Frontend Desplegado en Vercel**: Aprovecha las capacidades de escalabilidad automática de **Vercel** para soportar un aumento de tráfico sin intervención manual.
- **Backend Gestionado por Supabase**: Gestiona la base de datos, la autenticación y los WebSockets, lo que permite una rápida escalabilidad sin necesidad de servidores dedicados.
- **Arquitectura Modular**: El proyecto está dividido en módulos bien definidos, lo que permite que se pueda iterar y expandir fácilmente sin afectar otras áreas del sistema.

## Estructura del Proyecto

El proyecto está estructurado en varias áreas que se encuentran en desarrollo activo. Las siguientes son algunas de las funcionalidades clave que están siendo implementadas:

### **Área Pública**:
- Los usuarios pueden acceder a modelos 3D públicos sin necesidad de autenticación.
- Los modelos pueden ser visualizados mediante enlaces públicos únicos.
- Las funcionalidades de visualización de modelos pueden ser ampliadas con nuevas herramientas interactivas.

### **Área de Usuario**:
- Los usuarios autenticados pueden agregar y gestionar sus propios modelos.
- Edición en tiempo real: Se está desarrollando un sistema para que los usuarios colaboren en tiempo real en la modificación de modelos 3D.
- Los usuarios podrán agregar y gestionar marcadores en los modelos para señalar puntos de interés.

## Base de Datos en Supabase

La base de datos se gestiona a través de **Supabase** con **PostgreSQL**, y está estructurada en tablas para manejar modelos y marcadores. Esta base de datos es fácilmente escalable y está lista para manejar un aumento en la cantidad de datos a medida que el proyecto crece.

### **Tabla `models`**:

| Campo           | Tipo     | Descripción                                |
|-----------------|----------|--------------------------------------------|
| `id`            | UUID     | Identificador único del modelo             |
| `name`          | TEXT     | Nombre del modelo                          |
| `heightmap_url` | TEXT     | URL del mapa de alturas                   |
| `texture_url`   | TEXT     | URL de la textura del modelo               |
| `owner_id`      | UUID     | Usuario propietario del modelo            |
| `created_at`    | TIMESTAMP| Fecha de creación del modelo               |

### **Tabla `markers`**:

| Campo        | Tipo   | Descripción                        |
|--------------|--------|------------------------------------|
| `id`         | UUID   | Identificador único del marcador   |
| `user_id`    | UUID   | Usuario que creó el marcador       |
| `model_id`   | UUID   | Referencia al modelo 3D           |
| `position`   | JSON   | Coordenadas del marcador          |
| `type`       | TEXT   | Tipo de marcador (ej. "peligro")  |
| `content`    | TEXT   | Información del marcador          |
| `created_at` | TIMESTAMP | Fecha de creación               |

## Autenticación con Supabase Auth

Los usuarios pueden autenticarse utilizando **Google**, **GitHub** o **email/password** gracias a **Supabase Auth**.

### Flujo de Autenticación:

1. El usuario se autentica utilizando uno de los métodos soportados.
2. **Supabase** gestiona la sesión del usuario y guarda los datos en la base de datos.
3. Los usuarios autenticados obtienen acceso a las funcionalidades de creación, edición y colaboración en tiempo real.

## Frontend: Next.js en Vercel

El frontend está construido con **Next.js**, y desplegado en **Vercel**, lo que permite aprovechar características avanzadas de **Server-Side Rendering (SSR)** para un rendimiento óptimo.

### Características Clave del Frontend:

- **SSR (Server-Side Rendering)**: Mejora la carga inicial de la aplicación, especialmente cuando se accede a modelos 3D.
- **Rutas Dinámicas**: Cada modelo 3D tiene una URL única (`/modelo/[id]`), lo que facilita la visualización de modelos individuales.
- **Panel de Usuario**: Los usuarios pueden gestionar sus modelos y visualizar sus marcadores.
- **Edición en Tiempo Real**: Los cambios realizados por un usuario se reflejan instantáneamente en el resto de los usuarios conectados.

## Visualización 3D con Three.js

Utilizamos **Three.js** para la visualización 3D en el navegador. El enfoque inicial usa **heightmaps** para generar los modelos 3D, lo que mejora tanto el rendimiento como la escalabilidad.

### Características de Visualización:

- **Generación de Modelos 3D**: Los modelos se crean a partir de **heightmaps** y **texturas PBR** para un rendimiento óptimo.
- **Optimización de Carga**: Al usar **heightmaps**, se evita la necesidad de descargar modelos 3D pesados, lo que reduce el ancho de banda necesario.

## Comunicación en Tiempo Real con Supabase Realtime

La colaboración en tiempo real está habilitada gracias a **Supabase Realtime**, permitiendo que los cambios realizados por un usuario sean reflejados en todos los demás usuarios en tiempo real.

### Funcionalidades en Tiempo Real:

- **Posición de los usuarios**: Los usuarios pueden ver las posiciones de los demás en el modelo 3D.
- **Sincronización de Ediciones**: Las ediciones realizadas por un usuario se sincronizan automáticamente con todos los demás usuarios conectados.
- **Marcadores**: Los nuevos marcadores y modificaciones en los existentes se actualizan en tiempo real.

## Flujo de Compartición de Modelos

Los modelos 3D pueden ser compartidos a través de un enlace único. Cualquier persona con el enlace podrá visualizar el modelo sin necesidad de autenticarse.

### Proceso de Compartición:

1. Un usuario crea un modelo y agrega marcadores.
2. Genera un enlace único para compartir el modelo.
3. Los usuarios pueden acceder al modelo a través de este enlace.

## Beneficios de la Arquitectura

- **Escalabilidad**: La arquitectura sin servidor y la gestión automatizada del tráfico permiten una expansión sencilla sin complicaciones.
- **Colaboración en Tiempo Real**: La sincronización instantánea de cambios entre usuarios enriquece la experiencia colaborativa.
- **Costos Bajos**: Aprovechamos tecnologías de bajo costo como **Supabase** y **Vercel** para mantener el proyecto accesible mientras se expande.
- **Optimización de Recursos**: El uso de **heightmaps** para la creación de modelos 3D reduce tanto el uso de ancho de banda como de almacenamiento.

## Resumen

- **Frontend en Next.js (Vercel)**
- **Backend gestionado por Supabase (Autenticación, Base de Datos, Realtime, Storage)**
- **Visualización 3D con Three.js usando heightmaps**
- **Edición y colaboración en tiempo real**
- **Escalabilidad y optimización de costos**

## Próximos Pasos

- **Desarrollo continuo**: El proyecto sigue evolucionando, con nuevas funcionalidades en desarrollo para mejorar la experiencia de los usuarios.
- **Integración de nuevas características**: Se está trabajando en funcionalidades avanzadas de visualización y personalización de modelos.

---

Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto. ¡Gracias por tu interés en PowNav!

