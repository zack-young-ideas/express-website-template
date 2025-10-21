import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { engine } from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure the Handlebars template engine.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configure the app to serve static files.
app.use('/static/', express.static(join(__dirname, 'public')));

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

export default app;
