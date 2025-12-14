import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';

import { csrfMiddleware } from './middleware.js';
import { addMobilePhone, createUser, login } from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure the Handlebars template engine.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Configure the app to serve static files.
app.use('/static/', express.static(join(__dirname, '..', 'public')));

// Enable parsing POST data.
app.use(express.urlencoded({ extended: true }));

// Enable cookies
app.use(cookieParser());

// Use CSRF middleware.
app.use(csrfMiddleware);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', login.get);

app.get('/users/create', createUser.get);
app.post('/users/create', createUser.post);
app.get('/users/create/phone', addMobilePhone.get);
app.get('/api/users/phone', addMobilePhone.post);

export default app;
