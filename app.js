const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middlers
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
//Podemos enviar arquivos estaticos usando express.static(<caminho>)
app.use(express.static(`${__dirname}/public/`));

//Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Handling Routes depois dos Routers acima
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});

module.exports = app;
