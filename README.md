
# Bienvenidos a Hidrocel Software

Este proyecto esta diseñado con el proposito de facilitar el proceso de generar una cotizacion,
llevar su seguimiento, generar un estandar de trabajo y la generacion de tickets para que
el cliente pueda obtener su dispositivo de forma sencilla y rapida.

## Como configurar en editores de codigo

Durante los siguientes apartados, veremos los pasos a seguir para conseguir ejecutar el sistema
dentro de un editor de texto.

### Pasos para configurar el proyecto

> [!IMPORTANT]
> Para el correcto funcionamiento, es necesario tener instalado node.js y contar con MySQL

1. Configura el archivo .env.example con tus datos de MySQL:
```
  # Ejemplo
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=db_hidrocel
```

2. Cambia el nombre del archivo ".env.example"
3. Ejecuta el comando en tu cmd en la carpeta raiz del proyecto:
```
npm run setup
```

> [!NOTE]
> Durante la configuracion, el sistema necesitara tu contraseña de MySQL.

### Como iniciar el proyecto

> [!WARNING]
> Antes de ejecutar, recuerda realizar la configuracion del proyecto

El programa es capaz de iniciarse de 3 maneras dependiendo las necesidades que se requieran.

1. Inicia el proyecto completo:
```
npm run project
```

2. Inicia unicamente el backend del proyecto:
```
npm run backend
```

3. Inicia unicamente el frontend del proyecto:
```
npm run frontend
```

## Modos de ejecucion

Existen dos maneras de ejecutar el programa, una como desarrollador y otra como cliente. Aqui te dejamos la manera para ejecutar cada uno:

1. Modo desarrollador:
```
npm run project
```

2. Modo cliente:
```
npm run startExe
```

> [!WARNING]
> Antes de ejecutar startExe, porfavor utilizar el comando "npm run export"


## Como instalar la aplicacion

Para poder instalar el proyecto de manera simple y sencilla, entra al siguiente enlace y descarga el archivo .zip, guardalo en tu computadora y sigue los pasos dentro del archivo llamado README.md

Si deseas descargar el .exe desde un editor de codigo, utiliza el siguiente comando:
```
npm run export
```

Utiliza el archivo hidrocel-app.zip o la carpeta distribution para ejecutar el programa con el archivo start.bat.

## Obtener ayuda / Documentacion