import database from './database.js';
import { CreateUserForm, MobilePhoneForm } from './forms.js';
import { getRandomString, maskCipherToken } from './utils.js';

const login = {
  get: (req, res) => {
    const variables = {
      title: 'Login',
    }
    res.render('login', variables);
  }
}

const createUser = {
  get: (req, res) => {
    const form = new CreateUserForm();
    const variables = {
      title: 'Create User',
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
        form.email,
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
        error: form.error,
        formHtml: form.asP(),
      }
      res.render('createUser', variables);
    }
  }
}

const addMobilePhone = {
  get: (req, res) => {
    let javascript_code = '<script src="/static/js/mobile_verification.js">';
    javascript_code += '</script>';
    javascript_code += '<script>';
    javascript_code += "window.userManager.verifyPhone('/api/users/phone');";
    javascript_code += '</script>';
    const variables = {
      title: 'Mobile Number',
      contains_js: true,
      javascript: javascript_code,
    }
    res.render('phone', variables);
  },

  post: async (req, res) => {
    const form = new MobilePhoneForm(req.body);
    if (form.isValid()) {
      // Create a new SMS token object.
      await database.createSMSToken(req.user, form.phone);
      res.status(200).json({});
    } else {
      res.status(400).json({ error: form.error });
    }
  }
}

export { addMobilePhone, createUser, login };
