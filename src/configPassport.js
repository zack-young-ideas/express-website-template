import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import database from './database.js';

export default (passport) => {
  passport.use(new LocalStrategy(
    (email, password, done) => {
      const user = database.authenticateUser(email, password);
      if (user === null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.user_id);
  });
  passport.deserializeUser(function(user_id, done) {
    const user = database.getUser(user_id);
    if (user === null) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
}
