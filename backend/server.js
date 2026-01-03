const express = require('express');
const cors = require('cors');
require('dotenv').config();

const textRoutes = require('./routes/text.routes');
const imageRoutes = require('./routes/image.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/text', textRoutes);
app.use('/api/image', imageRoutes);

app.use(errorHandler);

app.listen(5000, () =>
  console.log('TruthCheck AI Backend running 🚀')
);
