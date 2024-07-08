const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

app.get("/users", (req, res) => {
  // Leer el archivo JSON que contiene los datos de los usuarios
  fs.readFile("users.json", (err, data) => {
    if (err) {
      res.status("Error al leer el archvo json");
    } else {
      // Parsear el contenido del archivo JSON
      const users = JSON.parse(data);
      res.json(users);
    }
  });
  // const {name, lastName} = req.query;
  // if (name && lastName) {
  //   res.send(`Hola ${name} ${lastName}`);
  // } else {
  //   res.send('Por favor, proporciona ambos parámetros: name y lastName');
  // }
});

app.get("/users/:id", (req, res) => {
  // Extraer el id del parámetro de la URL y convertirlo a un número entero
  const userId = parseInt(req.params.id, 10);
  fs.readFile("users.json", (err, data) => {
    if (err) {
      res.status("Error al leer el archvo jsonN");
    } else {
      const users = JSON.parse(data);
      // Buscar el usuario con el id especificado
      const user = users.find((u) => u.id === userId);
      if (user) {
        // Si se encuentra el usuario, responder con los datos del usuario en formato JSON
        res.json(user);
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    }
  });
});

app.post("/users", function (req, res) {
  const newUser = req.body;
  fs.readFile("users.json", (err, data) => {
    if (err) {
      res.status("Error al leer el archvo jsonN");
    } else {
      try {
        const users = JSON.parse(data);
        // Asignar un nuevo id al nuevo usuario
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        newUser.id = newId;
        // Agregar el nuevo usuario a la lista de usuarios
        users.push(newUser);
        // Escribe en el archivo y Guardar la lista actualizada en el archivo JSON
        fs.writeFile("users.json",JSON.stringify(users, null, 2),
          (writeErr) => {
            if (writeErr) {
              res.status(500).send("Error al guardar el archivo JSON");
            } else {
              res.status(201).json(newUser);
            }
          }
        );
      } catch (parseError) {
        res.status(500).send("Error al parsear el archivo JSON");
      }
    }
  });
  // const {name, lastName} = req.query;
  // if (name && lastName) {
  //   res.send(`Usuario ${name} ${lastName} ha sido creado`);
  // } else {
  //   res.send('Por favor, proporciona ambos parámetros: name y lastName');
  // }
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;

  fs.readFile('users.json', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo JSON');
    } else {
      try {
        let users = JSON.parse(data);  
        const userIndex = users.findIndex(u => u.id === userId);
        // Si userIndex no es -1, significa que se encontró el usuario
        if (userIndex !== -1) {
            // Actualizar los datos del usuario
          users[userIndex] = { ...users[userIndex], ...updatedUser, id: userId };

            // Guardar la lista actualizada en el archivo JSON
          fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeErr) => {
          if (writeErr) {
            res.status(500).send('Error al guardar el archivo JSON');
          } else {
            res.json(users[userIndex]);
          }
           });
        } else {
          res.status(404).send('Usuario no encontrado');
        }
      } catch (parseError) {
        res.status(500).send('Error al parsear el archivo JSON');
      }
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  fs.readFile('users.json', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo JSON');
    } else {
      try {
        let users = JSON.parse(data); 
        const userIndex = users.findIndex(u => u.id === userId);
        // Si userIndex no es -1, significa que se encontró el usuario
        if (userIndex !== -1) {
          //El primer parámetro (userIndex) define la posición en la que se deben eliminar
          //El segundo parámetro (1) define cuántos elementos se deben eliminar.
          users.splice(userIndex, 1);
          // Guardar la lista actualizada en el archivo JSON
          //JSON.stringify en JavaScript convierte un objeto o un valor de JavaScript en una cadena de texto JSON
          fs.writeFile('users.json', JSON.stringify(users, null, 2), (writeErr) => {
          if (writeErr) {
            res.status(500).send('Error al guardar el archivo JSON');
          } else {
            res.send('Usuario eliminado exitosamente');
          }
          });
        } else {
          res.status(404).send('Usuario no encontrado');
        }
      } catch (parseError) {
        res.status(500).send('Error al parsear el archivo JSON');
      }
    }
  });
});

// Manejo de error 404 para rutas no definidas
app.use((req, res, next) => {
  res.status(404).send("Error 404: Página no encontrada");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
