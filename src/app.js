import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import cookieParser from 'cookie-parser';
import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';

import settings from '../config.js';
import configurePassport from './configPassport.js';
import { csrfMiddleware } from './middleware.js';
import {
  addMobilePhone,
  createUser,
  login,
  verifyMobilePhone
} from './routes.js';

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

// Enable parsing JSON data.
app.use(express.json());

// Enable cookies
app.use(cookieParser());

// Enable sessions.
app.use(session({
  secret: settings.SESSION_KEY,
  resave: false,
  saveUnitialized: false,
  cookie: {
    secure: false,
    maxAge: 60000,
  },
}));

// Configure passport.
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Use CSRF middleware.
app.use(csrfMiddleware);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', login.get);

app.get('/users/create', createUser.get);
app.post('/users/create', createUser.post);
app.get('/users/create/phone', addMobilePhone.get);
app.post('/api/users/phone', verifyMobilePhone.post);

export default app;
