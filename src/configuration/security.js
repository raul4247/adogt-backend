const UserDAO = require("../DAO/user");
const bcrypt = require("bcrypt");
const customPassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer");

const jwt = require("jsonwebtoken");

customPassport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        console.log(UserDAO);
        const user = await UserDAO.getUserByEmail(email);
        if (!user) throw Error("User email is Invalid");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) throw Error("User password is Invalid");

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

customPassport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, "senha");
      const user = await UserDAO.getById(payload.id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

module.exports = {
  generateWebToken: (user) => {
    const payload = { id: user.id };
    const token = jwt.sign(payload, "senha");
    return token;
  },
  customPassport,
};
