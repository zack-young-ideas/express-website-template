import database from './database.js';
import CreateUserForm from './forms.js';
import { getRandomString, maskCipherToken } from './utils.js';

const login = {
  get: (req, res) => {
    const csrfSecret = getRandomString();
    const csrfToken = maskCipherToken(csrfSecret);
    res.cookie('csrftoken', csrfSecret);
    res.set('X-CSRF-Token', csrfToken);
    const variables = {
      title: 'Login',
      csrfToken: csrfToken,
    }
    res.render('login', variables);
  }
}

const createUser = {
  get: (req, res) => {
    const csrfSecret = getRandomString();
    const csrfToken = maskCipherToken(csrfSecret);
    res.cookie('csrftoken', csrfSecret);
    res.set('X-CSRF-Token', csrfToken);
    const form = new CreateUserForm();
    const variables = {
      title: 'Create User',
      csrfToken: csrfToken,
      error: form.error,
      formHtml: form.asP(),
    }
    res.render('createUser', variables);
  },

  post: async (req, res) => {
    const form = new CreateUserForm(req.body);
    if (form.isValid()) {
      // Create a new user.
      await database.createUser(
        form.firstName,
        form.lastName,
        form.password,
      );
      // Redirect to next page.
      res.redirect('/users/create/phone');
    } else {
      const csrfSecret = getRandomString();
      const csrfToken = maskCipherToken(csrfSecret);
      res.cookie('csrftoken', csrfSecret);
      res.set('X-CSRF-Token', csrfToken);
      const variables = {
        title: 'Create User',
        csrfToken: csrfToken,
        error: form.error,
        formHtml: form.asP(),
      }
      res.render('createUser', variables);
    }
  }
}

const addMobilePhone = {
  get: (req, res) => {
    const csrfSecret = getRandomString();
    const csrfToken = maskCipherToken(csrfSecret);
    res.cookie('csrftoken', csrfSecret);
    res.set('X-CSRF-Token', csrfToken);
    const variables = {
      title: 'Mobile Number',
      csrfToken: csrfToken,
    }
    res.render('phone', variables);
  }
}

export { addMobilePhone, createUser, login };
