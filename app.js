const fs = require('fs');
const express = require('express');
const app = express();

//Essa função será executada apenas uma vez.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Essa função ocorrerá no Event Loop.
app.get('/api/v1/tours', (req, res) => {
  //Usando método GET
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//Criando servidor usando porta 3000.
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
