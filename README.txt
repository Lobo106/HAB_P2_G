
//

TÍTULO

Ciudad más accesible

DESCRIPCIÓN

Web donde publicar lugares de la ciudad con problemas de accesibilidad para
denunciarlos.

USUARIOS ANÓNIMOS

La portada de la web debe permitir escoger un barrio de la ciudad y ver la lista de
lugares con problemas de accesibilidad en ese barrio, tanto los problemas activos como los que
fueron ya resueltos.
El administrador de la web debería poder acceder mediante un formulario de login y
acceder a la zona de administración.

ADMINISTRADOR

●Crear un nuevo lugar con problema de accesibilidad

○Título
○Descripción
○Foto
○Barrio

●Marcar un problema de accesibilidad como resuelto


## Instalar

-   Crear una base de datos vacía en una instancia de MySQL local.

-   Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

-   Ejecutar el comando `npm install` o `npm i` para instalar las dependencias.

-   Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos anteriormente creada.

-   Ejecutar `npm run dev` o `npm start` para lanzar el servidor.

## Entidades

-   Users:

    -   id
    -   name
    -   email
    -   password
    -   avatar
    -   createdAt
    -   modifiedAt

-   Post (Incidencia):

    -   id
    -   title
    -   description
    -   barrio
    -   photo (opcional)
    -   idUser
    -   resuelto
    -   createdAt
    -   modifiedAt



## Endpoints - OBLIGATORIOS

## Usuarios:
-   POST [/users/login] - Login de usuario (devuelve token).

## Post:
-   POST [/post] - Permite crear un post. *TOKEN*
-   GET [/post] - Lista todos los post(los resueltos y los sin resolver).
-   GET [/post/:idPost] - Devuelve información de un post concreto.
-   PUT[/post/:idPost] - desmarca marca la incidencia como resuelta

## Endpoints - OPCIONALES

### Usuarios: ✅

-   POST [/users] - Registro de usuario. 
-   POST [/users/login] - Login de usuario (devuelve token). 
-   GET [/users] - Devuelve información del usuario del token. **TOKEN** 
-   PUT [/users] - Editar nombre de usuario o el email. **TOKEN** 
-   PUT [/users/avatar] - Editar el avatar del usuario. **TOKEN** 
-   DELETE [/users] - Eliminar un usuario. **TOKEN** 

### Post: ✅

-   POST [/post] - Permite crear un post. **TOKEN** 
-   GET [/post] - Lista todos los post(los resueltos y los sin resolver). 
-   GET [/post/:idPost] - Devuelve información de un post concreto. 
-   PUT [/post/:idPost/resuelto] - Resuelve una incidencia o la vuelve a activar. **TOKEN** 
-   DELETE [/post/:id] - Borra un post solo si eres quien lo creó. **TOKEN** 
