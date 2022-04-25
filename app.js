const fs = require('fs');
const express = require('express');

const app = express();

//Middleware - é chamado assim porque fica entre o Request e o Response.
app.use(express.json());

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

app.post('/api/v1/tours', (req, res) => {
  //Usando método POST

  //Req.body está disponível agora porque solicitamos no app.use(express.json());
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  //Usando push() para adicionar no final da Array.
  tours.push(newTour);

  //Usando writeFile() para realmente adicionar no banco de dados e ter um response.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//Utilizando variáveis no URL - URL Parameters
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID',
    });
  }

  //Usando método GET
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//Criando servidor usando porta 3000.
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
