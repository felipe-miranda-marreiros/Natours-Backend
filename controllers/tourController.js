const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  //Usando método GET
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
