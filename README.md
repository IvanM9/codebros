# CodeBros
## Configuración de Node.js
- Es necesario teneer una versión de Node mayor a la v18
- Se debe instalar el manejador de paquetes pnpm con el comando `npm install -g pnpm`
- Se debe instalar el manejador de paquetes yarn con el comando `npm install -g yarn`


## Configuración de la base de datos
- Se debe tener una base de datos PostgreSQL

## Pasos para la instalación de la aplicación react
1. Entrar a la carpeta del proyecto codebros-front
2. Ejecutar el comando `pnpm install`
3. Ejecutar el comando `pnpm dev`


## Pasos para la instalación de la aplicación de servidor realizada en NestJS
1. Entrar a la carpeta del proyecto codebros-back
2. Ejecutar el comando `yarn install` para instalar las dependencias
3. Crear un archivo .env en la raíz del proyecto con las siguientes variables de entorno:
    - DATABASE_URL (URL de la base de datos en PostgreSql, ejemplo: postgres://user:password@localhost:5432/database)
    - API_KEY_AI (API Key de la API de inteligencia artificial)
    - JWT_SECRET_KEY (Clave secreta para la generación de tokens JWT)
4. Ejecutar el comando `yarn prisma db push` para crear las tablas en la base de datos
5. Ejecutar el comando `yarn start` para iniciar el servidor

La aplicación se ejecutará en el puerto 3000 por defecto y las peticiones se deben realizar a la ruta /api.
Para ver la documentación de la API se puede acceder a la ruta /api-docs en el navegador.
