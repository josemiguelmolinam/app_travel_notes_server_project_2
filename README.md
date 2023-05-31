# App de Notas de texto.App

Descripción

Implementar una API que permita publicar notas privadas de texto y categorizarlas.

## Entidades

- User:

- id
- email
- username
- password
- avatar-opcional
- createdAt
- modifiedAt

- Nota:

- id
- userId
- titulo
- text
- categoria
- privacidad(privado/publico)-opcional
- createdAt

##Endpoints##

### Usuario anónimo:

- POST [/users/login] - Permite logear un usuario.
- POST [/users/register] - Registro de un nuevo usuario.

### Usuarios registrados:

- POST [/users] - Registro de usuario.
- POST [/users/login] - Login de usuario (devuelve token).
- GET [/users] - Devuelve información del usuario del token.
- PUT [/users] - Editar el nombre de usuario o contraseña.
- PUT [/users/avatar] - Editar el avatar.

### Notas:

- GET [/notes] - Obtiene el listado de notas del usuario.
- GET [/notes/:noteId] - Obtiene información de una nota específica.
- POST [/notes/new] - Crea una nueva nota.
- PUT [/notes/:noteId/edit] - Modifica una nota existente.

### Opcional:

- PUT [/notes/:noteId/public] - Modifica la privacidad de la nota.
- DELETE [/notes/:noteId/delete] - Elimina una nota.
- PUT [/notes/:noteId/edit] - Modifica una nota existente/borrar.
- POST [/notes/:noteId/image] - Asociar imagen a una nota.
