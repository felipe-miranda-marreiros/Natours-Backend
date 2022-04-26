const app = require('./app');
//Criando servidor usando porta 3000.
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
