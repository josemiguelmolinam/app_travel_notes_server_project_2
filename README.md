### App de Notas de texto.

Descripción del proyecto.

- El proyecto consiste en desarrollar una API que permita a los usuarios crear y categorizar notas privadas de texto.
- Los usuarios pueden registrarse, iniciar sesión y gestionar sus propias notas.
- Cada nota está asociada a un usuario y puede tener un título, texto y categoría.
- También se pueden realizar operaciones opcionales como marcar una nota como pública, eliminar una nota, crear, editar y borrar categorías, y asociar una imagen única a cada nota.

## Entidades

- User:

- id
- email
- username
- password
- createdAt
- modifiedAt

- Nota:

- id
- userId
- title
- text
- categoriaId
- createdAt

- Categoria:

- id
- nombre
- createdAt

### Endpoints

# Usuarios:

- POST [/users/register] - Registro de un nuevo usuario. ✅
- POST [/users/login] - Permite logear un usuario. ✅
- GET [/users] - Devuelve información del usuario del token. ✅

- # Notas:

- GET [/notes] - Obtiene el listado de notas del usuario. ✅
- GET [/notes/:noteId] - Obtiene información de una nota específica.
- POST [/notes] - Crea una nueva nota. ✅
- PUT [/notes/:noteId] - Modifica una nota existente.

- # Opcional notas:

- PUT [/notes/:noteId/public] - Modifica la privacidad de la nota.
- DELETE [/notes/:noteId/delete] - Elimina una nota.
- POST [/categories] Crea una nueva categoria.
- POST [/notes/:noteId/photo] - Subir imagen.

# Opcional categorias:

- PUT [/categories/:categoryId] - Edita categoria existente.
- DELETE [/categories/:categoryId] - Elimina categoria existente.
- GET [/categories] - Devuelve todas las categorias.
