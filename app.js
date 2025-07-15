const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');


const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');



const app = express();  





// Middleware
app.use(logger('dev'));
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/events', eventRoutes); 
app.use('/api/users', userRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});


module.exports = app;
