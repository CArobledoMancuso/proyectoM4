# E-comerce modulo 4 Cristian Robledo

## Descripción

Este proyecto es una aplicación de comercio electrónico donde los usuarios pueden registrarse, iniciar sesión, y realizar compras de productos mediante un carrito de compras. Cada compra genera una orden con un detalle de compra asociado. Los usuarios administradores pueden gestionar los productos, actualizando información, stock y agregando imágenes mediante un servicio de nube.

## Características

- Registro e inicio de sesión de usuarios.
- Carrito de compras con opción de adquirir una unidad de cada producto.
- Generación de órdenes de compra con detalle de los productos adquiridos.
- Gestión de productos por parte de administradores, incluyendo actualización de información, stock y manejo de imágenes en la nube.

## Tecnologías Utilizadas

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT para autenticación
- Cloudinary para manejo de imágenes
- Docker

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_del_repositorio>
   cd ecomerce-carobledomancuso

## Instala las dependencias:

  ```
   npm install
  ```
## Configura las variables de entorno. Crea un archivo .env.development.local en la raíz del proyecto con el siguiente contenido:
```bash
- POSTGRES_DB=<>
- POSTGRES_USER=<>
- POSTGRES_PASSWORD=<>
- POSTGRES_HOST=<>
- POSTGRES_PORT=<>
- CLOUDINARY_CLOUD_NAME=<>
- CLOUDINARY_API_SECRET=<>
- CLOUDINARY_API_KEY=<>
- JWT_SECRET=<>
- AUTH0_SECRET=<>
- AUTH0_BASE_URL=<>
- AUTH0_CLIENT_ID=<>
- AUTH0_ISSUER_BASE_URL=<>
```
## Levanta los contenedores Docker:
```
docker-compose up -d
```
## Ejecuta las migraciones de TypeORM:
```
npm run migration:run
```
## Inicia la aplicación:
```
npm run start:dev
```
## Uso

- Accede a http://localhost:3000 para ver la aplicación en funcionamiento.
- Usa la funcionalidad de registro para crear un nuevo usuario.
- Inicia sesión con el usuario creado.
- Navega por los productos y añádelos al carrito.
- Finaliza la compra para generar una orden con el detalle de los productos adquiridos.
- Los administradores pueden acceder a la sección de gestión de productos para actualizar información, stock - y manejar imágenes.

## Scripts Disponibles
- npm run build: Compila la aplicación.
- npm run start: Inicia la aplicación en modo producción.
- npm run start:dev: Inicia la aplicación en modo desarrollo.
- npm run start:debug: Inicia la aplicación en modo debug.
- npm run test: Ejecuta las pruebas.
- npm run test:watch: Ejecuta las pruebas en modo watch.
- npm run test:cov: Ejecuta las pruebas y genera un reporte de cobertura.
- npm run test:e2e: Ejecuta las pruebas end-to-end.
- npm run lint: Linter del proyecto.
- npm run format: Formatea el código usando Prettier.
- npm run migration:generate: Genera una nueva migración.
- npm run migration:create: Crea una nueva migración.
- npm run migration:run: Ejecuta las migraciones.
- npm run migration:revert: Revierte las migraciones.
- npm run migration:show: Muestra las migraciones ejecutadas.

## Contribución
Si deseas contribuir al proyecto, por favor sigue estos pasos:

- Realiza un fork del repositorio.
- Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
- Realiza los cambios necesarios y haz commit (git commit -am 'Agrega nueva funcionalidad').
- Sube los cambios a tu rama (git push origin feature/nueva-funcionalidad).
- Abre un Pull Request.
## Licencia

- Este proyecto está bajo la licencia Cristian Robledo SoyHenry.

## Contacto
- Para cualquier consulta o problema, puedes contactarme en [cristianrobledo14@gmail.com].
