import { getRandomString, maskCipherToken } from './utils.js';

const csrfMiddleware = (req, res, next) => {
  if (req.method === 'POST') {
    const csrfSecret = req.cookies.csrftoken;
    const csrfToken = req.get('X-CSRF-Token');
    if (csrfToken !== undefined) {
      const output = unmaskCipherToken(csrfToken);
      if (output !== csrfSecret) {
        return res.status(400).render('400');
      }
    }
  }

  let csrfSecret = getRandomString();
  res.cookie('csrftoken', csrfSecret);
  res.set('X-CSRF-Token', maskCipherToken(csrfSecret));
  res.locals.csrfToken = maskCipherToken(csrfSecret);
  next();
}

export { csrfMiddleware };
