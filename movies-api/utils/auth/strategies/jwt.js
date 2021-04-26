const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config/index');

passport.use(
  new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
    async function (tokenPayload, cb) {
      const usersService = new UsersService();
      try {
        const user = usersService.getAll({ email: tokenPayload.email });

        if (!user) {
          return cb(boom.unauthorized());
        }

        delete user.password;
        cb(null, { ...user, scopes: tokenPayload.scopes });

      } catch (error) {
        return cb(error)
      }
    }
  )
);