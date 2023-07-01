###### Text Notes App ######

 Project Description:

- The project aims to develop an API that allows users to create and categorize private text notes.
- Users can register, log in, and manage their own notes.
- Each note is associated with a user and can have a title, text, and category.
- Optional operations include marking a note as public, deleting a note, creating, editing, and deleting categories, and associating a unique image with each note.

### Entities ###

- User:

- id
- email
- username
- password
- createdAt
- modifiedAt



- Note:

- id
- userId
- title
- text
- categoriaId
- createdAt



- Category:

- id
- name
- createdAt



### Endpoints ###

# Users:

- POST [/users/register] - Register a new user.
- POST [/users/login] - Allow a user to log in.
- GET [/users] - Retrieve user information based on the token. 

# Notes:

- GET [/notes] - Retrieve the list of notes for the user.
- GET [/notes/:noteId] - Retrieve information about a specific note.
- POST [/notes] - Create a new note.
- PUT [/notes/:noteId] - Modify an existing note.
- PUT [/notes/:noteId/public] - Edit the privacy of the note.
- DELETE [/notes/:noteId/delete] - Delete a note.

# Categories:

- POST [/categories] - Create a new category.
- GET [/categories] - Retrieve all categories.
- PUT [/categories/:categoryId] - Edit an existing category.
- DELETE [/categories/:categoryId] - Delete an existing category.
