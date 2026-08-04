# Frontend - Hidrocel Software

## Descripción

El frontend de Hidrocel es la interfaz de usuario que permite a los operadores gestionar cotizaciones, diagnósticos, reparaciones y tickets de manera intuitiva y eficiente. Está construido con Next.js y TypeScript, ofreciendo una experiencia de usuario fluida, moderna y responsive.

## Tecnologías utilizadas

- Next.js (App Router)
- TypeScript
- React
- CSS Modules / Styled Components
- Axios (para consumo de API)
- React Hook Form (para manejo de formularios)
- React Query (para manejo de estado y caché)

## Estructura de carpetas

```
frontend/
├── src/
│   ├── app/                 # Rutas y páginas de Next.js
│   │   ├── layout.tsx       # Layout principal
│   │   ├── page.tsx         # Página de inicio
│   │   ├── cotizaciones/    # Módulo de cotizaciones
│   │   ├── reparaciones/    # Módulo de reparaciones
│   │   ├── clientes/        # Módulo de clientes
│   │   └── tickets/         # Módulo de tickets
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Componentes de interfaz (botones, inputs, modales)
│   │   ├── forms/           # Formularios específicos
│   │   └── layout/          # Componentes de estructura (header, sidebar)
│   ├── services/            # Servicios para consumir la API
│   ├── hooks/               # Custom hooks
│   ├── types/               # Definiciones de tipos TypeScript
│   └── utils/               # Funciones auxiliares
├── public/                  # Archivos estáticos
├── .env.example             # Ejemplo de variables de entorno
└── package.json             # Dependencias y scripts
```

## Funcionalidades principales

- Panel de control con resumen de actividades
- Gestión completa de cotizaciones (crear, editar, eliminar, visualizar)
- Registro y seguimiento de diagnósticos
- Creación y administración de reparaciones
- Generación y visualización de notas de remisión en PDF
- Administración de clientes y dispositivos
- Sistema de tickets para seguimiento de dispositivos
- Interfaz responsive para uso en diferentes dispositivos

## Requisitos previos

- Node.js (versión 18 o superior)
- Backend de Hidrocel en ejecución

## Configuración

1. Copia el archivo `.env.example` y renómbralo a `.env.local`
2. Configura la URL del backend:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Instalación

Ejecuta el siguiente comando para instalar todas las dependencias:

```
npm install
```

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática |
| `npm run build` | Compila el proyecto para producción |
| `npm start` | Inicia el servidor en modo producción |
| `npm run lint` | Ejecuta el linter para verificar el código |

## Módulos principales

### Cotizaciones
Permite crear nuevas cotizaciones con datos del cliente y dispositivo, así como dar seguimiento a su estado (pendiente, aprobada, rechazada).

### Diagnósticos y Reparaciones
Registra el diagnóstico técnico de los dispositivos y, al confirmarlo, permite generar automáticamente la orden de reparación y la nota de remisión correspondiente.

### Clientes
Administra la información de los clientes y sus dispositivos asociados.

### Tickets
Genera tickets de seguimiento para que los clientes puedan consultar el estado de su dispositivo.

### Notas de Remisión
Visualiza y descarga las notas de remisión generadas automáticamente por el backend al confirmar un diagnóstico o crear una reparación.

## Estilos y diseño

El frontend sigue una interfaz limpia y profesional, con una paleta de colores corporativa. Los componentes están diseñados para ser accesibles y fáciles de usar, con feedback visual claro para cada acción del usuario.

## Comunicación con el backend

El frontend se comunica con el backend a través de una API RESTful. Todos los servicios están centralizados en la carpeta `services/`, facilitando el mantenimiento y la actualización de las llamadas HTTP.

## Soporte

Para cualquier duda o problema relacionado con el frontend, consulta la documentación completa del proyecto o contacta al equipo de desarrollo.