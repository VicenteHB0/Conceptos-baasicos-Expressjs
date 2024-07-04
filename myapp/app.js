const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const {name, lastName} = req.query;
  if (name && lastName) {
    res.send(`Hola ${name} ${lastName}`);
  } else {
    res.send('Por favor, proporciona ambos parámetros: name y lastName');
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})