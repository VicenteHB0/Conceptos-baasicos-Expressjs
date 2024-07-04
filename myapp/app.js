const express = require('express')
const app = express()
const port = 3000

app.get('/users', (req, res) => {
  const {name, lastName} = req.query;
  if (name && lastName) {
    res.send(`Hola ${name} ${lastName}`);
  } else {
    res.send('Por favor, proporciona ambos parámetros: name y lastName');
  }
});

app.post('/users', function (req, res) {
  const {name, lastName} = req.query;
  if (name && lastName) {
    res.send(`Usuario ${name} ${lastName} ha sido creado`);
  } else {
    res.send('Por favor, proporciona ambos parámetros: name y lastName');
  }
});

app.put('/users', function (req, res) {
  const {name, lastName} = req.query;
  if (name && lastName) {
    res.send(`Usuario ${name} ${lastName} ha sido actualizado`);
  } else {
    res.send('Por favor, proporciona ambos parámetros: name y lastName');
  }
});

app.delete('/users', function (req, res) {
  const {name, lastName} = req.query;
  if (name && lastName) {
    res.send(`Usuario ${name} ${lastName} ha sido eliminado`);
  } else {
    res.send('Por favor, proporciona ambos parámetros: name y lastName');
  }
});

// Manejo de error 404 para rutas no definidas
app.use((req, res, next) => {
  res.status(404).send('Error 404: Página no encontrada');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})