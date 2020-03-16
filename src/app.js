const express = require("express")
const app = express()
const PORT = 8080


app.get('/', (req, res) => {
  return res.send('Hello World From Adogt :D')
})

app.listen(PORT, () => {
  console.log('Servidor rodando na porta: ' + PORT)
  console.log('Acesse: localhost:8080/')
})
