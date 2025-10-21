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

export { login };
