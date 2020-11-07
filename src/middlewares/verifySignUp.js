const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    user: req.body.username
  }).exec((err, user) => {
    if(err) {
      return res.status(500).send({message: err});
    }

    if(user) {
      return res.status(400).send({message: 'Duplicate username or email'});
    }

    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if(err) {
        return res.status(500).send({message: err});
      }

      if(user) {
        return res.status(400).send({message: 'Duplicate username or email'});
      }

      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};;