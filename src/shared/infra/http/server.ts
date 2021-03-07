import 'reflect-metadata';
import express from 'express';
import '../typeorm';
import '@shared/container';
import requireDir from 'require-dir';
import routes from './routes';
import cors from 'cors';
const app = express();

app.use(cors());

import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../../../../swagger.json');
app.use(express.json());


var options = {
    swaggerOptions: {
      url: 'http://localhost:3333/docs'
    }
  }
  
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

requireDir('../../../domain/models');
app.use('/api', routes);

app.listen(3333, () => console.log('🚀 Server listen on port 3333'));