const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//1)Middlers
app.use(morgan('dev'));

//Middleware - é chamado assim porque fica entre o Request e o Response.
app.use(express.json());

//Criando o nosso próprio Middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//Request Time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

///////////////////Routers

//Essa função será executada apenas uma vez.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  //Usando método GET
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  //Verificando erros
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID',
    });
  }

  //retornando com as novas informações
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  //Verificando erros
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      messsage: 'Invalid ID',
    });
  }

  //retornando com as novas informações
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

///////////////SERVER START

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//Criando servidor usando porta 3000.
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
