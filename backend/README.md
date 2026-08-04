# Backend - Hidrocel Software

## Descripción

El backend de Hidrocel es el núcleo del sistema, encargado de gestionar la lógica de negocio, la comunicación con la base de datos y la generación de documentos. Está construido con Express.js y proporciona una API RESTful para que el frontend pueda interactuar con los datos de manera segura y eficiente.

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- PDFKit (para generación de notas de remisión)
- Nodemailer (para envío de correos)

## Estructura de carpetas

```
backend/
├── logs/                # Espacio para los loggers hechos en el sistema
├── routes/              # Definición de rutas API
├── uploads/             # Espacio para las notas de remision
├── endpoints.js         # Script principal para los servicios
├── package.json         # Dependencias y scripts
└── db.js                # Punto de entrada del servidor
```

## Funcionalidades principales

- Gestión de cotizaciones (crear, leer, actualizar, eliminar)
- Gestión de diagnósticos y reparaciones
- Generación automática de notas de remisión en PDF al confirmar un diagnóstico o crear una reparación
- Envío de correos electrónicos con documentos adjuntos
- Autenticación y control de acceso
- Manejo de tickets y seguimiento de dispositivos

## Requisitos previos

- Node.js (versión 14 o superior)
- MySQL (versión 5.7 o superior)
- Cuenta de Gmail para envío de correos (opcional)

## Configuración

1. Copia el archivo `.env.example` y renómbralo a `.env`
2. Completa las variables de entorno con tus datos:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=db_hidrocel
GMAIL_USERNAME=tuCorreo@gmail.com
GMAIL_PASSWORD=tuContraseñaDeAplicacion
```

## Instalación

Ejecuta el siguiente comando para instalar todas las dependencias:

```
npm install
```

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor en modo desarrollo con recarga automática |

## Endpoints principales

La API expone los siguientes endpoints principales:

- `GET /api/cotizaciones` - Obtener todas las cotizaciones
- `POST /api/cotizaciones` - Crear una nueva cotización
- `PUT /api/cotizaciones/:id` - Actualizar una cotización
- `DELETE /api/cotizaciones/:id` - Eliminar una cotización
- `POST /api/reparaciones` - Crear una reparación y generar nota de remisión
- `GET /api/reparaciones/:id/remision` - Obtener la nota de remisión en PDF

## Generación de documentos

El backend utiliza PDFKit para generar notas de remisión. Al confirmar un diagnóstico o crear una reparación, el sistema automáticamente:

1. Recopila los datos del cliente y del dispositivo
2. Genera un documento PDF con el formato de nota de remisión
3. Almacena el documento en el servidor o lo envía por correo al cliente
4. Permite descargar el documento desde el frontend

## Base de datos

El esquema de la base de datos incluye las siguientes tablas principales:

- `clientes` - Información de los clientes
- `dispositivos` - Dispositivos asociados a los clientes
- `cotizaciones` - Cotizaciones generadas
- `diagnosticos` - Diagnósticos realizados
- `reparaciones` - Reparaciones registradas
- `notas_remision` - Notas de remisión generadas
- `usuarios` - Usuarios del sistema

## Soporte

Para cualquier duda o problema relacionado con el backend, consulta la documentación completa del proyecto o contacta al equipo de desarrollo.