### App de Notas de texto.App

Descripción

Implementar una API que permita publicar notas privadas de texto y categorizarlas.

## Entidades

- ### User:

- id
- email
- username
- password
- createdAt
- modifiedAt

- ### Nota:

- id
- userId
- titulo
- text
- categoriaId
- publica(privado/publico- boolean)-opcional
- createdAt
- imagen-opcional

- ### Categoria:
- id
- nombre
- createdAt

### Endpoints

### Usuarios:

- POST [/users/register] - Registro de un nuevo usuario. ✅
- POST [/users/login] - Permite logear un usuario.
- GET [/users] - Devuelve información del usuario del token.
- PUT [/users/avatar] - Editar el avatar.(?).

- ### Notas:

- GET [/notes] - Obtiene el listado de notas del usuario.
- GET [/notes/:noteId] - Obtiene información de una nota      específica.
- POST [/notes] - Crea una nueva nota. permitir agregar img.
- PUT [/notes/:noteId] - Modifica una nota existente.

- ### Opcional notas:

- PUT [/notes/:noteId/public] - Modifica la privacidad de la nota.
- DELETE [/notes/:noteId/delete] - Elimina una nota.

- ### Opcional categorias:

- POST [/categories] - Crea una nueva categoria.
- PUT [/categories/:categoryId] - Edita categoria existente.
- DELETE [/categories/:categoryId] - Elimina categoria existente.
- GET [/categories] - Devuelve todas las categorias.
