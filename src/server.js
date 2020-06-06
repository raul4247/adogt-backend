require("dotenv/config");
const customExpress = require("./configuration/customExpress");
const { connection } = require("./database/connection");
const createTables = require("./database/createTables");

connection.connect((err) => {
  if (err) {
    console.log("Erro ao comunicar com banco de dados:\n" + err.stack);
    return;
  }
  console.log("Conectado com a banco de dados");
  try {
    createTables();
  } catch (err) {
    console.log(err);
  }
});

app = customExpress();
const port = 3000;
app.listen(port, () => {
  console.log("Servidor rodando em: " + process.env.HOST + port);
});
