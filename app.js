import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { engine } from 'express-handlebars';

import { login } from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure the Handlebars template engine.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configure the app to serve static files.
app.use('/static/', express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', login.get);

export default app;
