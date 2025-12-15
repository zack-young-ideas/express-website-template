import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import database from './database.js';

export default (passport) => {
  passport.use(new LocalStrategy(
    async (email, password, done) => {
      const user = await database.authenticateUser(email, password);
      if (user === null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await database.getUser(id);
    if (user === null) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
}
