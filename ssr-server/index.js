const express = require('express');

const { config } = require('./config/index');
const passport = require('passport');
const boom = require('@hapi/boom');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const app = express();

//body parser
app.use(cookieParser());
app.use(express.json());

require('./utils/auth/strategies/basic');
app.post("/auth/sign-in"), async function (req, res, next) {
  passport.authenticate('basic', function (error, data) {
    try {
      if (error || !data) {
        return next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function (error) {
        if (error) {
          next(error);
        }

        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        res.status(200).json(user);

      })

    } catch (error) {
      next(error)
    }
  })(req, res, nex);
};

app - post("/auth/sign-up"), async function (req, res, next) {
  const { body: user } = req;

    try {
      await axios({
        url: `${config.apiUrl}/api/auth/sign-up`,
        method: 'post',
        data: user
      });

      res.status(201).json({
        message: 'user created'
      });

    }catch (error){
      next(error);
    }
};

app - post("/movies"), async function (req, res, next) {

};

app - post("/user-movies"), async function (req, res, next) {

};

app - post("/user-movies/:userMovieId"), async function (req, res, next) {

};

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});