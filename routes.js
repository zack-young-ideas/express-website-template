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
      formHtml: form.asP(),
    }
    res.render('createUser', variables);
  }
}

export { createUser, login };
