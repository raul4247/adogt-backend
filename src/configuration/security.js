const UserDAO = require("../DAO/user");
const bcrypt = require("bcrypt");
const customPassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
customPassport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await UserDAO.getByEmail(email);
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

module.exports = {
  hashPassword: async (password) => await bcrypt.hash(password, 12),
  customPassport,
};
